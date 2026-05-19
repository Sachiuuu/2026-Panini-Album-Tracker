import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { useStrings } from '../../src/i18n/useStrings';
import { colors } from '../../src/theme/colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function tabIcon(
  outlineName: IoniconsName,
  filledName: IoniconsName,
): (props: { color: string; size: number; focused: boolean }) => React.ReactElement {
  return ({ color, size, focused }) => (
    <Ionicons name={focused ? filledName : outlineName} color={color} size={size} />
  );
}

// PHASE_2: añadir aquí una cuarta tab "Escanear" o un FAB que abra app/scan.tsx.
// Ver src/scan/README.md para detalles del flujo.
export default function TabsLayout() {
  const t = useStrings();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarBackground: Platform.OS === 'ios'
          ? () => <BlurView tint="dark" intensity={80} style={StyleSheet.absoluteFill} />
          : undefined,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.tabs.album,
          tabBarIcon: tabIcon('albums-outline', 'albums'),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t.tabs.search,
          tabBarIcon: tabIcon('search-outline', 'search'),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.tabs.settings,
          tabBarIcon: tabIcon('settings-outline', 'settings'),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 10,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : colors.bg,
    borderTopColor: colors.border,
  },
});
