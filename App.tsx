import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useAppStore } from './src/store/useAppStore';
import { initStorage } from './src/services/storage';
import { colors } from './src/theme/colors';

export default function App() {
  const isDarkMode = useAppStore(state => state.isDarkMode);

  useEffect(() => {
    initStorage();
  }, []);

  const navTheme = isDarkMode
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.dark.background,
          card: colors.dark.surface,
          text: colors.dark.text,
          border: colors.dark.border,
          primary: colors.primary,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.light.background,
          card: colors.light.surface,
          text: colors.light.text,
          border: colors.light.border,
          primary: colors.primary,
        },
      };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
