import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ALBUM_SCHEMA_VERSION } from '../data/schema';

const SCHEMA_NAME = 'panini-2026-tracker';
const APP_VERSION = '0.1.0';

export interface ExportPayload {
  schema: string;
  version: number;
  exportedAt: string;
  appVersion: string;
  owned: string[];
}

export function buildExportPayload(owned: Record<string, true>): ExportPayload {
  return {
    schema: SCHEMA_NAME,
    version: ALBUM_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    appVersion: APP_VERSION,
    owned: Object.keys(owned).sort(),
  };
}

export class ExportUnavailableError extends Error {}

export async function exportAlbumToShare(
  owned: Record<string, true>,
): Promise<void> {
  if (!(await Sharing.isAvailableAsync())) {
    throw new ExportUnavailableError('Sharing is not available on this device.');
  }

  const stamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace(/T/, '-')
    .slice(0, 19);
  const filename = `panini-2026-${stamp}.json`;
  const file = new File(Paths.cache, filename);
  if (file.exists) file.delete();
  file.create();

  const payload = buildExportPayload(owned);
  file.write(JSON.stringify(payload, null, 2));

  await Sharing.shareAsync(file.uri, {
    mimeType: 'application/json',
    dialogTitle: 'Exportar álbum',
    UTI: 'public.json',
  });
}
