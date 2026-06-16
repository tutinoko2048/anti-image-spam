export const SCORE_THRESHOLD = 200;

export const RULES = [
  {
    type: 'gambling',
    score: 50,
    patterns: [/\bcasino\b/, /\brakeback\b/, /\bjackpot\b/, /\bbet\b/],
  },
  {
    type: 'crypto',
    score: 40,
    patterns: [/\bcrypto\b/, /\bcryptocurrency\b/, /\btoken\b/],
  },
  {
    type: 'giveaway',
    score: 30,
    patterns: [/\bgiveaway\b/, /\bgiving away\b/, /\breward\b/, /\bbonus\b/, /\bpromo code\b/, /\bpromotion\b/],
  },
  {
    type: 'urgency',
    score: 30,
    patterns: [
      /\blimited time\b/,
      /\bonly today\b/,
      /\bdeleted\b/,
      /\bdon't miss\b/,
      /\bfastest\b/,
    ],
  },
  {
    type: 'withdrawal',
    score: 20,
    patterns: [/\bwithdraw\b/, /\bwithdrawal successful\b/],
  },
  {
    type: 'celebrity',
    score: 30,
    patterns: [
      /\bmrbeast\b/,
      /\b@mrbeast\b/,
      /\bbeast games\b/,
      /\bdonaldtrump\b/,
      /\bdonald j. trump\b/,
    ],
  },
  {
    type: 'domain',
    score: 190,
    patterns: [
      /\bnozawin.com\b/,
      /\b(kr)*gamb.com\b/,
    ]
  }
] as const satisfies Rule[];

interface Rule {
  type: string;
  score: number;
  patterns: RegExp[];
}
