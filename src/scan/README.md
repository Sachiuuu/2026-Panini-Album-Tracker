# Fase 2 — Escaneo con cámara

Este directorio queda reservado para la funcionalidad de **escaneo con cámara** del código que viene en el reverso de cada lámina Panini. No es parte del MVP.

## Idea

Al escanear el código (alfanumérico o de barras) del reverso, la app:

1. Detecta el código mediante OCR / lector de códigos.
2. Lo normaliza al formato usado en el álbum (ej. `MEX5`, `STA1`, `FWC3`).
3. Marca el sticker como obtenido vía `toggleOwned` o `setOwned`.
4. Muestra un toast de confirmación con el nombre del jugador/sección.

## Puntos de extensión ya preparados

Los siguientes lugares quedaron marcados con `// PHASE_2:` o documentados aquí:

| Lugar | Qué falta |
|---|---|
| `src/components/StickerTile.tsx` (prop `onScan?`) | Conectar un atajo a la cámara desde un sticker individual cuando el usuario haga long-press. |
| `app/(tabs)/_layout.tsx` | Añadir una cuarta pestaña "Escanear" o un botón flotante. |
| `app/scan.tsx` (no creada aún) | Pantalla con la vista de la cámara y la lógica de detección. |
| `src/data/schema.ts` → `Sticker` | Añadir `recognitionHints?: { ocrCodes?: string[] }` para casos donde el código impreso difiera del código del álbum. |
| `useAlbumStore` (persist `version`) | Subir a `version: 2` y agregar un paso `migrate` para el nuevo campo. |

## Dependencias a añadir en Fase 2

Sugerencia mínima:

```bash
npx expo install expo-camera
# OCR opcional: react-native-mlkit-ocr, expo-text-recognition o un servicio cloud
```

`app.json` necesitará el plugin de cámara y los permisos correspondientes:

```json
{
  "expo": {
    "plugins": [
      ["expo-camera", { "cameraPermission": "Permite escanear el código de tus láminas." }]
    ]
  }
}
```

## Decisiones pendientes

- ¿OCR local (offline, sin costo) o cloud (más preciso)?
- ¿Detección de código de barras / QR si Panini imprime alguno, vs OCR del texto?
- Persistir un log de escaneos para deshacer si alguien marcó mal.
