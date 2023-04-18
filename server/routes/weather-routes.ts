import express from 'express';

export const WeatherRoute = express.Router();

WeatherRoute.get(
  '/forecasts/:lat/:long/:numDays/:tempUnit/:windspeedUnit/:precipUnit'
);
