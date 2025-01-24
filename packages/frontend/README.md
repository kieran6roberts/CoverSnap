# CvrSnap

CvrSnap empowers you to create great looking cover images for your blog posts in seconds, skipping the design hassle. It's completely free to download as many images as you like.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

More instructions to come.

## Adding a new background template

1. Add a new template to `BACKGROUND_TEMPLATES` in `app/features/editor/consts/templates.ts` following a similar pattern. Give it suitable name, feel free to be creative.
2. Define the necessary clip-path CSS variables in `app/features/editor/styles/TemplatePreview.module.css`.
3. Create the new class in `.backgroundTemplate-previewSection` within `app/features/editor/styles/TemplatePreview.module.css` based on the new template `previewStyles` property you added.
