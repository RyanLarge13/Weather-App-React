import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ImLocation } from "react-icons/im";
import weatherCodes from "../../weatherCodes";
import "./todaysForcast.scss";
import Axios from "axios";
import ClearDay from "../../assets/weather-icons-master/production/fill/all/clear-day.svg";
import RainyDay from "../../assets/weather-icons-master/production/fill/all/rain.svg";
import SnowyDay from "../../assets/weather-icons-master/production/fill/all/snow.svg";
import CloudyDay from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-day.svg";
import StormyDay from "../../assets/weather-icons-master/production/fill/all/thunderstorms-day-rain.svg";
import WindyDay from "../../assets/weather-icons-master/production/fill/all/wind.svg";
import ClearNight from "../../assets/weather-icons-master/production/fill/all/clear-night.svg";
import CloudyNight from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-night.svg";
import RainyNight from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-night-rain.svg";
import SnowyNight from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-night-snow.svg";
import StormyNight from "../../assets/weather-icons-master/production/fill/all/thunderstorms-night-rain.svg";
import TargetedInfo from "./TargetedInfo";

const TodaysForcast = ({ info, dayOrNight }) => {
  const [icon, setIcon] = useState(null);
  const [iconComponent, setIconComponent] = useState(ClearDay);
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
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${APIkey}`
      )
        .then((res) =>
          setLocation(`${res.data[0].name}, ${res.data[0].state || null}`)
        )
        .catch((err) => console.log(err));
    });
    setStateCode(info.current_weather.weathercode);
    findIcon();
  }, [stateCode, icon]);

  useEffect(() => {
    Notification.requestPermission().then((res) => {
      let interval;
      let hours = new Date().getHours();
      const amPmHour = hours % 12 || 12;
      const formattedHour = amPmHour.toString();
      if (Notification.permission === "granted") {
        const notif = new Notification(
          `${location} ${
            hours >= 12 ? formattedHour + " pm" : formattedHour + " am"
          }`,
          {
            body: `${info.current_weather.temperature} F`,
            tag: `${info.current_weather.temperature}`,
            icon: icon,
            image: icon,
          }
        );
        interval = setInterval(() => {
          const notif = new Notification(
            `${location} ${new Date().getDate.toLocaleDateString()}`,
            {
              body: `${info.current_weather.temperature}`,
              tag: `${info.current_weather.temperature}`,
              icon,
              image: icon,
            }
          );
          notif.addEventListener("click", (e) => {
            e.preventDefault();
            window.open("https://weather-app-react-lac.vercel.app/");
          });
        }, 3600000);
        notif.addEventListener("click", (e) => {
          e.preventDefault();
          window.open("https://weather-app-react-lac.vercel.app/");
        });
      } else {
        clearInterval(interval);
      }
    });
  }, [location]);

  const findIcon = () => {
    weatherCodes.map((code) => {
      code.codes.includes(stateCode) ? setState(code) : null;
    });
  };

  const setState = (code) => {
    setIcon(code.icon);
    setWeatherName(code.name);
    info.current_weather.windspeed > 25 ? setWindy(true) : setWindy(false);
  };

  useEffect(() => {
    if (icon === 0) setIconComponent(dayOrNight ? ClearDay : ClearNight);
    if (icon === 1) setIconComponent(dayOrNight ? CloudyDay : CloudyNight);
    if (icon === 2) setIconComponent(dayOrNight ? RainyDay : RainyNight);
    if (icon === 3) setIconComponent(dayOrNight ? SnowyDay : SnowyNight);
    if (icon === 4) setIconComponent(dayOrNight ? StormyDay : StormyNight);
    if (windy) setIconComponent(WindyDay);
  }, [windy, icon]);

  return (
    <section className="todays-forcast">
      <div className="img-week">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.75, type: "spring", stiffness: 500 }}
          className="icon"
          src={iconComponent}
        />
        <div className="date">
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
      <div className="dates-location">
        <div className="info-body">
          <h1 className="weather-name">{weatherName}</h1>
          <div className="temp-windspeed">
            <h2>{`${info.current_weather.temperature} °F`}</h2>
            <div className="wind-container">
              <h2>{`${info.current_weather.windspeed} mph`}</h2>
              <img src={WindyDay} alt="wind" className="wind" />
            </div>
          </div>
        </div>
        <div className="location-container">
          <ImLocation className="location-icon" />
          {location ? (
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="location"
            >
              {location}
            </motion.h2>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </div>
      <TargetedInfo />
    </section>
  );
};

export default TodaysForcast;
