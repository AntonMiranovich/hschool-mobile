import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';

export default function ExpoInterviewPrepScreen() {
  const [theme, setTheme] = useState()


  const getThemeStyle = async () => {
    const themeStyle = await AsyncStorage.getItem('theme')
    if (themeStyle) {
      setTheme(JSON.parse(themeStyle))
    }
  }

  useEffect(() => {
    getThemeStyle()
  }, [])

  return (
    <ParallaxScrollView
      stateTheme={theme}
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="information-circle" style={styles.headerImage} />}
    >
      <ThemedView style={theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }} type="title">Project Description:</ThemedText>
      </ThemedView>
      <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>HSchool Educational School is an online learning platform designed to prepare individuals for interviews in web development. Our application focuses on providing comprehensive training and resources to help users excel in their interviews.</ThemedText>

      <ThemedView style={theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }} type="subtitle">How it Works:</ThemedText>
      </ThemedView>
      <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>Upon logging in, users are greeted with the homepage where they can access a curated list of topics relevant to web development interviews. The interface offers three primary buttons:</ThemedText>

      <ThemedView style={theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }} type="defaultSemiBold">1. Recommended Study Material:</ThemedText>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>Users can explore a selection of recommended study materials tailored to enhance their understanding of key concepts in web development, including HTML, CSS, JavaScript, and more.</ThemedText>
      </ThemedView>

      <ThemedView style={theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }} type="defaultSemiBold">2. Practice Exercises:</ThemedText>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>Access a variety of coding challenges and exercises aimed at sharpening technical skills and problem-solving abilities required for web development interviews.</ThemedText>
      </ThemedView>

      <ThemedView style={theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }} type="defaultSemiBold">3. Custom Filters:</ThemedText>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>Utilize customizable filters to narrow down study materials and exercises based on specific criteria such as difficulty level, topic, or technology stack.</ThemedText>
      </ThemedView >

      <ThemedView style={theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }} type="subtitle">Additional Features:</ThemedText>
      </ThemedView>

      <ThemedView style={theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>• Detailed Insights: Clicking on a particular topic or exercise provides users with in-depth information, including explanations, sample code, and suggested resources for further learning.</ThemedText>
      </ThemedView>
      <ThemedView style={theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>• Progress Tracking: Monitor your progress and track your performance across various topics and exercises to identify areas for improvement.</ThemedText>
      </ThemedView>
      <ThemedView style={theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>• Technical Support: If you encounter any difficulties or have questions, our support team is readily available to assist you. Simply reach out to us via email at support@hschool.com.</ThemedText>
      </ThemedView>

      <ThemedView style={theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }} type="subtitle">Having any troubles?</ThemedText>
      </ThemedView>

      <ThemedView style={theme?.dark ? { backgroundColor: 'white' } : { backgroundColor: 'black' }}>
        <ThemedText style={theme?.dark ? { color: 'black', backgroundColor: 'white' } : { color: 'white', backgroundColor: 'black' }}>Send us a text message anytime, and we're happy to help: support@hschool.com.</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
