import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, Star, ShieldCheck, Camera, CreditCard as Edit3, Globe, Shield, Trash2, ChevronRight } from 'lucide-react-native';

const languages = ['English', 'Twi', 'Hausa', 'French'];
const badges = ['Trusted Lender', 'Fast Returner', 'Community Helper'];

export default function ProfileScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const profileData = {
    name: 'John Mensah',
    email: 'john.mensah@example.com',
    location: 'Accra, Ghana',
    rating: 4.8,
    verified: true,
    itemsListed: 5,
    itemsBorrowed: 12,
    itemsLent: 8,
  };

  const myListedItems = [
    {
      id: '1',
      name: 'Power Drill Set',
      image: 'https://images.pexels.com/photos/1250835/pexels-photo-1250835.jpeg',
      status: 'Available',
    },
    {
      id: '2',
      name: 'Camping Tent',
      image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg',
      status: 'Borrowed',
    },
    {
      id: '3',
      name: 'Sound System',
      image: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg',
      status: 'Available',
    },
  ];

  const renderProfileSection = () => (
    <View style={styles.profileSection}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profileData.name.charAt(0)}</Text>
        </View>
        <TouchableOpacity style={styles.cameraButton}>
          <Camera color="white" size={16} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.profileName}>{profileData.name}</Text>
          {profileData.verified && (
            <ShieldCheck color="#4CAF50" size={20} fill="#4CAF50" />
          )}
        </View>
        
        <View style={styles.locationContainer}>
          <MapPin color="#666" size={16} />
          <Text style={styles.locationText}>{profileData.location}</Text>
        </View>
        
        <View style={styles.ratingContainer}>
          <Star color="#FFB800" size={16} fill="#FFB800" />
          <Text style={styles.ratingText}>{profileData.rating} rating</Text>
        </View>
      </View>
    </View>
  );

  const renderStatsSection = () => (
    <View style={styles.statsSection}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{profileData.itemsListed}</Text>
        <Text style={styles.statLabel}>Items Listed</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{profileData.itemsBorrowed}</Text>
        <Text style={styles.statLabel}>Items Borrowed</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{profileData.itemsLent}</Text>
        <Text style={styles.statLabel}>Items Lent</Text>
      </View>
    </View>
  );

  const renderBadgesSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Badges Earned</Text>
      <View style={styles.badgesContainer}>
        {badges.map((badge, index) => (
          <View key={index} style={styles.badge}>
            <Shield color="#006A4E" size={16} />
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderMyItemsSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Listed Items</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {myListedItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemImagePlaceholder}>
              <Text style={styles.itemImageText}>📷</Text>
            </View>
            <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
            <View style={[styles.itemStatus, 
              item.status === 'Available' ? styles.availableStatus : styles.borrowedStatus
            ]}>
              <Text style={[styles.itemStatusText,
                item.status === 'Available' ? styles.availableStatusText : styles.borrowedStatusText
              ]}>
                {item.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderSettingsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Settings</Text>
      
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Edit3 color="#666" size={20} />
          <Text style={styles.settingText}>Edit Profile</Text>
        </View>
        <ChevronRight color="#999" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Shield color="#666" size={20} />
          <Text style={styles.settingText}>Verify Identity</Text>
        </View>
        <ChevronRight color="#999" size={20} />
      </TouchableOpacity>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Globe color="#666" size={20} />
          <Text style={styles.settingText}>Language</Text>
        </View>
        <View style={styles.languageSelector}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language}
              style={[
                styles.languageOption,
                selectedLanguage === language && styles.languageOptionSelected
              ]}
              onPress={() => setSelectedLanguage(language)}
            >
              <Text style={[
                styles.languageOptionText,
                selectedLanguage === language && styles.languageOptionTextSelected
              ]}>
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Text style={styles.settingText}>Notifications</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#E0E0E0', true: '#006A4E' }}
          thumbColor="white"
        />
      </View>

      <TouchableOpacity style={[styles.settingItem, styles.dangerItem]}>
        <View style={styles.settingLeft}>
          <Trash2 color="#F44336" size={20} />
          <Text style={[styles.settingText, styles.dangerText]}>Delete Account</Text>
        </View>
        <ChevronRight color="#F44336" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderProfileSection()}
        {renderStatsSection()}
        {renderBadgesSection()}
        {renderMyItemsSection()}
        {renderSettingsSection()}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            TimeFor v1.0 - Built for the Pan-African community 🌍
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  profileSection: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#006A4E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#333',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  profileInfo: {
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginRight: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginLeft: 4,
  },
  statsSection: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 20,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#006A4E',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
    marginLeft: 6,
  },
  itemCard: {
    width: 120,
    marginRight: 16,
  },
  itemImagePlaceholder: {
    width: 120,
    height: 80,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImageText: {
    fontSize: 24,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginBottom: 6,
  },
  itemStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  availableStatus: {
    backgroundColor: '#E8F5E8',
  },
  borrowedStatus: {
    backgroundColor: '#FFF4E6',
  },
  itemStatusText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  availableStatusText: {
    color: '#4CAF50',
  },
  borrowedStatusText: {
    color: '#FF9800',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
    marginLeft: 12,
  },
  languageSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  languageOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
  },
  languageOptionSelected: {
    backgroundColor: '#006A4E',
  },
  languageOptionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  languageOptionTextSelected: {
    color: 'white',
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: '#F44336',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    textAlign: 'center',
  },
});