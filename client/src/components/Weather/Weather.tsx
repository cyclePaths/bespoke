import React from 'react';
import ForecastRow from './ForecastRow';
import Forecast from './Forecast';
import { RootPropsToWeather } from '../../Root';
import { Hourly } from '../../Root';
import { BandAid } from '../../StyledComp';

const Weather = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  sunriseHour,
  sunsetHour,
  hourlyForecasts,
  prepareWeatherIcon,
  setWindSpeedMeasurementUnit,
  setTemperatureMeasurementUnit,
  setPrecipitationMeasurementUnit,
  getForecasts,
}: RootPropsToWeather) => {
  //need to break up hourly forecasts into chunks of 4 forecasts each for the ForecastRow to map through

  let forecastRowArrays: Hourly[][] = [];
  let forecastArray: Hourly[] = [];

  hourlyForecasts.forEach((ele: Hourly, i: number) => {
    if ((i + 1) % 4 === 0) {
      forecastArray.push(ele);
      forecastRowArrays.push(forecastArray);
      forecastArray = new Array();
    } else {
      forecastArray.push(ele);
    }
  });
  forecastRowArrays.push(forecastArray);

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

  // return (
  //   <BandAid>
  //     {forecastRowArrays.map((weatherRow, i) => {
  //       return (
  //         <ForecastRow
  //           key={i}
  //           windSpeedMeasurementUnit={windSpeedMeasurementUnit}
  //           temperatureMeasurementUnit={temperatureMeasurementUnit}
  //           precipitationMeasurementUnit={precipitationMeasurementUnit}
  //           sunriseHour={sunriseHour}
  //           sunsetHour={sunsetHour}
  //           prepareWeatherIcon={prepareWeatherIcon}
  //           rowData={weatherRow}
  //         />
  //       );
  //     })}
  //   </BandAid>
  // );
};

export default Weather;
