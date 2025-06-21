import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Upload, Plus, X, MapPin, DollarSign, Clock, Shield, Phone, MessageCircle } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const categories = ['Electronics', 'Furniture', 'Event Gear', 'Tools', 'Outdoor', 'Sports', 'Kitchen', 'Books', 'Other'];
const conditions = ['New', 'Like New', 'Good', 'Used'];
const durations = ['3 hours', '1 day', '3 days', '1 week', '2 weeks', 'Custom'];
const contactPreferences = ['WhatsApp', 'Call Only', 'Both'];
const paymentMethods = ['Cash in Person', 'Mobile Money', 'Bank Transfer'];

export default function LendScreen() {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [borrowingCost, setBorrowingCost] = useState('');
  const [costPeriod, setCostPeriod] = useState('per day');
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [pickupLocation, setPickupLocation] = useState('');
  const [deposit, setDeposit] = useState('');
  const [replacementValue, setReplacementValue] = useState('');
  const [selectedContactPreference, setSelectedContactPreference] = useState('');
  const [lendingRules, setLendingRules] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [availability, setAvailability] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleImagePicker = async () => {
    if (images.length >= 5) {
      Alert.alert('Maximum Images', 'You can upload up to 5 images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleCamera = async () => {
    if (images.length >= 5) {
      Alert.alert('Maximum Images', 'You can upload up to 5 images');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleDuration = (duration: string) => {
    if (selectedDurations.includes(duration)) {
      setSelectedDurations(selectedDurations.filter(d => d !== duration));
    } else {
      setSelectedDurations([...selectedDurations, duration]);
    }
  };

  const handleSubmit = () => {
    if (!itemName.trim() || !description.trim() || !selectedCategory || !selectedCondition || !borrowingCost.trim() || !replacementValue.trim()) {
      Alert.alert('Required Fields', 'Please fill in all required fields (Item name, Description, Category, Condition, Borrowing Cost, and Replacement Value)');
      return;
    }

    if (selectedDurations.length === 0) {
      Alert.alert('Duration Required', 'Please select at least one duration option');
      return;
    }

    if (!selectedContactPreference) {
      Alert.alert('Contact Preference Required', 'Please select your preferred contact method');
      return;
    }

    if (!selectedPaymentMethod) {
      Alert.alert('Payment Method Required', 'Please select a payment method');
      return;
    }

    Keyboard.dismiss();
    Alert.alert(
      'Item Listed Successfully!',
      'Thanks! Your item is now listed on TimeFor and available for the community to borrow.',
      [{ text: 'OK', onPress: () => resetForm() }]
    );
  };

  const resetForm = () => {
    setItemName('');
    setDescription('');
    setSelectedCategory('');
    setSelectedCondition('');
    setBorrowingCost('');
    setCostPeriod('per day');
    setSelectedDurations([]);
    setPickupLocation('');
    setDeposit('');
    setReplacementValue('');
    setSelectedContactPreference('');
    setLendingRules('');
    setSelectedPaymentMethod('');
    setAvailability('');
    setImages([]);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isFormValid = itemName.trim() && description.trim() && selectedCategory && selectedCondition && 
                     borrowingCost.trim() && replacementValue.trim() && selectedDurations.length > 0 && 
                     selectedContactPreference && selectedPaymentMethod;

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>List an Item</Text>
            <Text style={styles.subtitle}>Share what you have with the community</Text>
          </View>

          <View style={styles.form}>
            {/* Item Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Item Name *</Text>
              <TextInput
                style={styles.input}
                value={itemName}
                onChangeText={setItemName}
                placeholder="e.g., Portable Speaker"
                placeholderTextColor="#999"
                returnKeyType="next"
                onSubmitEditing={dismissKeyboard}
              />
            </View>

            {/* Category */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      selectedCategory === category && styles.categoryChipActive
                    ]}
                    onPress={() => setSelectedCategory(category)}
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

            {/* Photos */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Photos (2-5 recommended)</Text>
              <Text style={styles.helperText}>Clear images from all angles help build trust</Text>
              <View style={styles.imageContainer}>
                {images.map((uri, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri }} style={styles.uploadedImage} />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <X color="white" size={16} />
                    </TouchableOpacity>
                  </View>
                ))}
                
                {images.length < 5 && (
                  <View style={styles.imageUploadOptions}>
                    <TouchableOpacity style={styles.imageUploadButton} onPress={handleImagePicker}>
                      <Upload color="#006A4E" size={24} />
                      <Text style={styles.uploadText}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageUploadButton} onPress={handleCamera}>
                      <Camera color="#006A4E" size={24} />
                      <Text style={styles.uploadText}>Camera</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description *</Text>
              <Text style={styles.helperText}>Be honest about condition and include important details</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="e.g., Rechargeable Bluetooth speaker, comes with charger. Great sound quality, perfect for parties or outdoor events."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                returnKeyType="next"
                onSubmitEditing={dismissKeyboard}
              />
            </View>

            {/* Condition */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Condition *</Text>
              <View style={styles.conditionContainer}>
                {conditions.map((condition) => (
                  <TouchableOpacity
                    key={condition}
                    style={[
                      styles.conditionOption,
                      selectedCondition === condition && styles.conditionOptionActive
                    ]}
                    onPress={() => setSelectedCondition(condition)}
                  >
                    <Text style={[
                      styles.conditionText,
                      selectedCondition === condition && styles.conditionTextActive
                    ]}>
                      {condition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Borrowing Cost */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Borrowing Cost *</Text>
              <View style={styles.costContainer}>
                <View style={styles.costInputContainer}>
                  <DollarSign color="#666" size={20} />
                  <TextInput
                    style={styles.costInput}
                    value={borrowingCost}
                    onChangeText={setBorrowingCost}
                    placeholder="15"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={dismissKeyboard}
                  />
                </View>
                <View style={styles.periodContainer}>
                  {['per day', 'per 4 hours', 'per week'].map((period) => (
                    <TouchableOpacity
                      key={period}
                      style={[
                        styles.periodOption,
                        costPeriod === period && styles.periodOptionActive
                      ]}
                      onPress={() => setCostPeriod(period)}
                    >
                      <Text style={[
                        styles.periodText,
                        costPeriod === period && styles.periodTextActive
                      ]}>
                        {period}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Duration Options */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Duration Options *</Text>
              <Text style={styles.helperText}>Select all durations you're comfortable with</Text>
              <View style={styles.durationContainer}>
                {durations.map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.durationChip,
                      selectedDurations.includes(duration) && styles.durationChipActive
                    ]}
                    onPress={() => toggleDuration(duration)}
                  >
                    <Text style={[
                      styles.durationText,
                      selectedDurations.includes(duration) && styles.durationTextActive
                    ]}>
                      {duration}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Pickup/Drop Location */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pickup/Drop Location</Text>
              <View style={styles.locationInputContainer}>
                <MapPin color="#666" size={20} />
                <TextInput
                  style={styles.locationInput}
                  value={pickupLocation}
                  onChangeText={setPickupLocation}
                  placeholder="e.g., Tema Comm. 6"
                  placeholderTextColor="#999"
                  returnKeyType="next"
                  onSubmitEditing={dismissKeyboard}
                />
              </View>
            </View>

            {/* Deposit */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Deposit (Optional)</Text>
              <Text style={styles.helperText}>Security deposit to protect against damage</Text>
              <View style={styles.costInputContainer}>
                <Shield color="#666" size={20} />
                <TextInput
                  style={styles.costInput}
                  value={deposit}
                  onChangeText={setDeposit}
                  placeholder="30"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={dismissKeyboard}
                />
              </View>
            </View>

            {/* Replacement Value - Enhanced */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Replacement Value *</Text>
              <Text style={styles.helperText}>
                💡 This is the full cost to replace your item if it's lost or severely damaged. 
                This helps protect you and guides fair compensation in disputes.
              </Text>
              <View style={styles.replacementValueContainer}>
                <View style={styles.costInputContainer}>
                  <DollarSign color="#006A4E" size={20} />
                  <TextInput
                    style={styles.costInput}
                    value={replacementValue}
                    onChangeText={setReplacementValue}
                    placeholder="200"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={dismissKeyboard}
                  />
                </View>
                <View style={styles.replacementValueInfo}>
                  <Shield color="#006A4E" size={16} />
                  <Text style={styles.replacementValueInfoText}>
                    This protects both you and the borrower
                  </Text>
                </View>
              </View>
            </View>

            {/* Contact Preference */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contact Preference *</Text>
              <View style={styles.contactContainer}>
                {contactPreferences.map((preference) => (
                  <TouchableOpacity
                    key={preference}
                    style={[
                      styles.contactOption,
                      selectedContactPreference === preference && styles.contactOptionActive
                    ]}
                    onPress={() => setSelectedContactPreference(preference)}
                  >
                    {preference === 'WhatsApp' && <MessageCircle color={selectedContactPreference === preference ? 'white' : '#666'} size={16} />}
                    {preference === 'Call Only' && <Phone color={selectedContactPreference === preference ? 'white' : '#666'} size={16} />}
                    {preference === 'Both' && <Plus color={selectedContactPreference === preference ? 'white' : '#666'} size={16} />}
                    <Text style={[
                      styles.contactText,
                      selectedContactPreference === preference && styles.contactTextActive
                    ]}>
                      {preference}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Lending Rules */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Lending Rules</Text>
              <Text style={styles.helperText}>Set clear expectations for borrowers</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={lendingRules}
                onChangeText={setLendingRules}
                placeholder="e.g., Return clean, Handle with care, Maximum 3 days, No smoking around item..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                returnKeyType="next"
                onSubmitEditing={dismissKeyboard}
              />
            </View>

            {/* Payment Method */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Payment Method *</Text>
              <View style={styles.paymentContainer}>
                {paymentMethods.map((method) => (
                  <TouchableOpacity
                    key={method}
                    style={[
                      styles.paymentOption,
                      selectedPaymentMethod === method && styles.paymentOptionActive
                    ]}
                    onPress={() => setSelectedPaymentMethod(method)}
                  >
                    <Text style={[
                      styles.paymentText,
                      selectedPaymentMethod === method && styles.paymentTextActive
                    ]}>
                      {method}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Availability */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Availability</Text>
              <View style={styles.availabilityInputContainer}>
                <Clock color="#666" size={20} />
                <TextInput
                  style={styles.availabilityInput}
                  value={availability}
                  onChangeText={setAvailability}
                  placeholder="e.g., Mon-Fri 9AM-6PM, Weekends only, Available daily..."
                  placeholderTextColor="#999"
                  returnKeyType="done"
                  onSubmitEditing={dismissKeyboard}
                />
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.submitButton, isFormValid ? {} : styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!isFormValid}
            >
              <Text style={styles.submitButtonText}>List Item</Text>
            </TouchableOpacity>
            
            <Text style={styles.disclaimer}>
              By listing your item, you agree to TimeFor's community guidelines and lending terms.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
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
  form: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  helperText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryChip: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryChipActive: {
    backgroundColor: '#006A4E',
    borderColor: '#006A4E',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  categoryTextActive: {
    color: 'white',
  },
  conditionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionOption: {
    flex: 1,
    minWidth: '22%',
    backgroundColor: '#FAFAFA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  conditionOptionActive: {
    backgroundColor: '#006A4E',
    borderColor: '#006A4E',
  },
  conditionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  conditionTextActive: {
    color: 'white',
  },
  costContainer: {
    gap: 12,
  },
  costInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
  },
  costInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
  },
  periodContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  periodOption: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  periodOptionActive: {
    backgroundColor: '#006A4E',
    borderColor: '#006A4E',
  },
  periodText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  periodTextActive: {
    color: 'white',
  },
  durationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  durationChip: {
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  durationChipActive: {
    backgroundColor: '#006A4E',
    borderColor: '#006A4E',
  },
  durationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  durationTextActive: {
    color: 'white',
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
  },
  locationInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
  },
  replacementValueContainer: {
    gap: 12,
  },
  replacementValueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  replacementValueInfoText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
    marginLeft: 6,
  },
  contactContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  contactOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 6,
  },
  contactOptionActive: {
    backgroundColor: '#006A4E',
    borderColor: '#006A4E',
  },
  contactText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  contactTextActive: {
    color: 'white',
  },
  paymentContainer: {
    gap: 8,
  },
  paymentOption: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  paymentOptionActive: {
    backgroundColor: '#006A4E',
    borderColor: '#006A4E',
  },
  paymentText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
    textAlign: 'center',
  },
  paymentTextActive: {
    color: 'white',
  },
  availabilityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 16,
  },
  availabilityInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageWrapper: {
    position: 'relative',
  },
  uploadedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#F44336',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  imageUploadButton: {
    width: 80,
    height: 80,
    backgroundColor: '#F0F8F5',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#006A4E',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#006A4E',
    marginTop: 4,
  },
  footer: {
    padding: 20,
  },
  submitButton: {
    backgroundColor: '#006A4E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});