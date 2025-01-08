import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { Button, View } from 'react-native'

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [theme, setTheme] = useState(colorScheme === 'dark' ? DarkTheme : DefaultTheme);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === DarkTheme ? DefaultTheme : DarkTheme));
  };

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerTitle: 'Назад', headerShown: false }} />
        <Stack.Screen name="[topic]" options={{ headerTitle: 'QA' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <View style={{ position: 'absolute', top: 20, right: 20 }}> <Button title="Toggle Theme" onPress={toggleTheme} /> </View>
    </ThemeProvider>
  );
}
