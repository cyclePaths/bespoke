import React from 'react';
import ForecastRow from './ForecastRow';
import { RootProps } from '../../Root';

const Weather = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  setWindSpeedMeasurementUnit,
  setTemperatureMeasurementUnit,
  setPrecipitationMeasurementUnit,
}: RootProps) => {
  return (
    <div>
      <ForecastRow
        windSpeedMeasurementUnit={windSpeedMeasurementUnit}
        temperatureMeasurementUnit={temperatureMeasurementUnit}
        precipitationMeasurementUnit={precipitationMeasurementUnit}
        setWindSpeedMeasurementUnit={setWindSpeedMeasurementUnit}
        setTemperatureMeasurementUnit={setTemperatureMeasurementUnit}
        setPrecipitationMeasurementUnit={setPrecipitationMeasurementUnit}
      ></ForecastRow>
    </div>
  );
};

export default Weather;
