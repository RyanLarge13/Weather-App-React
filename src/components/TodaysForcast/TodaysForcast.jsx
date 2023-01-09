import { useState, useEffect } from "react";
import weatherCodes from "../../weatherCodes";
import "./todaysForcast.scss";
import {
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherWindyCloudy,
  TiWeatherCloudy,
} from "react-icons/ti";
import { RiSnowyLine, RiRainyLine } from "react-icons/ri";

const TodaysForcast = ({ info }) => {
  const [icon, setIcon] = useState(0);
  const [iconComponent, setIconComponent] = useState(null);
  const [stateCode, setStateCode] = useState(0);
  const [weatherName, setWeatherName] = useState("");
  const [windy, setWindy] = useState(false);

  useEffect(() => {
    determineIcon();
  }, []);

  const determineIcon = async () => {
    const code = await info.current_weather.weathercode;
    setStateCode(code);
    findIcon();
  };
  
  const findIcon = () => {
    weatherCodes.map((code) => {
      code.codes.includes(stateCode) ? setState(code) : null;
    });
  };
  
  const setState = (code) => {
    setIcon(code.icon);
    setWeatherName(code.name);
    info.current_weather.windspeed > 10 ? setWindy(true) : setWindy(false);
    if (windy) setIconComponent(TiWeatherWindyCloudy);
    if (icon === 0) setIconComponent(TiWeatherSunny);
    if (icon === 1) setIconComponent(TiWeatherCloudy);
    if (icon === 2) setIconComponent(RiRainyLine);
    if (icon === 3) setIconComponent(RiSnowyLine);
  };

  return (
    <section className="todays-forcast">
      <div className="icon">{iconComponent}</div>
      <h1>{weatherName}</h1>
      <h2>{`${info.current_weather.temperature} F`}</h2>
      <h2>{`${info.current_weather.windspeed} mph`}</h2>
      <div className="todays-date-container">
        <p className="week-day">
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
          })}
        </p>
        <p className="year-day">
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </section>
  );
};

export default TodaysForcast;
