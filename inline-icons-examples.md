# Inline Icons & Images Examples

You can now use both Lucide icons and actual images inline in your markdown content using the syntax `:icon-name:` or `:image-path:`

## Lucide Icons

Here are some commonly used Lucide icons you can use:

- `:heart:` - ❤️ (shows a heart icon)
- `:star:` - ⭐ (shows a star icon)
- `:check:` - ✅ (shows a check icon)
- `:x:` - ❌ (shows an X icon)
- `:alert-circle:` - ⚠️ (shows an alert icon)
- `:info:` - ℹ️ (shows an info icon)
- `:thumbs-up:` - 👍 (shows thumbs up)
- `:fire:` - 🔥 (shows fire icon)
- `:zap:` - ⚡ (shows lightning bolt)
- `:rocket:` - 🚀 (shows rocket icon)
- `:home:` - 🏠 (shows home icon)
- `:user:` - 👤 (shows user icon)
- `:mail:` - ✉️ (shows mail icon)
- `:phone:` - 📞 (shows phone icon)
- `:calendar:` - 📅 (shows calendar icon)
- `:clock:` - 🕐 (shows clock icon)
- `:folder:` - 📁 (shows folder icon)
- `:file:` - 📄 (shows file icon)
- `:camera:` - 📷 (shows camera icon)
- `:music:` - 🎵 (shows music icon)

## Actual Images

You can also use actual image files by providing the image path or URL:

**Local Images (relative to your app):**

- `:favicon.ico:` - Shows your favicon
- `:public/logo.png:` - Shows a logo from your public folder
- `:assets/icons/custom-icon.svg:` - Shows a custom SVG icon

**Remote Images (from URLs):**

- `:https://via.placeholder.com/16x16/ff0000/ffffff.png:` - Shows a red placeholder image
- `:https://github.com/favicon.ico:` - Shows GitHub's favicon
- `:https://example.com/images/emoji.png:` - Shows a custom emoji image

**Supported Image Formats:**

- PNG (`.png`)
- JPEG (`.jpg`, `.jpeg`)
- GIF (`.gif`)
- SVG (`.svg`)
- WebP (`.webp`)
- BMP (`.bmp`)
- ICO (`.ico`)

## Usage in Text

You can use both icons and images anywhere in your markdown text:

```markdown
This is a great idea :thumbs-up: and I'm excited :fire: to implement it!

Meeting scheduled for tomorrow :calendar: at 3 PM :clock:

Contact me :mail: or call :phone: if you have questions.

Important :alert-circle: Make sure to save your work :floppy-disk:

Check out our logo :favicon.ico: and visit :https://github.com/favicon.ico: GitHub!

Custom branding with :public/brand-icon.svg: our company icon.
```

## Available Icons

The icons use Lucide React icon names in kebab-case format. Some popular categories:

**Navigation:** `:arrow-right:`, `:arrow-left:`, `:arrow-up:`, `:arrow-down:`, `:chevron-right:`

**Actions:** `:plus:`, `:minus:`, `:edit:`, `:trash:`, `:save:`, `:download:`, `:upload:`

**Status:** `:check-circle:`, `:x-circle:`, `:alert-triangle:`, `:info:`, `:help-circle:`

**Communication:** `:message-circle:`, `:phone:`, `:mail:`, `:bell:`, `:megaphone:`

**Files & Folders:** `:file:`, `:folder:`, `:image:`, `:video:`, `:music:`, `:file-text:`

**Social:** `:heart:`, `:thumbs-up:`, `:thumbs-down:`, `:smile:`, `:frown:`

## Notes

**For Lucide Icons:**

- Icon names should be in kebab-case (lowercase with hyphens)
- If an icon name doesn't exist, the original text (e.g., `:invalid-icon:`) will be displayed
- All Lucide React icons are available - check the [Lucide React documentation](https://lucide.dev/) for the complete list

**For Images:**

- Supports both local file paths and remote URLs
- Must include a valid image file extension (`.png`, `.jpg`, `.gif`, etc.)
- If an image fails to load, the original text will be displayed instead
- Images work with relative paths (e.g., `:public/image.png:`) and absolute URLs

**General:**

- Both icons and images are sized to 16px by default and align with the text baseline
- Use the `:content:` syntax where content is either an icon name or image path
- The system automatically detects whether you're referencing an icon or image based on file extensions

## Testing

Try adding some of these examples to your notes to see both icons and images in action!
