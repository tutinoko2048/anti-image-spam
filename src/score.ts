import { RULES } from './rule';

export function scoreText(text: string) {
  let score = 0;
  const matched = new Set<typeof RULES[number]['type']>();

  for (const rule of RULES) {
    if (rule.patterns.some(p => p.test(text))) {
      score += rule.score;
      matched.add(rule.type);
    }
  }

  if (matched.has('celebrity') && matched.has('crypto')) score += 50;
  if (matched.has('celebrity') && matched.has('gambling')) score += 50;
  if (matched.has('celebrity') && matched.has('giveaway')) score += 50;

  return score;
}
