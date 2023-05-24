import React, { useContext } from 'react';
import { Hourly, UserContext } from '../../Root';
import {
  WeatherIcon,
  WeatherIconFrame,
  ForecastBit,
  ForecastStatsBox,
  ForecastStatHolder,
  ForecastStatHolderWithBuffer,
  WeatherDescription,
  ForecastText,
  FeelsLikeText,
  ForecastTime,
  MainTemperature,
  MainTemperatureFrame,
  MainTemperatureText,
  AdjustedTemperature,
  AdjustedTemperatureText,
  AdjustedTemperatureHelperIcon,
  ForecastHelperIcon,
  UVIHelperIcon,
  WindspeedHelperIcon,
  ConditionalHelperIcon,
  BigTemperatureHelperIcon,
  ForecastEntry,
} from '../../StyledComp';
import { weatherIcons } from '../../../assets';

interface ForecastProps extends Hourly {
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
  sunriseHour: number;
  sunsetHour: number;
  prepareWeatherIcon: (
    weather: string,
    isDay: boolean,
    hour: number,
    chanceOfRain: number,
    rainfall: number,
    snowfall: number
  ) => string;
}

const Forecast = ({
  time,
  prepareWeatherIcon,
  temperature,
  previousTemperature,
  humidity,
  apparentTemperature,
  directRadiation,
  diffuseRadiation,
  cloudcover,
  windspeed,
  precipitation,
  snowfall,
  precipitationProbability,
  rain,
  showers,
  weatherDescription,
  snowDepth,
  visibility,
  isDay,
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  sunriseHour,
  sunsetHour,
}: ForecastProps) => {
  const { isDark } = useContext(UserContext);
  //setting measurement units for temperature/depth/precipitation amount to user selected ones
  let temperatureUnit: string = '';
  let speedUnit: string = windSpeedMeasurementUnit;
  let precipitationUnit: string = '';
  let depthUnit: string = '';
  if (temperatureMeasurementUnit === 'fahrenheit') {
    temperatureUnit = weatherIcons.misc.degreesFahrenheit;
  } else if (temperatureMeasurementUnit === 'celsius') {
    temperatureUnit = weatherIcons.misc.degreesCelsius;
  }
  if (precipitationMeasurementUnit === 'mm') {
    depthUnit = 'cm';
    precipitationUnit = 'mm';
  } else if (precipitationMeasurementUnit === 'inch') {
    depthUnit = 'ft';
    precipitationUnit = 'in';
  }

  //display the time as <hour>:00<AM or PM>
  let dateObj = new Date(time);
  const hour = dateObj.getHours();
  let displayTime = '';
  if (hour === 0) {
    displayTime = '12AM';
  } else if (hour === 12) {
    displayTime = '12PM';
  } else if (hour > 0 && hour < 12) {
    displayTime = hour.toString() + 'AM';
  } else if (hour > 12) {
    displayTime = (hour - 12).toString() + 'PM';
  }

  let weatherIcon = prepareWeatherIcon(
    weatherDescription,
    isDay,
    hour,
    precipitationProbability,
    rain,
    snowfall
  );

  let adjustedWindSpeed = windspeed;
  //if using kmh, convert to miles for the setWindSpeedIcon function, which is based on mph
  if (windSpeedMeasurementUnit === 'kmh') {
    adjustedWindSpeed *= 0.621371;
  }

  //sets conditional icon for sunrise, sunset, etc.
  const displayConditionalIcon = () => {
    //show a hurricane warning if hurricane force winds exist
    if (adjustedWindSpeed >= 74) {
      return (
        <ConditionalHelperIcon
          src={weatherIcons.generic.hurricane}
        ></ConditionalHelperIcon>
      );
    }
    //show sun/moon rise/set icon if hour is appropriate
    if (hour === sunriseHour) {
      return (
        <ConditionalHelperIcon
          src={weatherIcons.day.sunrise}
        ></ConditionalHelperIcon>
      );
    } else if (hour === sunsetHour) {
      return (
        <ConditionalHelperIcon
          src={weatherIcons.day.sunset}
        ></ConditionalHelperIcon>
      );
    } else if (hour === sunsetHour + 1) {
      return (
        <ConditionalHelperIcon
          src={weatherIcons.night.moonrise}
        ></ConditionalHelperIcon>
      );
    } else if (hour === sunriseHour - 1) {
      return (
        <ConditionalHelperIcon
          src={weatherIcons.night.moonset}
        ></ConditionalHelperIcon>
      );
    }
    //show temperature +/- if significant gain/loss of temperature since last hour
    if (previousTemperature !== 1000) {
      let brightness = 3;
      if (temperatureMeasurementUnit === 'fahrenheit') {
        if (apparentTemperature >= previousTemperature + 5) {
          return (
            <ConditionalHelperIcon
              bright={brightness}
              src={weatherIcons.misc.thermometer.warmer}
            ></ConditionalHelperIcon>
          );
        } else if (apparentTemperature <= previousTemperature - 5) {
          if (isDark) {
            brightness = 15;
          }
          return (
            <ConditionalHelperIcon
              bright={brightness}
              src={weatherIcons.misc.thermometer.colder}
            ></ConditionalHelperIcon>
          );
        }
      } else if (temperatureMeasurementUnit === 'celsius') {
        if (apparentTemperature >= previousTemperature + 2.75) {
          return (
            <ConditionalHelperIcon
              bright={brightness}
              src={weatherIcons.misc.thermometer.warmer}
            ></ConditionalHelperIcon>
          );
        } else if (apparentTemperature <= previousTemperature - 2.75) {
          if (isDark) {
            brightness = 15;
          }
          return (
            <ConditionalHelperIcon
              bright={brightness}
              src={weatherIcons.misc.thermometer.colder}
            ></ConditionalHelperIcon>
          );
        }
      }
    }
  };

  //sets the wind speed icon based on the Beaufort Wind Scale
  const setWindSpeedIcon = (windSpeed) => {
    if (windSpeed === 0) {
      return weatherIcons.generic.wind.ranked[0];
    } else if (windSpeed <= 3) {
      return weatherIcons.generic.wind.ranked[1];
    } else if (windSpeed > 3 && windSpeed <= 7) {
      return weatherIcons.generic.wind.ranked[2];
    } else if (windSpeed > 7 && windSpeed <= 12) {
      return weatherIcons.generic.wind.ranked[3];
    } else if (windSpeed > 12 && windSpeed <= 18) {
      return weatherIcons.generic.wind.ranked[4];
    } else if (windSpeed > 18 && windSpeed <= 24) {
      return weatherIcons.generic.wind.ranked[5];
    } else if (windSpeed > 24 && windSpeed <= 31) {
      return weatherIcons.generic.wind.ranked[6];
    } else if (windSpeed > 31 && windSpeed <= 38) {
      return weatherIcons.generic.wind.ranked[7];
    } else if (windSpeed > 38 && windSpeed <= 46) {
      return weatherIcons.generic.wind.ranked[8];
    } else if (windSpeed > 46 && windSpeed <= 54) {
      return weatherIcons.generic.wind.ranked[9];
    } else if (windSpeed > 54 && windSpeed <= 63) {
      return weatherIcons.generic.wind.ranked[10];
    } else if (windSpeed > 63 && windSpeed <= 73) {
      return weatherIcons.generic.wind.ranked[11];
    } else if (windSpeed > 73) {
      return weatherIcons.generic.wind.ranked[12];
    }
  };

  //set radiation icon based on UV Index
  const setRadiationIcon = (rad) => {
    const UVIndexFinder = Math.round(rad * 0.032);
    if (UVIndexFinder < 2) {
      return weatherIcons.misc.UV.ranked[1];
    } else if (UVIndexFinder >= 2 && UVIndexFinder < 3) {
      return weatherIcons.misc.UV.ranked[2];
    } else if (UVIndexFinder >= 3 && UVIndexFinder < 4) {
      return weatherIcons.misc.UV.ranked[3];
    } else if (UVIndexFinder >= 4 && UVIndexFinder < 5) {
      return weatherIcons.misc.UV.ranked[4];
    } else if (UVIndexFinder >= 5 && UVIndexFinder < 6) {
      return weatherIcons.misc.UV.ranked[5];
    } else if (UVIndexFinder >= 6 && UVIndexFinder < 7) {
      return weatherIcons.misc.UV.ranked[6];
    } else if (UVIndexFinder >= 7 && UVIndexFinder < 8) {
      return weatherIcons.misc.UV.ranked[7];
    } else if (UVIndexFinder >= 8 && UVIndexFinder < 9) {
      return weatherIcons.misc.UV.ranked[8];
    } else if (UVIndexFinder >= 9 && UVIndexFinder < 10) {
      return weatherIcons.misc.UV.ranked[9];
    } else if (UVIndexFinder >= 10 && UVIndexFinder < 11) {
      return weatherIcons.misc.UV.ranked[10];
    } else if (UVIndexFinder >= 11) {
      return weatherIcons.misc.UV.ranked[11];
    }
  };

  return (
    <ForecastEntry isDark={isDark}>
      <ForecastBit>
        <WeatherIconFrame isDark={isDark}>
          <WeatherIcon src={weatherIcon} />
        </WeatherIconFrame>
        <ForecastTime>{displayTime}</ForecastTime>
      </ForecastBit>
      <ForecastBit>
        <MainTemperatureFrame isDark={isDark}>
          <MainTemperature>
            <MainTemperatureText>
              <strong>{Math.round(temperature)}</strong>
            </MainTemperatureText>
            <BigTemperatureHelperIcon src={temperatureUnit} isDark={isDark} />
          </MainTemperature>
        </MainTemperatureFrame>
      </ForecastBit>
      <AdjustedTemperature>
        {displayConditionalIcon()}
        <AdjustedTemperature>
          <FeelsLikeText>Adj</FeelsLikeText>
          <AdjustedTemperatureText>
            <strong>{Math.round(apparentTemperature)}</strong>
          </AdjustedTemperatureText>
        </AdjustedTemperature>
        <AdjustedTemperatureHelperIcon src={temperatureUnit} isDark={isDark} />
      </AdjustedTemperature>
      <WeatherDescription>{weatherDescription}</WeatherDescription>
      <ForecastStatsBox isDark={isDark}>
        <ForecastBit>
          <ForecastText>Precipitation: </ForecastText>
          <ForecastStatHolder>{precipitationProbability}</ForecastStatHolder>
          <ForecastHelperIcon src={weatherIcons.misc.humidity} />
        </ForecastBit>
        <ForecastBit>
          <ForecastText>Humidity: </ForecastText>
          <ForecastStatHolder>{humidity}</ForecastStatHolder>
          <ForecastHelperIcon src={weatherIcons.misc.humidity} />
        </ForecastBit>
        <ForecastBit>
          <ForecastText>Wind ({windSpeedMeasurementUnit}): </ForecastText>
          <ForecastStatHolderWithBuffer>
            {adjustedWindSpeed}
          </ForecastStatHolderWithBuffer>
          <WindspeedHelperIcon src={setWindSpeedIcon(adjustedWindSpeed)} />
        </ForecastBit>
        <ForecastBit>
          <ForecastText>UVI: </ForecastText>
          <UVIHelperIcon src={setRadiationIcon(diffuseRadiation)} />
        </ForecastBit>
      </ForecastStatsBox>
    </ForecastEntry>
  );
};

export default Forecast;
