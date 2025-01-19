import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { CommonActions, useNavigation} from '@react-navigation/core'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { Button, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [theme, setTheme] = useState(colorScheme === 'dark' ? DarkTheme : DefaultTheme);

  

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const changingTheTheme = async () => {
    await AsyncStorage.setItem('theme', JSON.stringify(theme))
  }
  

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === DarkTheme ? DefaultTheme : DarkTheme));
    changingTheTheme()

    navigation.dispatch(CommonActions.reset({ routes: [{ name: '(tabs)' }] }));
  };

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerTitle: 'Назад', headerShown: false }}  />
        <Stack.Screen name="[topic]"  options={{ headerTitle: 'QA' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <View style={{ position: 'absolute', top: 20, right: 20 }}> <Button title="Toggle Theme" onPress={toggleTheme} /> </View>
    </ThemeProvider>
  );
}
