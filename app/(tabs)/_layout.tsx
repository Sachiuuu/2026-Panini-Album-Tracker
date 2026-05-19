import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useStrings } from '../../src/i18n/useStrings';
import { colors } from '../../src/theme/colors';

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
        tabBarStyle: { backgroundColor: colors.bg, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.tabs.album,
          tabBarIcon: ({ color, size }) => <Ionicons name="albums" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t.tabs.search,
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.tabs.settings,
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
