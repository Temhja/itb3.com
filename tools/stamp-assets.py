#!/usr/bin/env python3
"""Stamp every CSS/JS reference in the HTML pages with a content hash (?v=xxxxxxxx).

Browsers cache CSS and JS for a month (.htaccess). Without a version tag a returning
visitor gets the new HTML with the OLD stylesheet, and the layout breaks.
Run this from the repo root after any change to a .css or .js file, then commit:

    python3 tools/stamp-assets.py
"""
import glob, hashlib, os, re

def ver(path):
    return hashlib.md5(open(path, 'rb').read()).hexdigest()[:8]

count = 0
for f in glob.glob('**/*.html', recursive=True):
    text = open(f, encoding='utf8').read()
    folder = os.path.dirname(f)
    def rep(m):
        global count
        attr, url = m.group(1), m.group(2).split('?')[0]
        target = os.path.normpath(os.path.join(folder, url))
        if not os.path.exists(target):
            return m.group(0)
        count += 1
        return f'{attr}="{url}?v={ver(target)}"'
    new = re.sub(r'(href|src)="([^"]+\.(?:css|js)(?:\?v=[0-9a-f]+)?)"', rep, text)
    if new != text:
        open(f, 'w', encoding='utf8').write(new)
print(f'stamped {count} references')
