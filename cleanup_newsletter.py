#!/usr/bin/env python3
"""
Remove Newsletter sections from all HTML files in the RP_INFOCARE website
"""
import pathlib
import re

def remove_newsletter():
    root = pathlib.Path('.')
    html_files = list(root.glob('*.html'))
    
    # Patterns to match newsletter sections
    patterns = [
        # Pattern 1: Newsletter section with heading and form
        (r'<section[^>]*id="newsletter"[^>]*>.*?</section>\s*', 'Newsletter section'),
        (r'<div[^>]*class="[^"]*newsletter[^"]*"[^>]*>.*?</div>\s*', 'Newsletter div'),
        
        # Pattern 2: Newsletter column in footer grid
        (r'<div[^>]*class="[^"]*newsletter-column[^"]*"[^>]*>.*?</div>\s*', 'Newsletter column'),
        
        # Pattern 3: Newsletter heading + form combo
        (r'<h\d[^>]*>\s*Newsletter\s*</h\d>.*?</form>\s*', 'Newsletter form section'),
        
        # Pattern 4: Subscribe for updates section
        (r'<div[^>]*>\s*<h\d[^>]*>\s*(?:Newsletter|Subscribe)[^<]*</h\d>.*?</(?:div|section)>\s*', 'Subscribe section'),
    ]
    
    changed_files = []
    
    for html_file in sorted(html_files):
        try:
            content = html_file.read_text(encoding='utf-8')
            original_size = len(content)
            
            for pattern, description in patterns:
                matches = re.findall(pattern, content, re.IGNORECASE | re.DOTALL)
                if matches:
                    content = re.sub(pattern, '', content, flags=re.IGNORECASE | re.DOTALL)
                    print(f"  Found and removed {len(matches)} {description} in {html_file.name}")
            
            if len(content) < original_size:
                html_file.write_text(content, encoding='utf-8')
                changed_files.append(html_file.name)
                print(f"✓ Updated {html_file.name} (removed {original_size - len(content)} chars)")
            
        except Exception as e:
            print(f"✗ Error processing {html_file.name}: {e}")
    
    print(f"\n=== Summary ===")
    print(f"Total files updated: {len(changed_files)}")
    print(f"Files: {', '.join(changed_files)}")

if __name__ == '__main__':
    remove_newsletter()
