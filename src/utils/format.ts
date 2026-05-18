export function formatPercent(value: number): string {
  if (Number.isNaN(value) || !Number.isFinite(value)) return '0%';
  return `${Math.round(value * 100)}%`;
}

export function formatFraction(owned: number, total: number): string {
  return `${owned}/${total}`;
}

export function pct(owned: number, total: number): number {
  if (total <= 0) return 0;
  return owned / total;
}
