# Panini 2026 Tracker

App móvil (Android + iOS) hecha con **Expo** para llevar el control del álbum **Panini FIFA World Cup 2026 USA · México · Canadá**.

## Funcionalidades

- Álbum ordenado: portada → introducción → estadios → grupos A–L.
- Marca/desmarca láminas con un toque; el estado queda guardado.
- Filtra cada sección por **Todos**, **Tengo** o **Faltan**.
- Busca por nombre de país, código de país o código de lámina (ej. `MEX5`).
- Cada selección tiene su página con los colores de su bandera.
- Dashboard de estadísticas:
  - Láminas obtenidas y faltantes.
  - Escudos `X/48` y fotos de equipo `X/48`.
  - **Top 5** selecciones más completadas y **Top 5** menos completadas.
- Exporta tu progreso a un archivo `.json` desde **Ajustes** y vuelve a cargarlo en otro dispositivo (reemplazar o combinar).

## Requisitos

- Node.js 20+ (probado con 22) y npm 10+
- Git
- App **Expo Go** instalada en tu celular (Android o iOS)
- Conexión a la misma red wifi que tu computadora

## Primer arranque

```bash
npm install
npm start
```

Cuando aparezca el QR en la terminal:

- **Android**: abre Expo Go y escanea el QR.
- **iOS**: abre la cámara del iPhone, escanea el QR y abre el enlace con Expo Go.

> En Windows, si el firewall pregunta por Node la primera vez que corras `npm start`, dale permiso en redes privadas; Expo Go necesita verlo en la LAN.

## Estructura

```
app/                 rutas (expo-router)
  (tabs)/            pestañas Álbum / Buscar / Ajustes
  section/[id].tsx   pantalla de sección (grupo o sección especial)
  team/[code].tsx    pantalla de equipo con colores del país
  onboarding.tsx     bienvenida
src/
  data/              datos del álbum (equipos, grupos, secciones especiales, colores)
  store/             estado con Zustand + persistencia en AsyncStorage
  components/        UI reutilizable
  utils/             helpers (export/import, formato, ids, debounce)
  theme/             paleta y tipografía
  i18n/es.ts         todos los textos en español
assets/              íconos y splash
```

## Actualizar los datos del álbum

Cuando Panini publique el álbum oficial con los conteos definitivos, edita **únicamente** los archivos de `src/data/`:

| Archivo | Qué actualizar |
|---|---|
| `teams.ts` | Reemplaza `TBD1`/`TBD2` por los ganadores de los repechajes intercontinentales. Ajusta nombres en español si hace falta. |
| `groups.ts` | Si los grupos cambian, actualiza la asignación (`group: 'A' \| ...`). |
| `stickerCounts.ts` | Si un equipo tiene más/menos láminas que el default (20), agrega un override en `TEAM_STICKER_OVERRIDES`. |
| `specialSections.ts` | Etiquetas reales para portada, intro (`FWC1..N`), estadios (`STA1..16`); agrega una sección de leyendas si Panini la incluye. |
| `countryColors.ts` | Si entran países nuevos, súmalos con sus colores de bandera. |

El builder en `album.ts` recompone el orden y vuelve a numerar todo automáticamente; **no toques los componentes**.

## Exportar / importar progreso

- **Exportar**: Ajustes → *Exportar mi álbum* → se genera un `.json` y se abre el menú de compartir (lo puedes mandar por WhatsApp, Drive, email, etc.).
- **Importar**: Ajustes → *Importar desde archivo* → eliges el `.json` y decides **Reemplazar** (sobrescribe) o **Combinar** (unión con lo que ya tienes).

El archivo está versionado (`version: 1`); si en el futuro la app cambia el formato, el importador rechaza versiones más nuevas con un mensaje claro.

## Fase 2 — Escaneo con cámara

Pendiente para una segunda versión: escanear el código del reverso de la lámina con la cámara y marcarla automáticamente. Los puntos de extensión están señalados con comentarios `// PHASE_2:` en el código y la documentación queda en `src/scan/README.md`.

## Scripts útiles

```bash
npm start             # arranca Metro (dev server)
npm run android       # abre en emulador/dispositivo Android
npm run ios           # abre en iOS (requiere macOS para builds nativos)
npx tsc --noEmit      # type-check sin generar archivos
```
