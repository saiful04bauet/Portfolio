# Md. Saiful Islam Ridoy — Professional Portfolio

A responsive, buildless portfolio focused on growth, business development, and creative technical exploration.

## Design

The supplied Coolors palette of hot pink, magenta, violet, royal blue, and cyan over a light background, with frosted glass panels, layered 3D CSS objects, a portrait card, and pointer-responsive perspective. An explicit motion control and the system reduced-motion preference make the presentation comfortable to use. No WebGL dependency or external rendering service is required.

## Featured work

Hothat is the single featured project, with a direct live link, a project overview, and a genuine screenshot of its public homepage. Hothat's public landing page was reviewed on 27 October 2026 to describe its interface accurately; no end-to-end testing of conversations is claimed. No university projects are displayed.

Career results, roles, dates, education, training, and leadership are grounded in the supplied CV. The company sales increase from 200K to 400K is explicitly described as a contribution to a company result, with no currency inferred.

## Structure

- `dist/index.html`: portfolio content, semantic structure, metadata, and project overview dialog.
- `dist/styles.css`: responsive glass design, native CSS 3D objects, animation, reduced-motion and print support.
- `dist/colors.css`: colorful surfaces, glass materials, foreground contrast, and the light theme.
- `dist/app.js`: navigation, pointer perspective, motion controls, overview dialog, copy email, and Dhaka clock.
- `dist/assets/`: user-provided portraits, Hothat's public logo and homepage preview, local fonts, and favicon.

## Editing and hosting

Update text in `dist/index.html`, visuals in `dist/styles.css`, and behavior in `dist/app.js`. Portraits are compressed as WebP for faster loading. Serve `dist` on a static host. Netlify uses `netlify.toml` to publish the `dist` directory, with a small dependency-free build script that uses the Netlify site URL for canonical and sharing metadata.

The contact buttons use email and telephone links. No message is sent by this site. All rendering assets are local, and there are no runtime dependencies or paid API requirements.

## Font license

Nimbus Sans is distributed under the GNU Affero General Public License version 3 with a font exception. See `dist/assets/FONT-LICENSE.txt`.

## Repository notes

The current portfolio is in `dist/`. Earlier root-level portfolio files are retained as legacy work and are not served by this Netlify configuration.

The public repository and deployment omit the full CV PDF. The Request CV link opens an email draft; it does not send a message automatically.

## Published portfolio

https://md-saiful-islam-ridoy.netlify.app/

Palette: https://coolors.co/palette/f72585-b5179e-7209b7-560bad-480ca8-3a0ca3-3f37c9-4361ee-4895ef-4cc9f0
