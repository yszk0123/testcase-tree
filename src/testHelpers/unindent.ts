const EMPTY = /^\s*$/;

export function unindent(s: string): string {
  let lines = s.trimEnd().split('\n');
  if (lines.length <= 1) {
    return s.trim();
  }
  if (EMPTY.test(lines[0])) {
    lines = lines.slice(1);
  }

  const minIndent = lines
    .filter((v) => v.length > 0)
    .map((v) => getIndent(v))
    .reduce((acc, v) => Math.min(acc, v));
  return lines.map((v) => v.slice(minIndent)).join('\n');
}

function getIndent(s: string): number {
  for (let i = 0; i < s.length; i += 1) {
    if (s[i] !== ' ') {
      return i;
    }
  }
  return 0;
}
