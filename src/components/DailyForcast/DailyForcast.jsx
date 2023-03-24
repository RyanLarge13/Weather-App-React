import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ClearDay from "../../assets/weather-icons-master/production/fill/all/clear-day.svg";
import RainyDay from "../../assets/weather-icons-master/production/fill/all/rain.svg";
import RainDrops from "../../assets/weather-icons-master/production/fill/all/raindrops.svg";
import SnowyDay from "../../assets/weather-icons-master/production/fill/all/snow.svg";
import CloudyDay from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-day.svg";
import StormyDay from "../../assets/weather-icons-master/production/fill/all/thunderstorms-day-rain.svg";
import SunSet from "../../assets/weather-icons-master/production/fill/all/moonrise.svg";
import SunRise from "../../assets/weather-icons-master/production/fill/all/sunrise.svg";
import High from "../../assets/weather-icons-master/production/fill/all/thermometer-warmer.svg";
import Low from "../../assets/weather-icons-master/production/fill/all/thermometer-colder.svg";
import UV from "../../assets/weather-icons-master/production/fill/all/uv-index.svg";
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
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          key={index}
          className="day"
        >
          <div className="icon-time">
            <img
              className="icon"
              src={
                info.weathercode[index] === 0
                  ? ClearDay
                  : info.weathercode[index] >= 1 && info.weathercode[index] <= 3
                  ? CloudyDay
                  : info.weathercode[index] >= 61 &&
                    info.weathercode[index] <= 82
                  ? RainyDay
                  : info.weathercode[index] >= 71 &&
                    info.weathercode[index] <= 77
                  ? SnowyDay
                  : StormyDay
              }
              alt="icon"
            />
            <h2 className="time">{index === 0 ? "Today" : days[index]}</h2>
          </div>
          <div className="daily-info">
            <div>
              <div className="high-container">
                <img src={High} alt="high temp" className="high" />{" "}
                <h3>{info.temperature_2m_max[index]} °F</h3>
              </div>
              <div className="low-container">
                <img src={Low} alt="low temp" className="low" />
                <h3>{info.temperature_2m_min[index]} °F</h3>
              </div>
            </div>
            <div className="sunrise-sunset">
              <div className="high-container">
                <img className="sunrise" src={SunRise} alt="sunrise" />
                <h4>
                  {info.sunrise[index].substring(11)[0] === "0"
                    ? info.sunrise[index].substring(12)
                    : info.sunrise[index].substring(11)}{" "}
                  AM
                </h4>
              </div>
              <div className="low-container">
                <img className="sunset" src={SunSet} alt="sunset" />
                <h4>
                  {info.sunset[index].substring(11, 13) % 12 || 12}:
                  {info.sunset[index].substring(14)} PM
                </h4>
              </div>
            </div>
          </div>
          <div className="precip-uv-container">
            <div className="precip-uv">
              <img src={RainDrops} alt="rain chance" />
              <p>{info.precipitation_probability_mean[index]}%</p>
            </div>
            <div className="precip-uv">
              <img src={UV} alt="uv index" />
              <p>{info.uv_index_max[index]}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default DailyForcast;
