from mkdocs.plugins import BasePlugin
from mkdocs.config import config_options
import re

class SocialOverridePlugin(BasePlugin):
    config_scheme = (
        ('enabled', config_options.Type(bool, default=True)),
    )

    def on_page_context(self, context, page, config, nav):
        """Save custom image path from page metadata if it exists"""
        if page.meta.get('image'):
            page.custom_image = page.meta['image']
        return context

    def on_post_page(self, html, page, config, **kwargs):
        """Replace social plugin meta tags with our custom image"""
        if not hasattr(page, 'custom_image'):
            return html

        # Build the full URL for the custom image
        site_url = config['site_url'].rstrip('/')
        image_path = page.custom_image
        if not image_path.startswith(('http://', 'https://')):
            image_path = '/' + image_path.lstrip('/')
            full_image_url = site_url + image_path
        else:
            full_image_url = image_path

        # Replace OpenGraph image tags (handles various attribute orders and spacing)
        html = re.sub(
            r'<meta\s+property="og:image"\s+content="[^"]*assets/images/social/[^"]*"[^>]*>',
            f'<meta property="og:image" content="{full_image_url}">',
            html
        )

        # Replace Twitter image tags
        html = re.sub(
            r'<meta\s+name="twitter:image"\s+content="[^"]*assets/images/social/[^"]*"[^>]*>',
            f'<meta name="twitter:image" content="{full_image_url}">',
            html
        )

        return html
