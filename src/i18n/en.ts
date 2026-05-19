import { Strings } from './es';

export const en: Strings = {
  appName: 'WC 2026 Sticker Tracker',

  tabs: {
    album: 'Home',
    search: 'Search',
    settings: 'Settings',
  },

  onboarding: {
    title: 'Welcome!',
    subtitle: 'Track your FIFA World Cup 2026 (USA · Mexico · Canada) sticker album.',
    bullets: [
      'Mark the stickers you already have.',
      'Search by country or code (e.g. MEX5).',
      'Filter the ones you are missing.',
      'Export your progress to use on another phone.',
    ],
    cta: 'Get Started',
  },

  home: {
    title: 'WC 2026 Sticker Tracker',
    sectionsHeader: 'Sections',
    stats: {
      collected: 'Collected',
      missing: 'Missing',
      emblems: 'Emblems',
      lineups: 'Team Photos',
      top5: 'Top 5 most complete',
      bottom5: 'Top 5 least complete',
      of: 'of',
    },
  },

  section: {
    specials: 'Specials',
    cocacola: 'Coca-Cola',
    group: 'Group',
    teamsInGroup: 'Teams in group',
  },

  filter: {
    all: 'All',
    owned: 'Have',
    missing: 'Missing',
  },

  search: {
    placeholder: 'Search country or code (e.g. MEX5)',
    noResults: 'No results',
    typeToSearch: 'Type a country name or sticker code.',
    teamsHeader: 'Teams',
    stickersHeader: 'Stickers',
  },

  settings: {
    title: 'Settings',
    language: 'Language',
    export: 'Export my album',
    exportHint: 'Share a .json file with your progress.',
    import: 'Import from file',
    importHint: 'Load a .json file from another device.',
    reset: 'Reset album',
    resetHint: 'Removes all marks. Cannot be undone.',
    about: 'About',
    version: 'Version',
    totalStickers: 'Stickers in album',
    developer: 'Developer',
  },

  importDialog: {
    title: 'Import progress',
    message: 'Do you want to replace your current progress or merge it with the imported data?',
    replace: 'Replace',
    merge: 'Merge',
    cancel: 'Cancel',
    successReplace: 'Progress replaced.',
    successMerge: 'Progress merged.',
    errorTitle: 'Could not import',
    invalidFile: 'The file is not valid.',
    versionTooNew: 'This file is from a newer version. Please update the app.',
  },

  resetDialog: {
    title: 'Reset album',
    message: 'Are you sure? All marked stickers will be removed.',
    confirm: 'Yes, reset',
    cancel: 'Cancel',
  },

  exportDialog: {
    errorTitle: 'Could not export',
    unavailable: 'Sharing is not available on this device.',
  },

  empty: {
    noOwned: 'You have not marked any stickers in this section yet.',
    noMissing: 'You completed this section! 🏆',
    noResults: 'No results.',
  },

  common: {
    loading: 'Loading…',
    percent: (v: number) => `${Math.round(v * 100)}%`,
    fraction: (owned: number, total: number) => `${owned}/${total}`,
    complete: 'complete',
  },
};
