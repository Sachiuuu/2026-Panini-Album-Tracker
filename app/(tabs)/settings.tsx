import { StyleSheet, Text, View } from 'react-native';

export default function Settings() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Exportar, importar y reiniciar el progreso.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0b1220',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: { color: '#9ca3af' },
});
