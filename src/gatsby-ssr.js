let rawPerfume
try {
  rawPerfume = require('raw-loader!./node_modules/perfume.js/dist/perfume.umd.min.js')
} catch (err) {}
if (!rawPerfume) {
  try {
    rawPerfume = require('raw-loader!../perfume.js/dist/perfume.umd.min.js')
  } catch (err) {}
}

if (!rawPerfume) {
  throw new Error('Cannot find perfume.umd.min.js')
}

// import rawPerfume from 'raw-loader!./node_modules/perfume.js/dist/perfume.umd.min.js';
import React from 'react'
import { getGTMDataLayerName, getGTMEventName, isGTMEnabled } from './utils'

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  let analyticsTracker
  if (isGTMEnabled(pluginOptions)) {
    const layerName = getGTMDataLayerName(pluginOptions)
    analyticsTracker = `function analyticsTracker (options) {
      var metricName = options.metricName
      var data = options.data
      var eventProperties = options.eventProperties
      var navigatorInformation = options.navigatorInformation
      var params = {}

      // @see https://github.com/Zizzamia/perfume.js#quick-start
      switch (metricName) {
        case 'navigationTiming':
          if (data && data.timeToFirstByte) {
            params = { metricName: 'navigationTiming', data }
          }
          break
        case 'networkInformation':
          if (data && data.effectiveType) {
            params = { metricName: 'networkInformation', data }
          }
          break
        case 'storageEstimate':
          params = { metricName: 'storageEstimate', data }
          break
        case 'fp':
          params = { metricName: 'firstPaint', duration: data }
          break
        case 'fcp':
          params = { metricName: 'firstContentfulPaint', duration: data }
          break
        case 'fid':
          params = { metricName: 'firstInputDelay', duration: data }
          break
        case 'lcp':
          params = { metricName: 'largestContentfulPaint', duration: data }
          break
        case 'lcpFinal':
          params = { metricName: 'largestContentfulPaintFinal', duration: data }
          break
        case 'cls':
          params = { metricName: 'cumulativeLayoutShift', value: data }
          break
        case 'clsFinal':
          params = { metricName: 'cumulativeLayoutShiftFinal', value: data }
          break
        case 'tbt':
          params = { metricName: 'totalBlockingTime', duration: data }
          break
        case 'tbt5S':
          params = { metricName: 'totalBlockingTime5S', duration: data }
          break
        case 'tbt10S':
          params = { metricName: 'totalBlockingTime10S', duration: data }
          break
        case 'tbtFinal':
          params = { metricName: 'totalBlockingTimeFinal', duration: data }
          break
        default:
          params = { metricName: metricName, duration: data }
          break
      }
      params.event = "${getGTMEventName(pluginOptions)}"

      if(!window["${layerName}"]) {
        window["${layerName}"] = [];
      }

      window["${layerName}"].push(params);
    }`
  }

  const { plugins, googleTagManagerOptions, inline, ...perfumeOptions } = pluginOptions
  let perfumeProps = {
    // see https://github.com/gatsbyjs/gatsby/issues/6299
    key: 'gatsby-plugin-perfume-loader',
  }

  if (inline === false) {
    perfumeProps.src = 'https://unpkg.com/perfume.js/dist/perfume.umd.min.js'
  } else {
    perfumeProps.dangerouslySetInnerHTML = { __html: rawPerfume.default || rawPerfume }
  }

  setHeadComponents([
    React.createElement('script', perfumeProps),
    React.createElement('script', {
      // see https://github.com/gatsbyjs/gatsby/issues/6299
      key: 'gatsby-plugin-perfume-init',
      dangerouslySetInnerHTML: {
        __html: `
      (function initPerfume(){
        var perfumeConfiguration = ${JSON.stringify(perfumeOptions)};
        ${analyticsTracker ? 'perfumeConfiguration.analyticsTracker = ' + analyticsTracker : ''}
        new Perfume(perfumeConfiguration);
      })()
    `,
      },
    }),
  ])
}
