"""List English strings shown on the site and report which are missing from
src/i18n/ar.ts and src/i18n/hi.ts.

  python scripts/i18n-check.py           # summary of missing translations
  python scripts/i18n-check.py --list    # print every key as JSON (for translators)

It collects string literals from components, pages and data files, skipping
code-like values (class names, ids, URLs, SVG markup, file names).
"""
import glob
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

STR_RE = re.compile(r"""(?<![\w$])(['"])((?:\\.|(?!\1).)*?)\1""")
SKIP_LINE = re.compile(r"^\s*(import |export \{|//|\*)|className=|markup=|\bd=\"|viewBox|xmlns|preserveAspectRatio")
SKIP_VALUE = re.compile(
    r"^(#|\.|/|https?:|mailto:|tel:|wa\.me|data:|[a-z0-9-]+$|[a-z]+[A-Z]\w*$|[A-Z_]+$|[\w &-]+\.(jpg|png|svg|py|xml|json|tsx?|css)$|"
    r"[\d\s.%,:;+-]+$|use \w+|.*\b(px|em|vw|ms)\b.*\d|.*cubic-bezier|.*rgba?\()"
)
T_CALL_RE = re.compile(r"""\bt\(\s*(['"])((?:\\.|(?!\1).)*?)\1""")
KEY_NAMES = re.compile(r"\b(id|slug|image|file|url|href|lang|dir|code|iso|icon|label_?key|type|role|name=)\s*:\s*$")


def strings_in(path):
    text = open(path, encoding='utf-8').read()
    # Drop SVG/icon markup blocks and template literals with ${...}.
    text = re.sub(r"<svg[\s\S]*?</svg>", '', text)
    text = re.sub(r"\bicon:\s*'[^']*'", "icon: ''", text)
    # Every literal passed to t() is a key, whatever else is on the line.
    found = [m.group(2) for m in T_CALL_RE.finditer(text)]
    for line in text.split('\n'):
        if SKIP_LINE.search(line):
            continue
        for m in STR_RE.finditer(line):
            val = m.group(2).encode().decode('unicode_escape').encode('latin-1').decode('utf-8') if '\\' in m.group(2) else m.group(2)
            before = line[: m.start()]
            if KEY_NAMES.search(before):
                continue
            if not re.search(r"[A-Za-z]", val) or SKIP_VALUE.match(val):
                continue
            if '<' in val or '=>' in val or val.startswith(('M', 'm')) and re.match(r"^[Mm][\d .,-]", val):
                continue
            found.append(val)
    return found


def collect():
    files = [f for f in glob.glob('src/**/*.ts*', recursive=True)
             if '/i18n/' not in f.replace('\\', '/') and not f.endswith(('router.ts', 'vite-env.d.ts', 'appIcons.ts', 'useReveal.ts'))]
    keys = []
    for f in sorted(files):
        for s in strings_in(f):
            if s not in keys:
                keys.append(s)
    return keys


def dict_keys(path):
    text = open(path, encoding='utf-8').read()
    return set(json.loads('[' + ','.join(m.group(0) for m in re.finditer(r'"(?:\\.|[^"\\])*"(?=\s*:)', text)) + ']'))


if __name__ == '__main__':
    keys = collect()
    if '--list' in sys.argv:
        print(json.dumps(keys, ensure_ascii=False, indent=1))
        sys.exit(0)
    for lang in ('ar', 'hi'):
        have = dict_keys(f'src/i18n/{lang}.ts')
        missing = [k for k in keys if k not in have]
        print(f'{lang}: {len(keys) - len(missing)}/{len(keys)} translated, {len(missing)} missing')
        for k in missing[:15]:
            print('   -', k[:90])
