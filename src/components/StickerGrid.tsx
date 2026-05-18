import { FlatList, StyleSheet, View } from 'react-native';
import { Sticker } from '../data/schema';
import { spacing } from '../theme/typography';
import { StickerTile } from './StickerTile';

interface Props {
  stickers: Sticker[];
  numColumns?: number;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export function StickerGrid({
  stickers,
  numColumns = 4,
  ListHeaderComponent,
  ListEmptyComponent,
}: Props) {
  return (
    <FlatList
      data={stickers}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <StickerTile sticker={item} />
        </View>
      )}
      initialNumToRender={32}
      windowSize={7}
      removeClippedSubviews
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  row: {
    gap: spacing.md,
  },
  item: {
    alignItems: 'center',
  },
});
