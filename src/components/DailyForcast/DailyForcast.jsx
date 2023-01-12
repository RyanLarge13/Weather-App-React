import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ClearDay from "../../assets/weather-icons-master/production/fill/all/clear-day.svg";
import RainyDay from "../../assets/weather-icons-master/production/fill/all/rain.svg";
import SnowyDay from "../../assets/weather-icons-master/production/fill/all/snow.svg";
import CloudyDay from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-day.svg";
import StormyDay from "../../assets/weather-icons-master/production/fill/all/thunderstorms-day-rain.svg";
import SunSet from "../../assets/weather-icons-master/production/fill/all/moonrise.svg";
import SunRise from "../../assets/weather-icons-master/production/fill/all/sunrise.svg";
import High from "../../assets/weather-icons-master/production/fill/all/thermometer-warmer.svg";
import Low from "../../assets/weather-icons-master/production/fill/all/thermometer-colder.svg";
import "./dailyForcast.scss";

const DailyForcast = ({ info }) => {
  const [days, setDays] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ]);
  const today = new Date().getDay();

  useEffect(() => {
    const firstSet = days.slice(0, today);
    const secondSet = days.slice(today);
    const output = secondSet.concat(firstSet);
    setDays(output);
  }, []);

  return (
    <section className="daily-container">
      {info.time.map((i, index) => (
        <motion.div
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
          key={index}
          className="day"
        >
          <img
            className="icon"
            src={
              info.weathercode[index] === 0
                ? ClearDay
                : info.weathercode[index] >= 1 && info.weathercode[index] <= 3
                ? CloudyDay
                : info.weathercode[index] >= 61 && info.weathercode[index] <= 82
                ? RainyDay
                : info.weathercode[index] >= 71 && info.weathercode[index] <= 77
                ? SnowyDay
                : StormyDay
            }
            alt="icon"
          />
          <h2 className="time">{days[index]}</h2>
          <div className="daily-info">
            <div className="high-container">
              <img src={High} alt="high temp" className="high" />{" "}
              <h3>{info.temperature_2m_max[index]} °F</h3>
            </div>
            <div className="low-container">
              <img src={Low} alt="low temp" className="low" />
              <h3>{info.temperature_2m_min[index]} °F</h3>
            </div>
            <div className="sunrise-sunset">
              <h4>
                <img className="sunrise" src={SunRise} alt="sunrise" />
                {info.sunrise[index].substring(11)[0] === "0"
                  ? info.sunrise[index].substring(12)
                  : info.sunrise[index].substring(11)}{" "}
                AM
              </h4>
              <h4>
                <img className="sunset" src={SunSet} alt="sunset" />
                {info.sunset[index].substring(11, 13) % 12 || 12}:
                {info.sunset[index].substring(14)} PM
              </h4>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default DailyForcast;
