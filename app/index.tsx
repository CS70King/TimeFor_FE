import { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/signup1');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>TimeFor</Text>
          </View>
          <Text style={styles.tagline}>Pan-African Item Lending</Text>
          <View style={styles.adinkraPattern}>
            <Text style={styles.adinkraSymbol}>𝔸</Text>
          </View>
        </View>
        <Text style={styles.welcomeText}>Building Community Through Sharing</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006A4E',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 15,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#006A4E',
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'white',
    opacity: 0.9,
  },
  adinkraPattern: {
    marginTop: 20,
    opacity: 0.3,
  },
  adinkraSymbol: {
    fontSize: 24,
    color: 'white',
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: 'white',
    textAlign: 'center',
    opacity: 0.8,
  },
});