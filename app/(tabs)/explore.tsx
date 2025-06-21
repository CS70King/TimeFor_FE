import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bell, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';
import ItemCard from '@/components/ItemCard';
import { mockItems, mockAlerts } from '@/data/mockData';

const categories = ['All', 'Tech', 'Travel', 'Sports', 'Home'];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(mockItems);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterItems(query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterItems(searchQuery, category);
    Keyboard.dismiss();
  };

  const filterItems = (query: string, category: string) => {
    let filtered = mockItems;

    if (category !== 'All') {
      // Map new categories to existing item categories
      const categoryMap: { [key: string]: string[] } = {
        'Tech': ['Electronics'],
        'Travel': ['Outdoor'],
        'Sports': ['Sports'],
        'Home': ['Furniture', 'Kitchen', 'Tools']
      };
      
      const mappedCategories = categoryMap[category] || [category];
      filtered = filtered.filter(item => 
        mappedCategories.some(cat => item.category.toLowerCase().includes(cat.toLowerCase()))
      );
    }

    if (query.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleAlertsPress = () => {
    router.push('/alerts');
  };

  // Get unread alerts count
  const unreadAlertsCount = mockAlerts.filter(alert => !alert.read).length;

  const renderItem = ({ item, index }: { item: typeof mockItems[0], index: number }) => (
    <View style={[styles.itemContainer, index % 2 === 1 && styles.itemContainerRight]}>
      <ItemCard
        id={item.id}
        name={item.name}
        image={item.image}
        location={item.location}
        distance={item.distance}
        rating={item.owner.rating}
        condition={item.condition}
        borrowingCost={item.borrowingCost}
        costPeriod={item.costPeriod}
      />
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Good morning!</Text>
              <Text style={styles.subtitle}>What do you need today?</Text>
            </View>
            <TouchableOpacity style={styles.alertsButton} onPress={handleAlertsPress}>
              <Bell color="#006A4E" size={24} />
              {unreadAlertsCount > 0 && (
                <View style={styles.alertsBadge}>
                  <Text style={styles.alertsBadgeText}>{unreadAlertsCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search color="#666" size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search items..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#999"
              returnKeyType="search"
              onSubmitEditing={dismissKeyboard}
              blurOnSubmit={true}
            />
          </View>
        </View>

        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.locationBanner}>
            <MapPin color="#006A4E" size={16} />
            <Text style={styles.locationText}>Showing items near Accra, Ghana</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.categoriesWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
            keyboardShouldPersistTaps="handled"
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive
                ]}
                onPress={() => handleCategoryChange(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {filteredItems.length} items available
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={dismissKeyboard}
          key={`${selectedCategory}-${filteredItems.length}`} // Force re-render when category or items change
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 4,
  },
  alertsButton: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  alertsBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  alertsBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8F5',
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
    marginLeft: 4,
  },
  categoriesWrapper: {
    height: 50,
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    flexGrow: 0,
  },
  categoriesContent: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryChip: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    minHeight: 42,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryChipActive: {
    backgroundColor: '#006A4E',
    borderColor: '#006A4E',
    shadowColor: '#006A4E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#666',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: 'white',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 16,
  },
  itemContainerRight: {
    marginLeft: 8,
  },
});