export interface SpecialStickerSeed {
  code: string;
  label: string;
}

function buildFwc(): SpecialStickerSeed[] {
  const arr: SpecialStickerSeed[] = [];
  for (let i = 1; i <= 19; i++) {
    arr.push({ code: `FWC${i}`, label: `Especial FWC ${i}` });
  }
  return arr;
}

function buildCocaCola(): SpecialStickerSeed[] {
  const arr: SpecialStickerSeed[] = [];
  for (let i = 1; i <= 12; i++) {
    arr.push({ code: `CC${i}`, label: `Coca-Cola ${i}` });
  }
  return arr;
}

export const SPECIAL_STICKERS: SpecialStickerSeed[] = [
  { code: '00', label: 'Portada del álbum' },
  ...buildFwc(),
];

export const COCACOLA_STICKERS: SpecialStickerSeed[] = buildCocaCola();
