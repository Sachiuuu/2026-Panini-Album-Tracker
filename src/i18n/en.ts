import { Strings } from './es';

export const en: Strings = {
  appName: 'WC 2026 Sticker Tracker',

  tabs: {
    album: 'Home',
    search: 'Search',
    settings: 'Settings',
    friends: 'Friends',
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
    motivationLines: [
      'Your album is empty. Start sticking!',
      'Great start! Keep it up.',
      'Past 10%. Keep going!',
      "Almost halfway there. Don't stop!",
      'Past the halfway mark. Almost there!',
      'So close! Just a few left.',
      'Album complete! You are a champion!',
    ],
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
    browseGroups: 'Browse by group',
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
    exportMissing: 'Export my missing stickers',
    exportMissingHint: 'Share a file with the stickers you still need.',
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

  friends: {
    title: 'Exchange',
    emptyTitle: 'No friends yet',
    emptyHint: "Import a friend's missing list to see which stickers you can give them.",
    importFriend: "Import a friend's list",
    youCanGive: 'You can give them',
    theyNeed: 'They still need',
    stickersCount: (n: number) => `${n} stickers`,
    canGiveCount: (n: number) => `You can give ${n}`,
    removeFriend: 'Remove',
    renameFriend: 'Rename',
  },

  friendImportDialog: {
    title: 'Name this friend',
    namePlaceholder: 'e.g. Juan',
    confirm: 'Save',
    cancel: 'Cancel',
    errorTitle: 'Could not import',
    invalidFile: 'The file is not valid or is not a missing stickers list.',
    versionTooNew: 'This file is from a newer version. Please update the app.',
    successMessage: (name: string) => `${name}'s list imported.`,
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

  teamNames: {
    MEX: 'Mexico',         RSA: 'South Africa',           KOR: 'South Korea',
    CZE: 'Czech Republic', CAN: 'Canada',                 BIH: 'Bosnia & Herzegovina',
    QAT: 'Qatar',          SUI: 'Switzerland',            BRA: 'Brazil',
    MAR: 'Morocco',        HAI: 'Haiti',                  SCO: 'Scotland',
    USA: 'United States',  PAR: 'Paraguay',               AUS: 'Australia',
    TUR: 'Turkey',         GER: 'Germany',                CUR: 'Curaçao',
    CIV: 'Ivory Coast',    ECU: 'Ecuador',                NED: 'Netherlands',
    JPN: 'Japan',          TUN: 'Tunisia',                SWE: 'Sweden',
    BEL: 'Belgium',        EGY: 'Egypt',                  IRN: 'Iran',
    NZL: 'New Zealand',    ESP: 'Spain',                  CPV: 'Cape Verde',
    KSA: 'Saudi Arabia',   URU: 'Uruguay',                FRA: 'France',
    SEN: 'Senegal',        IRQ: 'Iraq',                   NOR: 'Norway',
    ARG: 'Argentina',      ALG: 'Algeria',                AUT: 'Austria',
    JOR: 'Jordan',         POR: 'Portugal',               COD: 'DR Congo',
    UZB: 'Uzbekistan',     COL: 'Colombia',               ENG: 'England',
    CRO: 'Croatia',        GHA: 'Ghana',                  PAN: 'Panama',
  },
};
