export const weatherCodes = {
  //these are what each of the weather codes mean; no codes should be missing even though there are gaps between numbers
  0: 'Clear Sky',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing Rime Fog',
  51: 'Light Drizzle',
  53: 'Moderate Drizzle',
  55: 'Dense Drizzle',
  56: 'Light Freezing Drizzle',
  57: 'Dense Freezing Drizzle',
  61: 'Light Rain',
  63: 'Moderate Rain',
  65: 'Heavy Rain',
  71: 'Light Snow',
  73: 'Moderate Snow',
  75: 'Heavy Snow',
  77: 'Snow Grains',
  80: 'Light Showers',
  81: 'Moderate Showers',
  82: 'Violent Showers',
  85: 'Light Snow Showers',
  86: 'Heavy Snow Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm With Light Hail',
  99: 'Thunderstorm with Heavy Hail',
};

export const weatherIcons = {
  day: {
    sunrise:
      'https://basmilius.github.io/weather-icons/production/fill/all/sunrise.svg',
    sunset:
      'https://basmilius.github.io/weather-icons/production/fill/all/sunset.svg',
    clear:
      'https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg',
    overcast:
      'https://basmilius.github.io/weather-icons/production/fill/all/overcast-day.svg',
    dust: 'https://basmilius.github.io/weather-icons/production/fill/all/dust-day.svg',
    fog: 'https://basmilius.github.io/weather-icons/production/fill/all/fog-day.svg',
    thunderstorm: {
      base: 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-day.svg',
      rain: 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-day-rain.svg',
      snow: 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-day-snow.svg',
    },
    cloudy: {
      partly: {
        base: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day.svg',
        drizzle:
          'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-drizzle.svg',
        hail: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-hail.svg',
        rain: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-rain.svg',
        sleet:
          'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-sleet.svg',
        snow: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-snow.svg',
        smoke:
          'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-smoke.svg',
        fog: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-fog.svg',
        haze: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-haze.svg',
      },
    },
  },
  night: {
    moonrise:
      'https://basmilius.github.io/weather-icons/production/fill/all/moonrise.svg',
    moonset:
      'https://basmilius.github.io/weather-icons/production/fill/all/moonset.svg',
    clear:
      'https://basmilius.github.io/weather-icons/production/fill/all/clear-night.svg',
    starry:
      'https://basmilius.github.io/weather-icons/production/fill/all/starry-night.svg',
    fallingStar:
      'https://basmilius.github.io/weather-icons/production/fill/all/falling-stars.svg',
    overcast:
      'https://basmilius.github.io/weather-icons/production/fill/all/overcast-night.svg',
    dust: 'https://basmilius.github.io/weather-icons/production/fill/all/dust-night.svg',
    fog: 'https://basmilius.github.io/weather-icons/production/fill/all/fog-night.svg',
    thunderstorm: {
      base: 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-night.svg',
      rain: 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-night-rain.svg',
      snow: 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-night-snow.svg',
    },
    cloudy: {
      partly: {
        base: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night.svg',
        drizzle:
          'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-drizzle.svg',
        hail: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-hail.svg',
        rain: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-rain.svg',
        sleet:
          'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-sleet.svg',
        snow: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-snow.svg',
        smoke:
          'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-smoke.svg',
        fog: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-fog.svg',
        haze: 'https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-haze.svg',
      },
    },
    moonPhase: {
      new: 'https://basmilius.github.io/weather-icons/production/fill/all/moon-new.svg',
      waxing: {
        crescent:
          'https://basmilius.github.io/weather-icons/production/fill/all/moon-waxing-crescent.svg',
        quarter:
          'https://basmilius.github.io/weather-icons/production/fill/all/moon-first-quarter.svg',
        gibbous:
          'https://basmilius.github.io/weather-icons/production/fill/all/moon-waxing-gibbous.svg',
      },
      full: 'https://basmilius.github.io/weather-icons/production/fill/all/moon-full.svg',
      waning: {
        gibbous:
          'https://basmilius.github.io/weather-icons/production/fill/all/moon-waning-gibbous.svg',
        quarter:
          'https://basmilius.github.io/weather-icons/production/fill/all/moon-last-quarter.svg',
        crescent:
          'https://basmilius.github.io/weather-icons/production/fill/all/moon-waning-crescent.svg',
      },
    },
  },
  generic: {
    cloudy:
      'https://basmilius.github.io/weather-icons/production/fill/all/cloudy.svg',
    overcast:
      'https://basmilius.github.io/weather-icons/production/fill/all/overcast.svg',
    mist: 'https://basmilius.github.io/weather-icons/production/fill/all/mist.svg',
    hurricane:
      'https://basmilius.github.io/weather-icons/production/fill/all/hurricane.svg',
    tornado:
      'https://basmilius.github.io/weather-icons/production/fill/all/tornado.svg',
    dust: 'https://basmilius.github.io/weather-icons/production/fill/all/dust.svg',
    fog: 'https://basmilius.github.io/weather-icons/production/fill/all/fog.svg',
    haze: 'https://basmilius.github.io/weather-icons/production/fill/all/haze.svg',
    solarEclipse:
      'https://basmilius.github.io/weather-icons/production/fill/all/solar-eclipse.svg',
    thunderstorm: {
      base: 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms.svg',
      rain: 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-rain.svg',
      snow: 'https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-snow.svg',
    },
    wind: {
      base: 'https://basmilius.github.io/weather-icons/production/fill/all/wind.svg',
      dust: 'https://basmilius.github.io/weather-icons/production/fill/all/dust-wind.svg',
      ranked: {
        0: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-0.svg',
        1: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-1.svg',
        2: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-2.svg',
        3: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-3.svg',
        4: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-4.svg',
        5: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-5.svg',
        6: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-6.svg',
        7: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-7.svg',
        8: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-8.svg',
        9: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-9.svg',
        10: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-10.svg',
        11: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-11.svg',
        12: 'https://basmilius.github.io/weather-icons/production/fill/all/wind-beaufort-12.svg',
      },
    },
  },
  misc: {
    compass:
      'https://basmilius.github.io/weather-icons/production/fill/all/compass.svg',
    windsock:
      'https://basmilius.github.io/weather-icons/production/fill/all/windsock.svg',
    humidity:
      'https://basmilius.github.io/weather-icons/production/fill/all/humidity.svg',
    umbrella:
      'https://basmilius.github.io/weather-icons/production/fill/all/umbrella.svg',
    lightningBolt:
      'https://basmilius.github.io/weather-icons/production/fill/all/lightning-bolt.svg',
    raindrop:
      'https://basmilius.github.io/weather-icons/production/fill/all/raindrop.svg',
    raindrops:
      'https://basmilius.github.io/weather-icons/production/fill/all/raindrops.svg',
    snowflake:
      'https://basmilius.github.io/weather-icons/production/fill/all/snowflake.svg',
    star: 'https://basmilius.github.io/weather-icons/production/fill/all/star.svg',
    smoke:
      'https://basmilius.github.io/weather-icons/production/fill/all/smoke-particles.svg',
    degreesCelsius:
      'https://basmilius.github.io/weather-icons/production/fill/all/celsius.svg',
    degreesFahrenheit:
      'https://basmilius.github.io/weather-icons/production/fill/all/fahrenheit.svg',

    thermometer: {
      base: {
        base: 'https://basmilius.github.io/weather-icons/production/fill/all/thermometer.svg',
        colder:
          'https://basmilius.github.io/weather-icons/production/fill/all/thermometer-colder.svg',
        warmer:
          'https://basmilius.github.io/weather-icons/production/fill/all/thermometer-warmer.svg',
        celsius:
          'https://basmilius.github.io/weather-icons/production/fill/all/thermometer-celsius.svg',
        fahrenheit:
          'https://basmilius.github.io/weather-icons/production/fill/all/thermometer-fahrenheit.svg',
        empty: {
          base: 'https://basmilius.github.io/weather-icons/production/fill/all/thermometer-glass.svg',
          celsius:
            'https://basmilius.github.io/weather-icons/production/fill/all/thermometer-glass-celsius.svg',
          fahrenheit:
            'https://basmilius.github.io/weather-icons/production/fill/all/thermometer-glass-fahrenheit.svg',
        },
        mercury: {
          red: 'https://basmilius.github.io/weather-icons/production/fill/all/thermometer-mercury.svg',
          blue: 'https://basmilius.github.io/weather-icons/production/fill/all/thermometer-mercury-cold.svg',
        },
      },
    },
    UV: {
      base: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index.svg',
      ranked: {
        1: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index-1.svg',
        2: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index-2.svg',
        3: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index-3.svg',
        4: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index-4.svg',
        5: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index-5.svg',
        6: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index-6.svg',
        7: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index-7.svg',
        8: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index-8.svg',
        9: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index-9.svg',
        10: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index-10.svg',
        11: 'https://basmilius.github.io/weather-icons/production/fill/all/uv-index-11.svg',
      },
    },
  },
};
