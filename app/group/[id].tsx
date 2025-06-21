import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Settings, Send } from 'lucide-react-native';

const mockMessages = [
  {
    id: '1',
    type: 'system',
    message: 'Welcome to Family Circle! This is where your group manages contributions and payouts.',
    timestamp: '2024-01-15T10:00:00Z',
    sender: 'Sena',
  },
  {
    id: '2',
    type: 'system',
    message: 'John Smith joined the group',
    timestamp: '2024-01-15T10:30:00Z',
    sender: 'Sena',
  },
  {
    id: '3',
    type: 'system',
    message: 'Sarah Johnson made a contribution of $200',
    timestamp: '2024-01-15T14:30:00Z',
    sender: 'Sena',
  },
  {
    id: '4',
    type: 'user',
    message: 'Hey everyone! Looking forward to our first payout next month.',
    timestamp: '2024-01-15T15:00:00Z',
    sender: 'You',
  },
];

const groupInfo = {
  id: '1',
  name: 'Family Circle',
  emoji: '👨‍👩‍👧‍👦',
  members: 6,
  totalPool: 1200,
};

export default function GroupChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const renderMessage = ({ item }: { item: typeof mockMessages[0] }) => (
    <View style={[
      styles.messageContainer,
      item.type === 'system' ? styles.systemMessage : styles.userMessage,
      item.sender === 'You' && styles.ownMessage
    ]}>
      {item.type === 'system' && (
        <View style={styles.systemMessageHeader}>
          <Text style={styles.senaLogo}>Sena</Text>
        </View>
      )}
      <Text style={[
        styles.messageText,
        item.type === 'system' ? styles.systemMessageText : styles.userMessageText,
        item.sender === 'You' && styles.ownMessageText
      ]}>
        {item.message}
      </Text>
      <Text style={[
        styles.messageTime,
        item.type === 'system' ? styles.systemMessageTime : styles.userMessageTime,
        item.sender === 'You' && styles.ownMessageTime
      ]}>
        {new Date(item.timestamp).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.groupInfo}>
            <Text style={styles.groupEmoji}>{groupInfo.emoji}</Text>
            <View>
              <Text style={styles.groupName}>{groupInfo.name}</Text>
              <Text style={styles.memberCount}>{groupInfo.members} members</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => router.push(`/group/${id}/settings`)}
        >
          <Settings size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !message.trim() && styles.disabledSendButton]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send size={20} color={message.trim() ? '#fff' : '#999'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  groupEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  groupName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  memberCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  settingsButton: {
    padding: 8,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 20,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  systemMessage: {
    alignSelf: 'center',
    maxWidth: '90%',
  },
  userMessage: {
    alignSelf: 'flex-start',
  },
  ownMessage: {
    alignSelf: 'flex-end',
  },
  systemMessageHeader: {
    alignItems: 'center',
    marginBottom: 4,
  },
  senaLogo: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#33b346',
    backgroundColor: 'rgba(51, 179, 70, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    marginBottom: 4,
  },
  systemMessageText: {
    backgroundColor: 'rgba(51, 179, 70, 0.1)',
    color: '#333',
    padding: 12,
    borderRadius: 12,
    textAlign: 'center',
  },
  userMessageText: {
    backgroundColor: '#fff',
    color: '#333',
    padding: 12,
    borderRadius: 12,
    borderBottomLeftRadius: 4,
  },
  ownMessageText: {
    backgroundColor: '#33b346',
    color: '#fff',
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 12,
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  systemMessageTime: {
    color: '#666',
    textAlign: 'center',
  },
  userMessageTime: {
    color: '#666',
    marginLeft: 12,
  },
  ownMessageTime: {
    color: '#666',
    textAlign: 'right',
    marginRight: 12,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    maxHeight: 100,
    backgroundColor: '#f8f9fa',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#33b346',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: '#f0f0f0',
  },
});