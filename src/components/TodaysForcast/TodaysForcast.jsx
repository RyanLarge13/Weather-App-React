import { useState, useEffect } from "react";
import "./todaysForcast.scss";
import {
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherWindyCloudy,
  TiWeatherCloudy,
} from "react-icons/ti";
import { RiSnowyLine, RiRainyLine } from "react-icons/ri";

const TodaysForcast = ({ info }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const codeArray = [];
    const code = info.current_weather.weathercode;
    codeArray.push(code);
    determineIcon(codeArray);
    console.log(info.current_weather);
  }, []);

  const determineIcon = (codes) => {
    if (codes.includes(53)) setIcon("rain");
  };

  return (
    <section className="todays-forcast">
      {icon === "rain" ? <RiRainyLine /> : ""}
      <h1>{info.current_weather.temperature}</h1>
      <h2>{info.current_weather.windspeed}</h2>
      <h3>{info.current_weather.winddirection}</h3>
      <div className="date">
        <p>{new Date().getDay()}</p>
        <p>{new Date().getMonth()}</p>
        <p>{new Date().getDate()}</p>
        <p>{new Date().getFullYear()}</p>
      </div>
    </section>
  );
};

export default TodaysForcast;
