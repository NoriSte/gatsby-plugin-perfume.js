# gatsby-plugin-perfume.js

<a href="http://www.perfumejs.com/">
  <img src="https://raw.githubusercontent.com/Zizzamia/perfume.js/master/docs/src/assets/perfume-logo-v2-1-2.png" align="left" width="100" />
</a>

Quickly add [Perfume.js (V5)](https://github.com/zizzamia/perfume.js) to track the performance metrics.

[![Build Status](https://travis-ci.com/NoriSte/gatsby-plugin-perfume.js.svg?branch=master)](https://travis-ci.com/NoriSte/gatsby-plugin-perfume.js)
[![Build Cron](https://img.shields.io/badge/build%20cron-weekly-44cc11.svg)](https://travis-ci.com/NoriSte/gatsby-plugin-perfume.js)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
<br />
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FNoriSte%2Fgatsby-plugin-perfume.js.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FNoriSte%2Fgatsby-plugin-perfume.js?ref=badge_shield)
[![Open Source
Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

<div style="clear:both" />
<br />

## Install

`npm install --save gatsby-plugin-perfume.js`

## What this plugin does

- it embeds [Perfume.js (V5)](https://github.com/Zizzamia/perfume.js) with all its [available options](https://github.com/Zizzamia/perfume.js#perfume-custom-options)
- it allows you to choose whether to embed Perfume.js (suggested) or loading it externally (from [Unpkg](https://unpkg.com))
- (optional) it integrates Perfume.hs with [Google Tag Manager](https://tagmanager.google.com) too

## How to use

### Basic usage

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: "gatsby-plugin-perfume.js",
  }
];
```

With custom options

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: "gatsby-plugin-perfume.js",
    options: {
      // the options are passed as-are to Perfume.js (except for `analyticsTracker`)
      resourceTiming: false
      maxMeasureTime: 15000,
      // see https://github.com/Zizzamia/perfume.js#perfume-custom-options for all the available options
    }
  }
];
```

### Usage with non-inlined Perfume.js

Perfume.js can also [be downloaded from
Unpkg](https://unpkg.com/perfume.js/dist/perfume.umd.min.js) setting the `inline` option to `false`

```javascript
// In your gatsby-config.js
{
  resolve: 'gatsby-plugin-perfume.js',
  options: {
    // optional, default to true
    inline: false,
  }
}
```

### Usage with Google Tag Manager

```javascript
{
  resolve: 'gatsby-plugin-perfume.js',
  options: {
    // optional, if present, a Google Tag Manager event is triggered for every specified performance metric (the event is `performance`)
    googleTagManagerOptions: true
  }
}
```

You can even customize the GTM event name/dataLayer

```javascript
{
  resolve: 'gatsby-plugin-perfume.js',
  options: {
    // optional, if present, a Google Tag Manager event is triggered for every specified performance metric
    googleTagManagerOptions: {
      // optional, default to `performance`, `metricName` and `duration` are passed as event data
      eventName: undefined,
      // optional, default to "dataLayer"
      dataLayerName: undefined
    }
  }
}
```

### How to track the events in GTM

- Add the `metricName` variable<br />
  ![Add the `metricName`
variable](https://raw.githubusercontent.com/NoriSte/gatsby-plugin-perfume.js/master/assets/gtm-perfume-var-1.png)
- Add the `duration` variable<br />
  ![Add the `duration` variable](https://raw.githubusercontent.com/NoriSte/gatsby-plugin-perfume.js/master/assets/gtm-perfume-var-2.png)
- Add the GA event in GTM<br />
  ![Add the GA event in GTM](https://raw.githubusercontent.com/NoriSte/gatsby-plugin-perfume.js/master/assets/gtm-perfume-ga-event.png)

## Contributing

PR or issues are welcome 👋

#### Notes

- if you want to work on the plugin sources, remember that you need to run `npm run build` on the root
  then, in every test project, you need to run `npm run plugin:link` to locally use it

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/NoriSte"><img src="https://avatars0.githubusercontent.com/u/173663?v=4" width="100px;" alt="Stefano Magni"/><br /><sub><b>Stefano Magni</b></sub></a><br /><a href="https://github.com/NoriSte/gatsby-plugin-perfume.js/commits?author=NoriSte" title="Code">💻</a> <a href="https://github.com/NoriSte/gatsby-plugin-perfume.js/commits?author=NoriSte" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
