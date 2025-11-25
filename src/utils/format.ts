export function formatMinutes(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}${m === 1 ? 'min' : 'mins'}`);
  if (!h && !m) parts.push('0min');
  return parts.join(' ');
}
