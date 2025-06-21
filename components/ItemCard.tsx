import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MapPin, Star, DollarSign } from 'lucide-react-native';
import { router } from 'expo-router';

interface ItemCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  distance: string;
  rating?: number;
  condition?: string;
  borrowingCost?: string;
  costPeriod?: string;
}

export default function ItemCard({ 
  id, 
  name, 
  image, 
  location, 
  distance, 
  rating, 
  condition, 
  borrowingCost, 
  costPeriod 
}: ItemCardProps) {
  const handlePress = () => {
    router.push(`/item/${id}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        
        {borrowingCost && (
          <View style={styles.priceContainer}>
            <DollarSign color="#006A4E" size={14} />
            <Text style={styles.price}>₵{borrowingCost}</Text>
            <Text style={styles.pricePeriod}>/{costPeriod || 'day'}</Text>
          </View>
        )}
        
        <View style={styles.locationContainer}>
          <MapPin color="#666" size={12} />
          <Text style={styles.location} numberOfLines={1}>{location} • {distance}</Text>
        </View>
        
        <View style={styles.metaContainer}>
          {rating && (
            <View style={styles.ratingContainer}>
              <Star color="#FFB800" size={12} fill="#FFB800" />
              <Text style={styles.rating}>{rating}</Text>
            </View>
          )}
          {condition && (
            <View style={[styles.conditionBadge, 
              condition === 'Excellent' || condition === 'New' ? styles.excellentBadge :
              condition === 'Good' || condition === 'Like New' ? styles.goodBadge : styles.fairBadge
            ]}>
              <Text style={[styles.conditionText,
                condition === 'Excellent' || condition === 'New' ? styles.excellentText :
                condition === 'Good' || condition === 'Like New' ? styles.goodText : styles.fairText
              ]}>{condition}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    flex: 1,
    minHeight: 260,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 6,
    lineHeight: 18,
    minHeight: 36,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: '#F0F8F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  price: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#006A4E',
    marginLeft: 2,
  },
  pricePeriod: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
    opacity: 0.8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginLeft: 3,
  },
  conditionBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
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
    fontSize: 9,
    fontFamily: 'Inter-Medium',
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
});