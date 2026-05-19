import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { Sticker } from '../data/schema';
import { spacing } from '../theme/typography';
import { StickerTile } from './StickerTile';

const LIST_PADDING = spacing.lg;
const COL_GAP = spacing.md;

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
  const { width } = useWindowDimensions();
  const tileSize = Math.floor(
    (width - LIST_PADDING * 2 - COL_GAP * (numColumns - 1)) / numColumns,
  );

  return (
    <FlatList
      data={stickers}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => <StickerTile sticker={item} size={tileSize} />}
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
    padding: LIST_PADDING,
    gap: COL_GAP,
    paddingBottom: spacing.xxl,
  },
  row: {
    gap: COL_GAP,
    justifyContent: 'center',
  },
});
