# Creating a favicon with Icongenie

Icongenie converts logos and splashes used in browsers, desktop apps, Android apps, and ios apps easily and quickly for each device and situation.

Icongenie was created by the Quasar Team, and was originally a `Quasar App Extension`, but has been changed to its own CLI and can be used as its own CLI as well as the Quasar framework.
::: code-tabs#shell

@tab:active pnpm

```bash
pnpm install -g @quasar/icongenie
```

@tab yarn

```bash
yarn global add @quasar/icongenie
```

@tab npm

```bash
npm install -g @quasar/icongenie
```

:::

Install icongenie.

Please prepare an icon to use as a logo.

The minimum logo size required for icongenie icon conversion is `64x64` and the recommended size is `1024x1024`. Converting to a minimum size may result in poor quality images. The file extension must be `png`.

Let's convert it with icongenie. Open a terminal at the root of the project.

```sh

$ icongenie generate -i /path/to/icon.png

```

::: codes All commands

If you type icongenie generate -h in your terminal, you should see a command like this:

```sh
$ icongenie generate -h

  Description
    Generate App icons & splash screens

  Usage
    $ icongenie generate [options]

    # generate icons for all installed Quasar modes
    $ icongenie generate -i /path/to/icon.png
    $ icongenie g -i /path/to/icon.png

    # generate for (as example) PWA mode only
    $ icongenie generate -m pwa --icon /path/to/icon.png

    # generate for (as example) Cordova & Capacitor mode only
    $ icongenie g -m cordova,capacitor -i
         /path/to/icon.png -b /path/to/background.png

    # generate by using a profile file
    $ icongenie generate -p ./icongenie-profile.json

    # generate by using batch of profile files
    $ icongenie generate -p ./folder-containing-profile-files

  Options
    --icon, -i            Required;
                          Path to source file for icon; must be:
                            - a .png file
                            - min resolution: 64x64 px (the higher the better!!)
                            - with transparency
                          Best results are with a square image (height = width)
                          Image will be trimmed automatically
                            (also see "skip-trim" and "padding" param)
                          Path can be absolute, or relative to the root of the
                            Quasar project folder
                          Recommended min size: 1024x1024 px

    --background, -b      Path to optional background source file (for splash screens);
                          must be:
                            - a .png file
                            - min resolution: 128x128 px (the higher the better!!)
                            - transparency is optional (but recommended if you
                              combine with the splashscreen-color param)
                          Path can be absolute, or relative to the root of the
                            Quasar project folder
                          Recommended min size: 1024x1024 px

    --mode, -m            For which Quasar mode(s) to generate the assets;
                          Default: all
                            [all|spa|pwa|ssr|bex|cordova|capacitor|electron]
                          Multiple can be specified, separated by ",":
                            spa,cordova

    --filter, -f          Filter the available generators; when used, it can
                          generate only one type of asset instead of all
                            [png|ico|icns|splashscreen|svg]

    --quality             Quality of the files [1 - 12] (default: 5)
                            - higher quality --> bigger filesize & slower to create
                            - lower quality  --> smaller filesize & faster to create

    --skip-trim           Do not trim the icon source file

    --padding             Apply fixed padding to the icon after trimming it;
                          Syntax: <horiz: number>,<vert: number>
                          Default: 0,0
                          Example: "--padding 10,5" means apply 10px padding to top
                            10px to bottom, 5px to left side and 5px to rightside

    --theme-color         Theme color to use for all generators requiring a color;
                          It gets overridden if any generator color is also specified;
                          The color must be in hex format (NOT hexa) without the leading
                          '#' character. Transparency not allowed.
                          Examples: 1976D2, eee

    --svg-color           Color to use for the generated monochrome svgs
                          Default (if no theme-color is specified): 1976D2
                          The color must be in hex format (NOT hexa) without the leading
                          '#' character. Transparency not allowed.
                          Examples: 1976D2, eee

    --png-color           Background color to use for the png generator, when
                          "background: true" in the asset definition (like for
                          the cordova/capacitor iOS icons);
                          Default (if no theme-color is specified): fff
                          The color must be in hex format (NOT hexa) without the leading
                          '#' character. Transparency not allowed.
                          Examples: 1976D2, eee

    --splashscreen-color  Background color to use for the splashscreen generator;
                          Default (if no theme-color is specified): fff
                          The color must be in hex format (NOT hexa) without the leading
                          '#' character. Transparency not allowed.
                          Examples: 1976D2, eee

    --splashscreen-icon-ratio  Ratio of icon size in respect to the width or height
                               (whichever is smaller) of the resulting splashscreen;
                               Represents percentages; Valid values: 0 - 100
                               If 0 then it doesn't add the icon of top of background
                               Default: 40

    --profile, -p         Use JSON profile file(s):
                            - path to folder (absolute or relative to current folder)
                              that contains JSON profile files (icongenie-*.json)
                            - path to a single *.json profile file (absolute or relative
                              to current folder)
                          Structure of a JSON profile file:
                            {
                              "params": {
                                "include": [ ... ], /* optional */
                                ...
                              },
                              "assets": [ /* list of custom assets */ ]
                            }

    --help, -h            Displays this message
```

:::

Specify the path of the icon to be converted well.
If there is an icon in the public folder, enter the path as follows.
`./public/icon.png`

If the path is specified correctly, the icon will be generated and displayed as follows.

```
📦icons
┣ 📜apple-icon-120x120.png
┣ 📜apple-icon-152x152.png
┣ 📜apple-icon-167x167.png
┣ 📜apple-icon-180x180.png
┣ 📜apple-launch-1080x2340.png
┣ 📜apple-launch-1125x2436.png
┣ 📜apple-launch-1170x2532.png
┣ 📜apple-launch-1179x2556.png
┣ 📜apple-launch-1242x2208.png
┣ 📜apple-launch-1242x2688.png
┣ 📜apple-launch-1284x2778.png
┣ 📜apple-launch-1290x2796.png
┣ 📜apple-launch-1536x2048.png
┣ 📜apple-launch-1620x2160.png
┣ 📜apple-launch-1668x2224.png
┣ 📜apple-launch-1668x2388.png
┣ 📜apple-launch-2048x2732.png
┣ 📜apple-launch-750x1334.png
┣ 📜apple-launch-828x1792.png
┣ 📜favicon-128x128.png
┣ 📜favicon-16x16.png
┣ 📜favicon-32x32.png
┣ 📜favicon-96x96.png
┣ 📜favicon.ico
┣ 📜icon-128x128.png
┣ 📜icon-192x192.png
┣ 📜icon-256x256.png
┣ 📜icon-384x384.png
┣ 📜icon-512x512.png
┣ 📜ms-icon-144x144.png
┗ 📜safari-pinned-tab.svg
```

Now let's apply it to the html file.
Put that code inside the head tag.

```html
<link rel="icon" type="image/ico" href="icons/favicon.ico" />
<link
  rel="icon"
  type="image/png"
  sizes="128x128"
  href="icons/favicon-128x128.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="96x96"
  href="icons/favicon-96x96.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="icons/favicon-32x32.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="16x16"
  href="icons/favicon-16x16.png"
/>
<!-- iPhone XR -->
<link
  rel="apple-touch-startup-image"
  media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
  href="icons/apple-launch-828x1792.png"
/>
<!-- iPhone X, XS -->
<link
  rel="apple-touch-startup-image"
  media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
  href="icons/apple-launch-1125x2436.png"
/>
<!-- iPhone XS Max -->
<link
  rel="apple-touch-startup-image"
  media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
  href="icons/apple-launch-1242x2688.png"
/>
<!-- iPhone 8, 7, 6s, 6 -->
<link
  rel="apple-touch-startup-image"
  media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
  href="icons/apple-launch-750x1334.png"
/>
<!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus -->
<link
  rel="apple-touch-startup-image"
  media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
  href="icons/apple-launch-1242x2208.png"
/>
<!-- iPhone 5 -->
<link
  rel="apple-touch-startup-image"
  media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
  href="icons/apple-launch-640x1136.png"
/>
<!-- iPad Mini, Air, 9.7" -->
<link
  rel="apple-touch-startup-image"
  media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
  href="icons/apple-launch-1536x2048.png"
/>
<!-- iPad Pro 10.5" -->
<link
  rel="apple-touch-startup-image"
  media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
  href="icons/apple-launch-1668x2224.png"
/>
<!-- iPad Pro 11" -->
<link
  rel="apple-touch-startup-image"
  media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
  href="icons/apple-launch-1668x2388.png"
/>
<!-- iPad Pro 12.9" -->
<link
  rel="apple-touch-startup-image"
  media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
  href="icons/apple-launch-2048x2732.png"
/>
```

These images are now available in `PWA` mode.
I will write about `PWA` in another post.
