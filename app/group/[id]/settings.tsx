import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, UserPlus, CreditCard as Edit3, Trash2, LogOut } from 'lucide-react-native';

const mockGroupSettings = {
  id: '1',
  name: 'Family Circle',
  emoji: '👨‍👩‍👧‍👦',
  isAdmin: true,
  hasStarted: false,
  isRandom: false,
  members: [
    { id: '1', name: 'You', isAdmin: true },
    { id: '2', name: 'John Smith', isAdmin: false },
    { id: '3', name: 'Sarah Johnson', isAdmin: false },
    { id: '4', name: 'Mike Chen', isAdmin: false },
    { id: '5', name: 'Emily Davis', isAdmin: false },
    { id: '6', name: 'Alex Rodriguez', isAdmin: false },
  ],
  pendingRequests: [
    { id: '7', name: 'David Wilson' },
    { id: '8', name: 'Lisa Thompson' },
  ],
};

export default function GroupSettingsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [groupName, setGroupName] = useState(mockGroupSettings.name);
  const [groupEmoji, setGroupEmoji] = useState(mockGroupSettings.emoji);
  const [isRandom, setIsRandom] = useState(mockGroupSettings.isRandom);
  const [editingName, setEditingName] = useState(false);
  const [editingEmoji, setEditingEmoji] = useState(false);

  const handleStartGroup = () => {
    Alert.alert(
      'Start Group',
      'Are you sure you want to start this group? The rotation order will be locked.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start', style: 'default', onPress: () => console.log('Group started') },
      ]
    );
  };

  const handleLeaveGroup = () => {
    Alert.alert(
      'Leave Group',
      'Are you sure you want to leave this group?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Leave', style: 'destructive', onPress: () => router.back() },
      ]
    );
  };

  const handleAcceptRequest = (userId: string, name: string) => {
    Alert.alert(
      'Accept Request',
      `Accept ${name} to join the group?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Accept', style: 'default', onPress: () => console.log('Request accepted') },
      ]
    );
  };

  const handleRejectRequest = (userId: string, name: string) => {
    Alert.alert(
      'Reject Request',
      `Reject ${name}'s request to join?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reject', style: 'destructive', onPress: () => console.log('Request rejected') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Group Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Information</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Group Name</Text>
            <View style={styles.settingValue}>
              {editingName ? (
                <TextInput
                  style={styles.editInput}
                  value={groupName}
                  onChangeText={setGroupName}
                  onBlur={() => setEditingName(false)}
                  autoFocus
                />
              ) : (
                <TouchableOpacity 
                  style={styles.editableField}
                  onPress={() => setEditingName(true)}
                >
                  <Text style={styles.settingText}>{groupName}</Text>
                  <Edit3 size={16} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Group Emoji</Text>
            <View style={styles.settingValue}>
              {editingEmoji ? (
                <TextInput
                  style={styles.editInput}
                  value={groupEmoji}
                  onChangeText={setGroupEmoji}
                  onBlur={() => setEditingEmoji(false)}
                  autoFocus
                />
              ) : (
                <TouchableOpacity 
                  style={styles.editableField}
                  onPress={() => setEditingEmoji(true)}
                >
                  <Text style={styles.settingText}>{groupEmoji}</Text>
                  <Edit3 size={16} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Rotation Settings */}
        {mockGroupSettings.isAdmin && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rotation Settings</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Random Order</Text>
              <Switch
                value={isRandom}
                onValueChange={setIsRandom}
                disabled={mockGroupSettings.hasStarted}
                trackColor={{ false: '#e0e0e0', true: '#33b346' }}
                thumbColor={isRandom ? '#fff' : '#f4f3f4'}
              />
            </View>

            {!isRandom && !mockGroupSettings.hasStarted && (
              <View style={styles.memberOrder}>
                <Text style={styles.memberOrderTitle}>Rotation Order</Text>
                {mockGroupSettings.members.map((member, index) => (
                  <View key={member.id} style={styles.memberOrderItem}>
                    <Text style={styles.orderNumber}>{index + 1}</Text>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <View style={styles.dragHandle}>
                      <Text style={styles.dragHandleText}>⋮⋮</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Members Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Members ({mockGroupSettings.members.length})</Text>
            <TouchableOpacity style={styles.inviteButton}>
              <UserPlus size={16} color="#33b346" />
              <Text style={styles.inviteText}>Invite</Text>
            </TouchableOpacity>
          </View>

          {mockGroupSettings.members.map((member) => (
            <View key={member.id} style={styles.memberItem}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                {member.isAdmin && (
                  <Text style={styles.adminBadge}>Admin</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Pending Requests */}
        {mockGroupSettings.isAdmin && mockGroupSettings.pendingRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Requests</Text>
            {mockGroupSettings.pendingRequests.map((request) => (
              <View key={request.id} style={styles.requestItem}>
                <Text style={styles.requestName}>{request.name}</Text>
                <View style={styles.requestActions}>
                  <TouchableOpacity 
                    style={styles.acceptButton}
                    onPress={() => handleAcceptRequest(request.id, request.name)}
                  >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.rejectButton}
                    onPress={() => handleRejectRequest(request.id, request.name)}
                  >
                    <Text style={styles.rejectButtonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Actions */}
        <View style={styles.section}>
          {mockGroupSettings.isAdmin && !mockGroupSettings.hasStarted && (
            <TouchableOpacity style={styles.startButton} onPress={handleStartGroup}>
              <Text style={styles.startButtonText}>Start Group</Text>
            </TouchableOpacity>
          )}

          {!mockGroupSettings.hasStarted && (
            <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveGroup}>
              <LogOut size={20} color="#e74c3c" />
              <Text style={styles.leaveButtonText}>Leave Group</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  settingValue: {
    flex: 1,
    alignItems: 'flex-end',
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  editableField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editInput: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#33b346',
    paddingVertical: 4,
    minWidth: 100,
    textAlign: 'right',
  },
  memberOrder: {
    marginTop: 16,
  },
  memberOrderTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  memberOrderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#33b346',
    marginRight: 12,
    minWidth: 20,
  },
  memberName: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
    flex: 1,
  },
  dragHandle: {
    padding: 4,
  },
  dragHandleText: {
    fontSize: 16,
    color: '#999',
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(51, 179, 70, 0.1)',
    borderRadius: 8,
    gap: 4,
  },
  inviteText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#33b346',
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adminBadge: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#33b346',
    backgroundColor: 'rgba(51, 179, 70, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  requestName: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#33b346',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  acceptButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  rejectButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  rejectButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  startButton: {
    backgroundColor: '#33b346',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  startButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  leaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    gap: 8,
  },
  leaveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#e74c3c',
  },
});