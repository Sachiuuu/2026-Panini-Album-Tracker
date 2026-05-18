import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AlbumHome() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Mi Álbum</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>El álbum aparecerá aquí.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0b1220' },
  content: { padding: 16, gap: 16 },
  title: { color: '#ffffff', fontSize: 24, fontWeight: '700' },
  placeholder: {
    padding: 24,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
  },
  placeholderText: { color: '#9ca3af' },
});
