import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, Clock, Star, Lightbulb, Settings, CircleCheck as CheckCircle } from 'lucide-react-native';
import { mockAlerts } from '@/data/mockData';

const alertIcons = {
  reminder: Clock,
  feedback: Star,
  tip: Lightbulb,
  system: Settings,
};

const alertColors = {
  reminder: '#FF9800',
  feedback: '#4CAF50',
  tip: '#2196F3',
  system: '#9C27B0',
};

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState(mockAlerts);

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;

  const renderAlert = (alert: typeof mockAlerts[0]) => {
    const AlertIcon = alertIcons[alert.type];
    const alertColor = alertColors[alert.type];

    return (
      <TouchableOpacity
        key={alert.id}
        style={[styles.alertCard, !alert.read && styles.unreadAlert]}
        onPress={() => markAsRead(alert.id)}
      >
        <View style={styles.alertHeader}>
          <View style={[styles.iconContainer, { backgroundColor: alertColor + '20' }]}>
            <AlertIcon color={alertColor} size={20} />
          </View>
          <View style={styles.alertContent}>
            <View style={styles.alertTitleRow}>
              <Text style={[styles.alertTitle, !alert.read && styles.unreadTitle]}>
                {alert.title}
              </Text>
              {!alert.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.alertMessage}>{alert.message}</Text>
            <Text style={styles.alertTime}>{formatTime(alert.timestamp)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#333" size={24} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Alerts</Text>
            {unreadCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <View style={styles.placeholder} />
        </View>
        <Text style={styles.subtitle}>Stay updated with your TimeFor activity</Text>
        
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <CheckCircle color="#006A4E" size={16} />
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.alertsList} showsVerticalScrollIndicator={false}>
        {alerts.length > 0 ? (
          alerts.map(renderAlert)
        ) : (
          <View style={styles.emptyState}>
            <Bell color="#CCCCCC" size={48} />
            <Text style={styles.emptyStateTitle}>No alerts yet</Text>
            <Text style={styles.emptyStateText}>
              You'll receive notifications about return reminders, feedback requests, and platform updates here.
            </Text>
          </View>
        )}
      </ScrollView>

      {alerts.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 Pro tip: Keep alerts enabled to never miss important reminders about your borrowed items!
          </Text>
        </View>
      )}
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  backButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginRight: 12,
  },
  badgeContainer: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  markAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
    marginLeft: 6,
  },
  alertsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  alertCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#006A4E',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    flex: 1,
  },
  unreadTitle: {
    color: '#006A4E',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#006A4E',
    marginLeft: 8,
  },
  alertMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  alertTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
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
    marginTop: 16,
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
  footer: {
    backgroundColor: '#F0F8F5',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#006A4E',
    textAlign: 'center',
    lineHeight: 20,
  },
});