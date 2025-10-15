# Dixieland Wireless LLC Intranet

This repository contains a static intranet homepage for Dixieland Wireless LLC. The site centralizes critical links, site access information, and provides an entry point for the Tech Install Portal that is surfaced on the public website.

## Features

- **Quick Access dashboard** with filterable cards for operations, customer management, vendor, and network tools.
- **Tech Install Portal hub** that highlights the external workflow application and includes shortcut links for intake tasks and resources.
- **Announcements timeline** to surface recent operational updates and maintenance notices.
- **Knowledge base browser** with search filtering for SOPs and field references.
- **Team directory** that lists core contacts for site access, installs, support, and emergencies.
- **Credential helper modal** to remind staff of access requirements for each portal.

## Getting started

1. Ensure you have a local web server capable of serving static files. For quick testing you can use Python:

   ```bash
   python3 -m http.server 8000
   ```

2. Open the site in your browser at [http://localhost:8000](http://localhost:8000) and navigate to `index.html`.

3. Update placeholder links (`href="#"`) with the real URLs and integrate authentication as needed for production deployment.

## Customization

- Modify `assets/js/app.js` to add, remove, or rename quick links, announcements, and knowledge base entries.
- Adjust the styles in `assets/css/styles.css` to match Dixieland Wireless branding guidelines or to integrate with an existing design system.
- Extend the modal in `index.html` if you want to display credentials or secure login instructions dynamically.

## Deployment

Because the site is static, it can be hosted from any internal web server or bundled with your existing intranet hosting solution. Sync the `/assets` directory along with `index.html` to your internal server and update DNS/VPN routing so employees can reach the intranet securely.

### Automated install and update scripts

Two helper scripts are provided to streamline installation and future updates:

```bash
# Install to /opt/dlw-intranet (default target)
scripts/install.sh

# Install to a custom path
scripts/install.sh /var/www/dlw-intranet

# Update an existing deployment (defaults to /opt/dlw-intranet)
scripts/update.sh
```

The install script copies the static assets to the target directory and creates a `config.env` template to store environment-specific URLs without editing the HTML directly. The update script syncs any repository changes into the deployment directory while preserving existing configuration files.
