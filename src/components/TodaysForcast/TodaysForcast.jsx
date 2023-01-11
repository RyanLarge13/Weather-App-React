import { useState, useEffect } from "react";
import weatherCodes from "../../weatherCodes";
import "./todaysForcast.scss";
import Axios from "axios";
import {
  TiWeatherSunny,
  TiWeatherWindyCloudy,
  TiWeatherCloudy,
} from "react-icons/ti";
import { RiSnowyLine, RiRainyLine } from "react-icons/ri";

const TodaysForcast = ({ info }) => {
  const [icon, setIcon] = useState(null);
  const [iconComponent, setIconComponent] = useState(<TiWeatherSunny />);
  const [stateCode, setStateCode] = useState(null);
  const [weatherName, setWeatherName] = useState("");
  const [windy, setWindy] = useState(false);
  const [location, setLocation] = useState(null);

  const APIkey = "e942f755a159eeb9a8cff56a595afac5";
  const limit = 1;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      Axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${APIkey}`
      )
        .then((res) =>
          setLocation(`${res.data[0].name}, ${res.data[0].state || null}`)
        )
        .catch((err) => console.log(err));
    });
    setStateCode(info.current_weather.weathercode);
    findIcon();
  }, [stateCode, icon]);

  const findIcon = () => {
    weatherCodes.map((code) => {
      code.codes.includes(stateCode) ? setState(code) : null;
    });
  };

  const setState = (code) => {
    setIcon(code.icon);
    setWeatherName(code.name);
    info.current_weather.windspeed > 10 ? setWindy(true) : setWindy(false);
    checkState();
  };

  const checkState = () => {
    if (windy) setIconComponent(<TiWeatherWindyCloudy />);
    if (icon === 0) setIconComponent(<TiWeatherSunny />);
    if (icon === 1) setIconComponent(<TiWeatherCloudy />);
    if (icon === 2) setIconComponent(<RiRainyLine />);
    if (icon === 3) setIconComponent(<RiSnowyLine />);
  };

  return (
    <section className={"todays-forcast"}>
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
        <h2 className="location">{location}</h2>
      </div>
    </section>
  );
};

export default TodaysForcast;
