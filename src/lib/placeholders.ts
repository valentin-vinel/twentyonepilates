/**
 * Chemins des valeurs encore entre crochets « [ … ] » dans un objet de config,
 * pour le garde-fou de build (index.astro).
 */
export function placeholders(value: unknown, path = ''): string[] {
  if (typeof value === 'string') return /\[.*\]/s.test(value) ? [path] : [];
  if (Array.isArray(value)) return value.flatMap((item, i) => placeholders(item, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      placeholders(item, path ? `${path}.${key}` : key),
    );
  }
  return [];
}
