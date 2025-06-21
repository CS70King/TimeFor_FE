import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Star, Shield, MessageCircle, Clock, CircleCheck as CheckCircle, DollarSign, Phone, CreditCard, Calendar, User, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { mockItems } from '@/data/mockData';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const item = mockItems.find(item => item.id === id);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color="#333" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Item not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleRequestItem = async () => {
    const message = `Hi ${item.owner.name}! I saw your "${item.name}" listed on TimeFor and would love to borrow it.

📱 Item: ${item.name}
💰 Cost: ₵${item.borrowingCost}/${item.costPeriod}
📍 Location: ${item.location}
🏠 Pickup: ${item.pickupLocation || item.location}

Is it still available? Looking forward to hearing from you!

- Sent via TimeFor App`;

    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    
    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        // Fallback to web WhatsApp
        const webWhatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        await Linking.openURL(webWhatsappUrl);
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  };

  const getContactIcon = () => {
    switch (item.contactPreference) {
      case 'WhatsApp':
        return <MessageCircle color="white" size={20} />;
      case 'Call Only':
        return <Phone color="white" size={20} />;
      default:
        return <MessageCircle color="white" size={20} />;
    }
  };

  const getContactText = () => {
    switch (item.contactPreference) {
      case 'WhatsApp':
        return 'Request via WhatsApp';
      case 'Call Only':
        return 'Call to Request';
      case 'Both':
        return 'Contact Owner';
      default:
        return 'Contact Owner';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#333" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: item.image }} style={styles.heroImage} />

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin color="#666" size={16} />
              <Text style={styles.locationText}>{item.location} • {item.distance}</Text>
            </View>
          </View>

          {/* Pricing Section */}
          <View style={styles.pricingSection}>
            <View style={styles.priceContainer}>
              <DollarSign color="#006A4E" size={24} />
              <Text style={styles.price}>₵{item.borrowingCost}</Text>
              <Text style={styles.pricePeriod}>/{item.costPeriod}</Text>
            </View>
            {item.deposit && (
              <View style={styles.depositContainer}>
                <Shield color="#FF9800" size={16} />
                <Text style={styles.depositText}>₵{item.deposit} deposit</Text>
              </View>
            )}
          </View>

          {/* Duration Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Durations</Text>
            <View style={styles.durationContainer}>
              {item.durations.map((duration, index) => (
                <View key={index} style={styles.durationChip}>
                  <Clock color="#006A4E" size={14} />
                  <Text style={styles.durationText}>{duration}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Meta Information */}
          <View style={styles.metaSection}>
            <View style={[styles.conditionBadge, 
              item.condition === 'Excellent' || item.condition === 'New' ? styles.excellentBadge :
              item.condition === 'Good' || item.condition === 'Like New' ? styles.goodBadge : styles.fairBadge
            ]}>
              <Text style={[styles.conditionText,
                item.condition === 'Excellent' || item.condition === 'New' ? styles.excellentText :
                item.condition === 'Good' || item.condition === 'Like New' ? styles.goodText : styles.fairText
              ]}>{item.condition}</Text>
            </View>
            <View style={styles.availabilityContainer}>
              <Calendar color="#006A4E" size={16} />
              <Text style={styles.availabilityText}>{item.availability}</Text>
            </View>
          </View>

          {/* Owner Section */}
          <View style={styles.ownerSection}>
            <View style={styles.ownerInfo}>
              <View style={styles.avatar}>
                <User color="white" size={24} />
              </View>
              <View style={styles.ownerDetails}>
                <View style={styles.ownerNameContainer}>
                  <Text style={styles.ownerName}>{item.owner.name}</Text>
                  {item.owner.verified && (
                    <Shield color="#4CAF50" size={16} fill="#4CAF50" />
                  )}
                </View>
                <View style={styles.ratingContainer}>
                  <Star color="#FFB800" size={14} fill="#FFB800" />
                  <Text style={styles.rating}>{item.owner.rating} rating</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          {/* Pickup Location */}
          {item.pickupLocation && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pickup Location</Text>
              <View style={styles.pickupContainer}>
                <MapPin color="#006A4E" size={16} />
                <Text style={styles.pickupText}>{item.pickupLocation}</Text>
              </View>
            </View>
          )}

          {/* Payment & Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment & Contact</Text>
            <View style={styles.paymentContactContainer}>
              <View style={styles.paymentInfo}>
                <CreditCard color="#666" size={16} />
                <Text style={styles.paymentText}>{item.paymentMethod}</Text>
              </View>
              <View style={styles.contactInfo}>
                {item.contactPreference === 'WhatsApp' && <MessageCircle color="#666" size={16} />}
                {item.contactPreference === 'Call Only' && <Phone color="#666" size={16} />}
                {item.contactPreference === 'Both' && <MessageCircle color="#666" size={16} />}
                <Text style={styles.contactText}>{item.contactPreference}</Text>
              </View>
            </View>
          </View>

          {/* Enhanced Replacement Value Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Item Protection</Text>
            <View style={styles.replacementValueSection}>
              <View style={styles.replacementValueHeader}>
                <AlertTriangle color="#FF9800" size={20} />
                <Text style={styles.replacementValueTitle}>Replacement Value</Text>
              </View>
              <View style={styles.replacementValueContent}>
                <Text style={styles.replacementValueAmount}>₵{item.replacementValue}</Text>
                <Text style={styles.replacementValueDescription}>
                  This is the full cost to replace this item if it's lost or severely damaged. 
                  This amount helps ensure fair compensation and protects both the lender and borrower.
                </Text>
              </View>
              <View style={styles.protectionInfo}>
                <View style={styles.protectionItem}>
                  <Shield color="#4CAF50" size={16} />
                  <Text style={styles.protectionText}>Lender Protection</Text>
                </View>
                <View style={styles.protectionItem}>
                  <CheckCircle color="#4CAF50" size={16} />
                  <Text style={styles.protectionText}>Fair Dispute Resolution</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Lending Rules */}
          {item.rules && item.rules.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Lending Rules</Text>
              {item.rules.map((rule, index) => (
                <View key={index} style={styles.ruleItem}>
                  <CheckCircle color="#006A4E" size={16} />
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerPricing}>
            <Text style={styles.footerPrice}>₵{item.borrowingCost}/{item.costPeriod}</Text>
            {item.deposit && (
              <Text style={styles.footerDeposit}>+₵{item.deposit} deposit</Text>
            )}
          </View>
          <TouchableOpacity style={styles.requestButton} onPress={handleRequestItem}>
            {getContactIcon()}
            <Text style={styles.requestButtonText}>{getContactText()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  itemName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 4,
  },
  pricingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F8F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#006A4E',
    marginLeft: 4,
  },
  pricePeriod: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
    opacity: 0.8,
  },
  depositContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  depositText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FF9800',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  durationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  durationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#006A4E',
  },
  durationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
    marginLeft: 4,
  },
  metaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  conditionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  excellentBadge: {
    backgroundColor: '#E8F5E8',
  },
  goodBadge: {
    backgroundColor: '#FFF4E6',
  },
  fairBadge: {
    backgroundColor: '#FFF0F0',
  },
  conditionText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  excellentText: {
    color: '#4CAF50',
  },
  goodText: {
    color: '#FF9800',
  },
  fairText: {
    color: '#F44336',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
    marginLeft: 4,
  },
  ownerSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#006A4E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ownerDetails: {
    flex: 1,
  },
  ownerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ownerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 4,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 24,
  },
  pickupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8F5',
    padding: 12,
    borderRadius: 8,
  },
  pickupText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
    marginLeft: 8,
  },
  paymentContactContainer: {
    gap: 12,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
  },
  paymentText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginLeft: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
  },
  contactText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginLeft: 8,
  },
  replacementValueSection: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFE0B3',
  },
  replacementValueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  replacementValueTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF9800',
    marginLeft: 8,
  },
  replacementValueContent: {
    marginBottom: 16,
  },
  replacementValueAmount: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FF9800',
    marginBottom: 8,
  },
  replacementValueDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 20,
  },
  protectionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#FFE0B3',
  },
  protectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  protectionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4CAF50',
    marginLeft: 4,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ruleText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  footer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerPricing: {
    flex: 1,
  },
  footerPrice: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#006A4E',
  },
  footerDeposit: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FF9800',
    marginTop: 2,
  },
  requestButton: {
    backgroundColor: '#006A4E',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#006A4E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  requestButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
});