import * as DocumentPicker from 'expo-document-picker';
import { ALBUM } from '../data/album';
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
  const payload = buildExportPayload(owned);
  const json = JSON.stringify(payload, null, 2);
  const stamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '-')
    .slice(0, 19);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `panini-2026-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export class ImportInvalidError extends Error {}
export class ImportVersionError extends Error {}
export class ImportCancelledError extends Error {}

export interface ParsedImport {
  payload: ExportPayload;
  ownedMap: Record<string, true>;
  unknownIds: string[];
}

function parsePayload(raw: string): ExportPayload {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new ImportInvalidError('invalid-json');
  }
  if (
    !json ||
    typeof json !== 'object' ||
    (json as ExportPayload).schema !== SCHEMA_NAME ||
    typeof (json as ExportPayload).version !== 'number' ||
    !Array.isArray((json as ExportPayload).owned)
  ) {
    throw new ImportInvalidError('invalid-shape');
  }
  const payload = json as ExportPayload;
  if (payload.version > ALBUM_SCHEMA_VERSION) {
    throw new ImportVersionError('version-too-new');
  }
  return payload;
}

export async function pickAndReadAlbum(): Promise<ParsedImport> {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/json',
    copyToCacheDirectory: false,
    multiple: false,
  });
  if (result.canceled) throw new ImportCancelledError('cancelled');
  const asset = result.assets[0];
  if (!asset?.uri) throw new ImportInvalidError('no-asset');

  const response = await fetch(asset.uri);
  const text = await response.text();
  const payload = parsePayload(text);

  const ownedMap: Record<string, true> = {};
  const unknownIds: string[] = [];
  for (const id of payload.owned) {
    if (ALBUM.stickerById[id]) ownedMap[id] = true;
    else unknownIds.push(id);
  }
  return { payload, ownedMap, unknownIds };
}
