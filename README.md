# POSTECH AeroSpace Initiatives Website

This is the Jekyll-based website for POSTECH AeroSpace Initiatives (PSI), a research-focused aerospace student group at POSTECH in the Department of Mechanical Engineering.

## Local Development

To run this site locally, you'll need Ruby and Jekyll installed.

1. Navigate to the website directory:
   ```bash
   cd website
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Build and serve the site:
   ```bash
   bundle exec jekyll serve
   ```

3. Open your browser to `http://localhost:4000`

## GitHub Pages Deployment

This site is configured for GitHub Pages. To deploy:

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select the source branch (usually `main` or `gh-pages`)
4. The site will be available at `https://yourusername.github.io/repository-name`

Alternatively, GitHub Pages will automatically build and deploy when you push to the repository if GitHub Actions is enabled.

## Project Structure

All website files are contained in the `website/` directory:

- `_config.yml` - Jekyll configuration
- `_layouts/` - HTML layouts
- `_includes/` - Reusable components (header, footer, navigation)
- `assets/` - CSS, JavaScript, and other assets
- Root markdown files - Main pages (index.md, about.md, projects.md, etc.)

## Customization

- Edit `_config.yml` to update site metadata
- Modify pages in the root directory to update content
- Customize styling in `assets/css/main.scss`
- Update navigation in `_config.yml` under the `navigation` section
