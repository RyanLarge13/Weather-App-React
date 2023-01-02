import {useState, useEffect} from 'react';
import './todaysForcast.scss';
import { TiWeatherSunny, TiWeatherPartlySunny, TiWeatherWindyCloudy, TiWeatherCloudy } from 'react-icons/ti';
import { RiSnowyLine, RiRainyLine } from 'react-icons/ri';

const TodaysForcast = ({ info }) => {
  useEffect(() => {
    
  }, []);
  return (
    <section className="todays-forcast">
      <h1>{info.current_weather.temperature}</h1>
    </section>
  );
};

export default TodaysForcast;