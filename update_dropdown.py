import re
import glob

pattern = re.compile(
    r'<div class="dropdown-menu" id="profileDropdown">\s*<a href="login\.html" class="dropdown-item"><i class="ph ph-sign-in"></i> Log In</a>\s*<a href="register\.html" class="dropdown-item"><i class="ph ph-user-plus"></i> Sign Up</a>\s*</div>',
    re.DOTALL
)

replacement = """<div class="dropdown-menu" id="profileDropdown">
                        <a href="login.html" class="dropdown-item"><i class="ph ph-sign-in"></i> Login / Sign Up</a>
                        <a href="admin-dashboard.html" class="dropdown-item"><i class="ph ph-gauge"></i> Admin Dashboard</a>
                        <a href="user-dashboard.html" class="dropdown-item"><i class="ph ph-user"></i> User Dashboard</a>
                    </div>"""

for filepath in glob.glob('c:/Users/dines/OneDrive/Desktop/real-estate-main/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, count = pattern.subn(replacement, content)
    
    if count > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
