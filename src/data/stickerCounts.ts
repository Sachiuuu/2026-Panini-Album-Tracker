export const DEFAULT_TEAM_STICKERS = 20;

export const TEAM_STICKER_OVERRIDES: Record<string, number> = {};

export function getStickerCountForTeam(teamCode: string): number {
  return TEAM_STICKER_OVERRIDES[teamCode] ?? DEFAULT_TEAM_STICKERS;
}
