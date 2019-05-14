let rawPerfume;
try {
  rawPerfume = require('raw-loader!./node_modules/perfume.js/dist/perfume.umd.min.js');
} catch (err) {}
if(!rawPerfume) {
  try {
    rawPerfume = require('raw-loader!../perfume.js/dist/perfume.umd.min.js');
  } catch (err) {}
}

if(!rawPerfume) {
  throw new Error("Cannot fine perfume.umd.min.js");
}

// import rawPerfume from 'raw-loader!./node_modules/perfume.js/dist/perfume.umd.min.js';
import React from "react";
import { getGTMDataLayerName, getGTMEventName, isGTMEnabled } from "./utils";


export const onRenderBody = ({
  setHeadComponents,
}, pluginOptions) => {

  let analyticsTracker;
  if(isGTMEnabled(pluginOptions)) {
    const layerName = getGTMDataLayerName(pluginOptions);
    analyticsTracker = `function analyticsTracker (metricName, duration) {
      if(!window["${layerName}"]) {
        window["${layerName}"] = [];
      }
      window["${layerName}"].push({ 'event': "${getGTMEventName(pluginOptions)}", "metricName": metricName, "duration": duration });
    }`
  };

  const {plugins, googleTagManagerOptions, inline, ...perfumeOptions} = pluginOptions;
  let perfumeProps = {
    // see https://github.com/gatsbyjs/gatsby/issues/6299
    key: "gatsby-plugin-perfume-loader",
  };

  if(inline === false) {
    perfumeProps.src = "https://unpkg.com/perfume.js/dist/perfume.umd.min.js";
  } else {
    perfumeProps.dangerouslySetInnerHTML = {__html: rawPerfume.default || rawPerfume};
  }

  setHeadComponents([
    React.createElement('script', perfumeProps),
    React.createElement('script', {
      // see https://github.com/gatsbyjs/gatsby/issues/6299
      key:"gatsby-plugin-perfume-init",
      dangerouslySetInnerHTML: {__html: `
      (function initPerfume(){
        var perfumeConfiguration = ${JSON.stringify(perfumeOptions)};
        ${analyticsTracker ? "perfumeConfiguration.analyticsTracker = " + analyticsTracker : ''}
        new Perfume(perfumeConfiguration);
      })()
    `}})
  ]
    );

}
