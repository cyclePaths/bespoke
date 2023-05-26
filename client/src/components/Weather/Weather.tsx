import React, { useEffect, useRef } from 'react';
import Forecast from './Forecast';
import { RootPropsToWeather } from '../../Root';
import { Hourly } from '../../Root';
import { BandAid } from '../../StyledComp';

const Weather = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  currentTimeIndex,
  sunriseHour,
  sunsetHour,
  hourlyForecasts,
  prepareWeatherIcon,
  setWindSpeedMeasurementUnit,
  setTemperatureMeasurementUnit,
  setPrecipitationMeasurementUnit,
  getForecasts,
}: RootPropsToWeather) => {
  //each forecast element is ~202px tall
  useEffect(() => {
    const forecastHeight = 147;
    const scrollToPosition = currentTimeIndex * forecastHeight;
    window.scrollTo({ top: scrollToPosition, behavior: 'auto' });
  }, [currentTimeIndex]);

  return (
    <BandAid>
      {hourlyForecasts.map((forecast, i) => {
        return (
          <Forecast
            key={i}
            time={forecast.time}
            prepareWeatherIcon={prepareWeatherIcon}
            temperature={forecast.temperature}
            previousTemperature={forecast.previousTemperature}
            humidity={forecast.humidity}
            apparentTemperature={forecast.apparentTemperature}
            directRadiation={forecast.directRadiation}
            diffuseRadiation={forecast.diffuseRadiation}
            cloudcover={forecast.cloudcover}
            windspeed={forecast.windspeed}
            precipitation={forecast.precipitation}
            snowfall={forecast.snowfall}
            precipitationProbability={forecast.precipitationProbability}
            rain={forecast.rain}
            showers={forecast.showers}
            weatherDescription={forecast.weatherDescription}
            snowDepth={forecast.snowDepth}
            visibility={forecast.visibility}
            isDay={forecast.isDay}
            windSpeedMeasurementUnit={windSpeedMeasurementUnit}
            temperatureMeasurementUnit={temperatureMeasurementUnit}
            precipitationMeasurementUnit={precipitationMeasurementUnit}
            sunriseHour={sunriseHour}
            sunsetHour={sunsetHour}
          />
        );
      })}
    </BandAid>
  );
};

export default Weather;
