# Md. Saiful Islam Ridoy — Professional Portfolio

A responsive, buildless portfolio for a growth and business development professional with an engineering background.

## Design

A cobalt hero, warm cream background, coral contact panel, and small yellow accents. Large editorial typography, an upright arched portrait, restrained 3D glass objects, an interactive skills list, a screenshot-led Hothat showcase, and a compact career section. Hero text enters in sequence, sections reveal on scroll, grouped items stagger, and buttons and project previews respond on hover. Visual motion can be paused and respects reduced-motion preferences. Keyboard focus reveals its section immediately.

## Content

Hothat is the single featured project. No university projects are displayed. Career results, roles, dates, education, training, and leadership are grounded in the supplied CV. The sales increase from 200K to 400K is described as a contribution to a company result without inferring a currency. Hothat’s landing-page interface was reviewed; end-to-end conversations have not been tested.

The full CV PDF is omitted from the public repository and deployment. “Request my CV” opens an email draft. Contact links do not send a message automatically.

## Editing

- `dist/index.html`: content, metadata, and project overview dialog.
- `dist/colors.css`: color tokens.
- `dist/styles.css`: responsive layouts, typography, glass objects, and print support.
- `dist/app.js`: navigation, motion control, project dialog, email copy, and Dhaka clock.
- `dist/assets/`: compressed user-provided portraits, Hothat screenshot and logo, local fonts, and favicon.

All rendering assets are local. No dependencies or paid APIs are required.

## Netlify

Live URL: https://saifulridoy.netlify.app/

`netlify.toml` publishes `dist/` and runs `node scripts/prepare-netlify.mjs` to configure canonical and sharing URLs for the assigned Netlify origin. The current live deployment uses Netlify Drop; GitHub changes do not automatically publish.

To create the equivalent self-contained HTML for Netlify Drop:

```sh
node scripts/bundle-static.mjs /absolute/output/index.html
```

The bundle embeds styles, scripts, images, fonts, and the font license. Its social sharing image points to the public GitHub portrait.

Earlier root-level portfolio files are preserved as legacy work and are not served by this Netlify configuration.

## Font license

Nimbus Sans is distributed under the GNU Affero General Public License version 3 with a font exception. See `dist/assets/FONT-LICENSE.txt`.
