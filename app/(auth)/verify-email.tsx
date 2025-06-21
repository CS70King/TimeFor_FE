import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Mail, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function VerifyEmail() {
  const handleContinue = () => {
    router.push('/(auth)/verify-phone');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Mail color="#006A4E" size={48} />
          <View style={styles.checkmark}>
            <CheckCircle color="#4CAF50" size={24} />
          </View>
        </View>
        
        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.subtitle}>
          A verification link has been sent to your email. Please check your inbox to continue.
        </Text>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            • Click the verification link in your email{'\n'}
            • If you don't see it, check your spam folder{'\n'}
            • The link expires in 24 hours
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>I've Verified My Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Resend Verification Email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  checkmark: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  instructions: {
    backgroundColor: '#F0F8F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    width: '100%',
  },
  instructionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#333',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#006A4E',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  secondaryButton: {
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#006A4E',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});