import { StyleSheet, Text, View } from 'react-native';

export default function Search() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Buscar por país o código de lámina.</Text>
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
