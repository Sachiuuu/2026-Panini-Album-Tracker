import { Ionicons } from '@expo/vector-icons';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, UIManager, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HydrationGate } from '../src/components/HydrationGate';
import { colors } from '../src/theme/colors';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Run immediately when the module loads — before any React render.
injectWebPWA();

const SPLASH_BG = colors.bg;

function injectWebPWA() {
  if (Platform.OS !== 'web') return;
  const head = document.head;

  const addMeta = (name: string, content: string) => {
    if (document.querySelector(`meta[name="${name}"]`)) return;
    const m = document.createElement('meta');
    m.name = name; m.content = content;
    head.appendChild(m);
  };

  const addLink = (rel: string, href: string) => {
    if (document.querySelector(`link[rel="${rel}"]`)) return;
    const l = document.createElement('link');
    l.rel = rel; l.href = href;
    head.appendChild(l);
  };

  // Inject Ionicons @font-face before React renders so icons never show as squares.
  // The font lives at /fonts/Ionicons.ttf (stable path, no hash — served from public/).
  if (!document.querySelector('style[data-ionicons]')) {
    const s = document.createElement('style');
    s.setAttribute('data-ionicons', '1');
    s.textContent = `@font-face{font-family:'Ionicons';src:url('/fonts/Ionicons.ttf') format('truetype');font-weight:normal;font-style:normal;}`;
    head.insertBefore(s, head.firstChild);
  }

  addLink('manifest', '/manifest.json');
  addMeta('theme-color', '#fbbf24');
  addMeta('mobile-web-app-capable', 'yes');
  addMeta('apple-mobile-web-app-capable', 'yes');
  addMeta('apple-mobile-web-app-status-bar-style', 'black-translucent');
  addMeta('apple-mobile-web-app-title', 'Panini 2026');
  addLink('apple-touch-icon', '/icon-192.png');
}

export default function RootLayout() {
  // Include Ionicons font so icons render correctly on web too.
  const [fontsLoaded, fontError] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(Ionicons.font as any),
    BebasNeue: BebasNeue_400Regular,
    Inter: Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'Inter-ExtraBold': Inter_800ExtraBold,
  });

  // Safety timeout: if fonts don't resolve in 4 s (e.g. network error on web),
  // unblock the app so it at least renders with fallback fonts.
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 4000);
    return () => clearTimeout(t);
  }, []);


  const ready = fontsLoaded || !!fontError || timedOut;

  if (!ready) {
    return (
      <View style={styles.splash}>
        <Image
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          source={require('../assets/AppLogo.png')}
          style={styles.splashLogo}
          resizeMode="contain"
        />
      </View>
    );
  }

  const shell = (
    <HydrationGate>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.textPrimary,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
        <Stack.Screen name="section/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="team/[code]" options={{ headerShown: false }} />
      </Stack>
    </HydrationGate>
  );

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webRoot}>
        <View style={styles.webApp}>
          <SafeAreaProvider>
            <StatusBar style="light" />
            {shell}
          </SafeAreaProvider>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {shell}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: SPLASH_BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    width: 260,
    height: 260,
  },
  webRoot: {
    flex: 1,
    backgroundColor: '#060d18',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  webApp: {
    flex: 1,
    maxWidth: 480,
    backgroundColor: colors.bg,
  },
});
