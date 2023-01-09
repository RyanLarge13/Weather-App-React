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
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
    if (windy) setIconComponent(TiWeatherWindyCloudy);
    if (icon === 0) setIconComponent(TiWeatherSunny);
    if (icon === 1) setIconComponent(TiWeatherCloudy);
    if (icon === 2) setIconComponent(RiRainyLine);
    if (icon === 3) setIconComponent(RiSnowyLine);
  };

  return (
    <section className={loading ? "todays-forcast.blur" : "todays-forcast"}>
      <div className="icon-and-date">
        <div className="icon">{iconComponent}</div>
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
      </div>
      <h1 className="weather-name">{weatherName}</h1>
      <div className="temp-windspeed">
        <h2>{`${info.current_weather.temperature} F`}</h2>
        <h2>{`${info.current_weather.windspeed} mph`}</h2>
      </div>
    </section>
  );
};

export default TodaysForcast;
