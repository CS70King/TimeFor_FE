import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, User } from 'lucide-react-native';

const mockGroups = [
  { id: '1', name: 'Family Circle', emoji: '👨‍👩‍👧‍👦', members: 6, balance: 1200 },
  { id: '2', name: 'Work Squad', emoji: '💼', members: 8, balance: 3200 },
  { id: '3', name: 'College Friends', emoji: '🎓', members: 12, balance: 2400 },
  { id: '4', name: 'Neighborhood', emoji: '🏘️', members: 15, balance: 5600 },
];

export default function GroupsScreen() {
  const router = useRouter();

  const renderGroup = ({ item }: { item: typeof mockGroups[0] }) => (
    <TouchableOpacity 
      style={styles.groupCard}
      onPress={() => router.push(`/group/${item.id}`)}
    >
      <View style={styles.groupHeader}>
        <View style={styles.groupInfo}>
          <Text style={styles.groupEmoji}>{item.emoji}</Text>
          <View style={styles.groupDetails}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text style={styles.groupMembers}>{item.members} members</Text>
          </View>
        </View>
        <View style={styles.groupBalance}>
          <Text style={styles.balanceAmount}>${item.balance.toLocaleString()}</Text>
          <Text style={styles.balanceLabel}>Pool</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Groups</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => router.push('/settings')}
        >
          <User size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockGroups}
        renderItem={renderGroup}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.groupsList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.createGroupButton}>
        <Plus size={24} color="#fff" />
        <Text style={styles.createGroupText}>Create Group</Text>
      </TouchableOpacity>
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
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupsList: {
    padding: 20,
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  groupMembers: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  groupBalance: {
    alignItems: 'flex-end',
  },
  balanceAmount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#33b346',
    marginBottom: 2,
  },
  balanceLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  createGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#33b346',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  createGroupText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
});