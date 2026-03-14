---
description: How to build and prepare AD Foods for Ionos deployment
---

# Deploy to Ionos Workflow

Follow these steps to generate the production build and handle routing.

1. Build the production files:
// turbo
```powershell
npm run build
```

2. Create the .htaccess file for Client-Side Routing:
// turbo
```powershell
Set-Content -Path "dist\.htaccess" -Value '<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>'
```

3. Verification:
Check that the `dist` folder exists and contains `index.html` and the `.htaccess` file.

4. Manual Step:
Upload the contents of the `dist` folder to your Ionos file manager.
