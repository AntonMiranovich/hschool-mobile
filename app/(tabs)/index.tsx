import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRootNavigationState, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  // const topics = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'SQL', 'noSQL', 'Node.js'];
  const topics = ['HTML', 'CSS', 'JavaScript'];
  const router = useRouter()
  const [theme, setTheme] = useState()
  const navigationState = useRootNavigationState();


  const getThemeStyle = async () => {
    const themeStyle = await AsyncStorage.getItem('theme')
    if (themeStyle) {
      setTheme(JSON.parse(themeStyle))
    }
  }

  const handleTopicPress = (topic: string) => {
    router.navigate(topic);
  };

  console.log(theme);


  useEffect(() => {
    getThemeStyle()
  }, [])

  return (
    <LinearGradient
      colors={theme?.dark ? ['#A1CEDC', '#e4edef'] : ['#000000', '#6b6b6b']}
      style={styles.container}
    >

      <Image source={require('@/assets/images/HS.png')} style={{ width: '75%', resizeMode: 'contain', position: 'relative', bottom: '10%' }} />

      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
        <ThemedText type='title'>Выберите тему:</ThemedText>

        <View style={styles.topicList}>
          {topics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={styles.topicButton}
              onPress={() => handleTopicPress(topic)}
            >
              <ThemedText style={{ color: theme?.dark ? '#7fdcf8' : 'black' }}>{topic}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

    </LinearGradient >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topicList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    zIndex: 100
  },
  topicButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    margin: 5,
  },

  reactLogo: {
    height: 40,
    width: '70%',
    position: 'relative',
    left: '12%',
    marginBottom: 50
  },
});
