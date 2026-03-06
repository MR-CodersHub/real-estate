$pattern = '(?s)<div class="dropdown-menu" id="profileDropdown">\s*<a href="login\.html" class="dropdown-item"><i class="ph ph-sign-in"></i> Log In</a>\s*<a href="register\.html" class="dropdown-item"><i class="ph ph-user-plus"></i> Sign Up</a>\s*</div>'
$replacement = '<div class="dropdown-menu" id="profileDropdown">
                        <a href="login.html" class="dropdown-item"><i class="ph ph-sign-in"></i> Login / Sign Up</a>
                        <a href="admin-dashboard.html" class="dropdown-item"><i class="ph ph-gauge"></i> Admin Dashboard</a>
                        <a href="user-dashboard.html" class="dropdown-item"><i class="ph ph-user"></i> User Dashboard</a>
                    </div>'

Get-ChildItem -Path "c:/Users/dines/OneDrive/Desktop/real-estate-main" -Filter "*.html" | ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    if ($content -match $pattern) {
        $newContent = [regex]::Replace($content, $pattern, $replacement)
        [System.IO.File]::WriteAllText($_.FullName, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $($_.FullName)"
    }
}
