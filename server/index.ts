import {
  AppSettings,
  DESKTHING_EVENTS,
  SETTING_TYPES,
} from "@deskthing/types";
import { createDeskThing } from "@deskthing/server";

/**
 * If you don’t need custom client/server data yet,
 * you can safely use `any`
 */
const DeskThing = createDeskThing<any, any>();

/**
 * SETTINGS SETUP
 */
const setupSettings = async () => {
  const settings: AppSettings = {
    enabled: {
      id: "enabled",
      version: "1.0.0",
      label: "Enable App",
      description: "Turn the app on or off",
      type: SETTING_TYPES.BOOLEAN,
      value: true,
    },

    refresh_interval: {
      id: "refresh_interval",
      version: "1.0.0",
      label: "Refresh Interval (seconds)",
      description: "How often the app updates",
      type: SETTING_TYPES.NUMBER,
      min: 10,
      max: 3600,
      value: 60,
    },

    location: {
      id: "location",
      version: "1.0.0",
      label: "Location",
      description: "City or ZIP code",
      type: SETTING_TYPES.STRING,
      value: "New York",
    },

    units: {
      id: "units",
      version: "1.0.0",
      label: "Units",
      type: SETTING_TYPES.SELECT,
      value: "imperial",
      options: [
        { label: "Imperial (°F)", value: "imperial" },
        { label: "Metric (°C)", value: "metric" },
      ],
    },
  };

  await DeskThing.initSettings(settings);
};

/**
 * APP START
 */
const start = async () => {
  console.log("DeskThing app started");
  await setupSettings();
};

/**
 * APP STOP
 */
const stop = async () => {
  console.log("DeskThing app stopped");
};

/**
 * EVENT HOOKS
 */
DeskThing.on(DESKTHING_EVENTS.START, start);
DeskThing.on(DESKTHING_EVENTS.STOP, stop);
