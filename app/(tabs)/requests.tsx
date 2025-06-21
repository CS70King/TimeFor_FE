import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Circle as XCircle, Calendar, Camera, Star, MessageCircle, TriangleAlert as AlertTriangle, SquareCheck as CheckSquare, X, MapPin, DollarSign, Shield, User } from 'lucide-react-native';
import { mockRequests, CURRENT_USER_ID } from '@/data/mockData';

const tabs = ['All', 'Borrowing', 'Lending'];
const statusColors = {
  pending: '#FF9800',
  accepted: '#4CAF50',
  returned: '#2196F3',
  cancelled: '#9E9E9E',
  completed: '#4CAF50',
  overdue: '#F44336',
};

const statusIcons = {
  pending: Clock,
  accepted: CheckCircle,
  returned: CheckCircle,
  cancelled: XCircle,
  completed: CheckCircle,
  overdue: AlertTriangle,
};

interface ReturnConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: { rating: number; isDamaged: boolean }) => void;
  requestType: 'borrow' | 'lend';
  itemName: string;
  isLenderConfirming?: boolean;
}

function ReturnConfirmationModal({ visible, onClose, onConfirm, requestType, itemName, isLenderConfirming = false }: ReturnConfirmationModalProps) {
  const [rating, setRating] = useState(0);
  const [isDamaged, setIsDamaged] = useState(false);

  const handleConfirm = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please provide a rating before confirming.');
      return;
    }
    onConfirm({ rating, isDamaged });
    onClose();
    setRating(0);
    setIsDamaged(false);
  };

  const getModalTitle = () => {
    if (isLenderConfirming) return 'Confirm Return';
    return requestType === 'borrow' ? 'Mark as Returned' : 'Confirm Return';
  };

  const getRatingLabel = () => {
    if (isLenderConfirming) return 'Rate Borrower';
    return requestType === 'borrow' ? 'Rate Lender' : 'Rate Borrower';
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{getModalTitle()}</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#666" size={24} />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalSubtitle}>{itemName}</Text>

          {/* Photo Upload Section */}
          <View style={styles.photoSection}>
            <Text style={styles.sectionTitle}>Upload Return Photos</Text>
            <TouchableOpacity style={styles.photoUploadButton}>
              <Camera color="#006A4E" size={24} />
              <Text style={styles.photoUploadText}>Take Photos</Text>
            </TouchableOpacity>
          </View>

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>{getRatingLabel()}</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                >
                  <Star
                    color={star <= rating ? '#FFB800' : '#E0E0E0'}
                    fill={star <= rating ? '#FFB800' : 'transparent'}
                    size={32}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Damage Report (Lender Only) */}
          {(requestType === 'lend' || isLenderConfirming) && (
            <View style={styles.damageSection}>
              <TouchableOpacity
                style={styles.damageCheckbox}
                onPress={() => setIsDamaged(!isDamaged)}
              >
                <View style={[styles.checkbox, isDamaged && styles.checkboxChecked]}>
                  {isDamaged && <CheckSquare color="white" size={16} />}
                </View>
                <Text style={styles.damageText}>Item was damaged</Text>
              </TouchableOpacity>
              {isDamaged && (
                <Text style={styles.damageNote}>
                  You'll be prompted to provide damage details after confirmation
                </Text>
              )}
            </View>
          )}

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function RequestsScreen() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [requests, setRequests] = useState(mockRequests);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<typeof mockRequests[0] | null>(null);
  const [isLenderConfirming, setIsLenderConfirming] = useState(false);

  const filteredRequests = requests.filter(request => {
    if (selectedTab === 'All') return true;
    return selectedTab === 'Borrowing' ? request.type === 'borrow' : request.type === 'lend';
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusText = (status: string, isOverdue: boolean) => {
    if (isOverdue) return 'Overdue';
    switch (status) {
      case 'pending': return 'Awaiting Response';
      case 'accepted': return 'In Progress';
      case 'returned': return 'Awaiting Confirmation';
      case 'cancelled': return 'Cancelled';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const isOverdue = (request: typeof mockRequests[0]) => {
    if (!request.returnBy || request.status !== 'accepted') return false;
    return new Date() > new Date(request.returnBy);
  };

  const isCurrentUserBorrower = (request: typeof mockRequests[0]) => {
    return request.borrowerId === CURRENT_USER_ID;
  };

  const isCurrentUserLender = (request: typeof mockRequests[0]) => {
    return request.lenderId === CURRENT_USER_ID;
  };

  const handleAcceptRequest = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' as any } : req
    ));
    Alert.alert('Request Accepted', 'The borrower has been notified and can now pick up the item.');
  };

  const handleDeclineRequest = (requestId: string) => {
    Alert.alert(
      'Decline Request',
      'Are you sure you want to decline this request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: () => {
            setRequests(requests.map(req => 
              req.id === requestId ? { ...req, status: 'cancelled' as any } : req
            ));
            Alert.alert('Request Declined', 'The borrower has been notified.');
          }
        }
      ]
    );
  };

  const handleCancelRequest = (requestId: string) => {
    Alert.alert(
      'Cancel Request',
      'Are you sure you want to cancel this request?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            setRequests(requests.map(req => 
              req.id === requestId ? { ...req, status: 'cancelled' as any } : req
            ));
            Alert.alert('Request Cancelled', 'Your request has been cancelled.');
          }
        }
      ]
    );
  };

  const handleMarkAsReturned = (request: typeof mockRequests[0]) => {
    setSelectedRequest(request);
    setIsLenderConfirming(false);
    setModalVisible(true);
  };

  const handleConfirmReturn = (request: typeof mockRequests[0]) => {
    setSelectedRequest(request);
    setIsLenderConfirming(true);
    setModalVisible(true);
  };

  const handleModalConfirm = (data: { rating: number; isDamaged: boolean }) => {
    if (selectedRequest) {
      if (isLenderConfirming) {
        // Lender confirming return - mark as completed
        setRequests(requests.map(req => 
          req.id === selectedRequest.id ? { ...req, status: 'completed' as any } : req
        ));
        if (data.isDamaged) {
          Alert.alert(
            'Return Confirmed with Damage',
            'The transaction is complete. You can now file a damage report if needed.',
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert('Return Confirmed', 'Transaction completed successfully! Both parties have been notified.');
        }
      } else {
        // Borrower marking as returned - change to returned status
        setRequests(requests.map(req => 
          req.id === selectedRequest.id ? { ...req, status: 'returned' as any } : req
        ));
        Alert.alert('Marked as Returned', 'The lender has been notified and will confirm the return.');
      }
    }
  };

  const handleSendReminder = (requestId: string) => {
    Alert.alert('Reminder Sent', 'The borrower has been notified about the overdue item.');
  };

  const handleReportNotReturned = (requestId: string) => {
    Alert.alert(
      'Report Item Not Returned',
      'This will start a dispute resolution process. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Report',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Report Submitted', 'Our team will review this case and contact you within 24 hours.');
          }
        }
      ]
    );
  };

  const renderActionButtons = (request: typeof mockRequests[0]) => {
    const overdueStatus = isOverdue(request);
    const isBorrower = isCurrentUserBorrower(request);
    const isLender = isCurrentUserLender(request);
    
    // 🟡 PENDING STATUS - Awaiting Response
    if (request.status === 'pending') {
      if (isBorrower) {
        // Borrower sees: Cancel Request
        return (
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelActionButton]} 
            onPress={() => handleCancelRequest(request.id)}
          >
            <Text style={[styles.actionButtonText, styles.cancelActionButtonText]}>Cancel Request</Text>
          </TouchableOpacity>
        );
      } else if (isLender) {
        // Lender sees: Accept/Decline
        return (
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.declineButton]} 
              onPress={() => handleDeclineRequest(request.id)}
            >
              <Text style={[styles.actionButtonText, styles.declineButtonText]}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => handleAcceptRequest(request.id)}
            >
              <Text style={styles.actionButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }

    // 🟢 ACCEPTED STATUS - In Progress / Overdue
    if (request.status === 'accepted') {
      if (isBorrower) {
        // Borrower sees: Mark as Returned (with overdue warning if applicable)
        return (
          <View style={styles.actionContainer}>
            {overdueStatus && (
              <View style={styles.overdueWarning}>
                <AlertTriangle color="#F44336" size={16} />
                <Text style={styles.overdueWarningText}>Item is overdue! Return ASAP</Text>
              </View>
            )}
            <TouchableOpacity 
              style={[styles.actionButton, overdueStatus && styles.urgentButton]} 
              onPress={() => handleMarkAsReturned(request)}
            >
              <Text style={styles.actionButtonText}>Mark as Returned</Text>
            </TouchableOpacity>
          </View>
        );
      } else if (isLender) {
        // Lender sees overdue management options or waiting message
        if (overdueStatus) {
          return (
            <View style={styles.actionContainer}>
              <View style={styles.overdueAlert}>
                <AlertTriangle color="#F44336" size={16} />
                <Text style={styles.overdueAlertText}>Item is overdue</Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.reminderButton]} 
                  onPress={() => handleSendReminder(request.id)}
                >
                  <MessageCircle color="white" size={16} />
                  <Text style={styles.actionButtonText}>Send Reminder</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.reportButton]} 
                  onPress={() => handleReportNotReturned(request.id)}
                >
                  <Text style={[styles.actionButtonText, styles.reportButtonText]}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
        return (
          <Text style={styles.waitingText}>Waiting for borrower to return item</Text>
        );
      }
    }

    // 🔵 RETURNED STATUS - Awaiting Confirmation
    if (request.status === 'returned') {
      if (isLender) {
        // Lender sees: Confirm Return
        return (
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => handleConfirmReturn(request)}
          >
            <Text style={styles.actionButtonText}>Confirm Return</Text>
          </TouchableOpacity>
        );
      } else if (isBorrower) {
        // Borrower waits for confirmation
        return (
          <Text style={styles.waitingText}>Waiting for lender to confirm return</Text>
        );
      }
    }

    // ✅ COMPLETED STATUS
    if (request.status === 'completed') {
      return (
        <View style={styles.completedContainer}>
          <CheckCircle color="#4CAF50" size={16} />
          <Text style={styles.completedText}>Transaction completed successfully</Text>
        </View>
      );
    }

    // ❌ CANCELLED STATUS
    if (request.status === 'cancelled') {
      return (
        <View style={styles.cancelledContainer}>
          <XCircle color="#9E9E9E" size={16} />
          <Text style={styles.cancelledText}>Request was cancelled</Text>
        </View>
      );
    }

    return null;
  };

  const renderRequestCard = (request: typeof mockRequests[0]) => {
    const StatusIcon = statusIcons[request.status];
    const statusColor = statusColors[request.status];
    const overdueStatus = isOverdue(request);
    const displayStatus = overdueStatus ? 'overdue' : request.status;
    const displayStatusColor = overdueStatus ? statusColors.overdue : statusColor;
    const isBorrower = isCurrentUserBorrower(request);

    return (
      <View key={request.id} style={[styles.requestCard, overdueStatus && styles.overdueCard]}>
        <Image source={{ uri: request.itemImage }} style={styles.itemImage} />
        <View style={styles.requestContent}>
          <View style={styles.requestHeader}>
            <Text style={styles.itemName} numberOfLines={1}>{request.itemName}</Text>
            <View style={[styles.statusBadge, { backgroundColor: displayStatusColor + '20' }]}>
              <StatusIcon color={displayStatusColor} size={12} />
              <Text style={[styles.statusText, { color: displayStatusColor }]}>
                {getStatusText(request.status, overdueStatus)}
              </Text>
            </View>
          </View>
          
          <View style={styles.requestDetails}>
            <View style={styles.userInfo}>
              <User color="#666" size={14} />
              <Text style={styles.requestType}>
                {isBorrower ? `Borrowing from ${request.lenderName}` : `Lending to ${request.borrowerName}`}
              </Text>
            </View>
            
            <View style={styles.costInfo}>
              <DollarSign color="#006A4E" size={14} />
              <Text style={styles.costText}>₵{request.borrowingCost}/{request.costPeriod}</Text>
              {request.deposit && (
                <>
                  <Shield color="#FF9800" size={12} />
                  <Text style={styles.depositText}>+₵{request.deposit} deposit</Text>
                </>
              )}
            </View>

            {request.pickupLocation && (
              <View style={styles.locationInfo}>
                <MapPin color="#666" size={12} />
                <Text style={styles.locationText}>{request.pickupLocation}</Text>
              </View>
            )}
            
            <View style={styles.dateContainer}>
              <Calendar color="#666" size={12} />
              <Text style={styles.requestDate}>
                Requested: {formatDate(request.requestedAt)}
              </Text>
            </View>
            
            {request.returnBy && (
              <View style={styles.dateContainer}>
                <Clock color={overdueStatus ? "#F44336" : "#666"} size={12} />
                <Text style={[styles.returnDate, overdueStatus && styles.overdueDate]}>
                  Return by: {formatDate(request.returnBy)}
                </Text>
              </View>
            )}
          </View>

          {renderActionButtons(request)}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Requests</Text>
        <Text style={styles.subtitle}>Track your borrowing and lending activity</Text>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.tabActive
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.tabTextActive
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.requestsList} showsVerticalScrollIndicator={false}>
        {filteredRequests.length > 0 ? (
          filteredRequests.map(renderRequestCard)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No requests yet</Text>
            <Text style={styles.emptyStateText}>
              {selectedTab === 'Borrowing' 
                ? 'Start exploring items to borrow from the community!'
                : selectedTab === 'Lending'
                ? 'List your first item to start lending!'
                : 'Your borrowing and lending history will appear here.'}
            </Text>
          </View>
        )}
      </ScrollView>

      <ReturnConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleModalConfirm}
        requestType={selectedRequest?.type || 'borrow'}
        itemName={selectedRequest?.itemName || ''}
        isLenderConfirming={isLenderConfirming}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tabActive: {
    backgroundColor: '#006A4E',
    borderColor: '#006A4E',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  tabTextActive: {
    color: 'white',
  },
  requestsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overdueCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  itemImage: {
    width: 80,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  requestContent: {
    flex: 1,
    padding: 12,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  requestDetails: {
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requestType: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginLeft: 4,
  },
  costInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  costText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#006A4E',
    marginLeft: 4,
    marginRight: 8,
  },
  depositText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#FF9800',
    marginLeft: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  requestDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 4,
  },
  returnDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 4,
  },
  overdueDate: {
    color: '#F44336',
    fontFamily: 'Inter-SemiBold',
  },
  actionContainer: {
    gap: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#006A4E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  cancelActionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  declineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  reminderButton: {
    backgroundColor: '#FF9800',
  },
  reportButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  urgentButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  cancelActionButtonText: {
    color: '#F44336',
  },
  declineButtonText: {
    color: '#F44336',
  },
  reportButtonText: {
    color: '#F44336',
  },
  waitingText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    fontStyle: 'italic',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  completedText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4CAF50',
  },
  cancelledContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cancelledText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9E9E9E',
  },
  overdueWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
    alignSelf: 'flex-start',
  },
  overdueWarningText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#F44336',
  },
  overdueAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
    alignSelf: 'flex-start',
  },
  overdueAlertText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#F44336',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 20,
  },
  photoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  photoUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8F5',
    borderWidth: 2,
    borderColor: '#006A4E',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 16,
    gap: 8,
  },
  photoUploadText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
  },
  ratingSection: {
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  damageSection: {
    marginBottom: 20,
  },
  damageCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#F44336',
    borderColor: '#F44336',
  },
  damageText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  damageNote: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 8,
    marginLeft: 36,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#006A4E',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
});