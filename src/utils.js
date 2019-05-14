
export const isGTMEnabled = options => {
  if(!options || !options.googleTagManagerOptions) {
    return false;
  }
  return true;
};

export const getGTMDataLayerName = options => {
  if(!options || !options.googleTagManagerOptions || !options.googleTagManagerOptions.dataLayerName) {
    return "dataLayer";
  }
  return options.googleTagManagerOptions.dataLayerName;
};

export const getGTMEventName = options => {
  if(!options || !options.googleTagManagerOptions || !options.googleTagManagerOptions.eventName) {
    return "performance";
  }
  return options.googleTagManagerOptions.eventName;
};
