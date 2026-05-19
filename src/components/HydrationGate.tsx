import { ReactNode } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { useHydrated } from '../store/selectors';
import { colors } from '../theme/colors';

interface Props {
  children: ReactNode;
}

export function HydrationGate({ children }: Props) {
  const ready = useHydrated();
  // On web, AsyncStorage (localStorage) is synchronous under the hood;
  // if hydration hasn't fired yet after mount, render anyway to avoid blank screen.
  if (!ready && Platform.OS !== 'web') {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }
  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
