import { motion } from "framer-motion";
import ClearDay from "../../assets/weather-icons-master/production/fill/all/clear-day.svg";
import RainyDay from "../../assets/weather-icons-master/production/fill/all/rain.svg";
import SnowyDay from "../../assets/weather-icons-master/production/fill/all/snow.svg";
import CloudyDay from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-day.svg";
import StormyDay from "../../assets/weather-icons-master/production/fill/all/thunderstorms-day-rain.svg";
import Wind from "../../assets/weather-icons-master/production/fill/all/wind.svg";
import Humid from "../../assets/weather-icons-master/production/fill/all/humidity.svg";
import ClearNight from "../../assets/weather-icons-master/production/fill/all/clear-night.svg";
import CloudyNight from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-night.svg";
import RainyNight from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-night-rain.svg";
import SnowyNight from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-night-snow.svg";
import StormyNight from "../../assets/weather-icons-master/production/fill/all/thunderstorms-night-rain.svg";
import "./hourlyForcast.scss";

const HourlyForcast = ({ info, sunrise, sunset }) => {
  const hour = new Date().getHours();

  return (
    <>
      <div className="hourly-container">
        {info.time.map((i, index) =>
          index < 24 + hour && index > hour - 1 ? (
            <motion.div
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              className="hourly-div"
              key={index}
            >
              <img
                className="icon"
                src={
                  info.weathercode[index] === 0
                    ? i.substring(11, 13) > sunrise &&
                      i.substring(11, 13) <= sunset
                      ? ClearDay
                      : ClearNight
                    : info.weathercode[index] >= 1 &&
                      info.weathercode[index] <= 3
                    ? i.substring(11, 13) > sunrise &&
                      i.substring(11, 13) <= sunset
                      ? CloudyDay
                      : CloudyNight
                    : info.weathercode[index] >= 61 &&
                      info.weathercode[index] <= 82
                    ? i.substring(11, 13) > sunrise &&
                      i.substring(11, 13) <= sunset
                      ? RainyDay
                      : RainyNight
                    : info.weathercode[index] >= 71 &&
                      info.weathercode[index] <= 77
                    ? i.substring(11, 13) > sunrise &&
                      i.substring(11, 13) <= sunset
                      ? SnowyDay
                      : SnowyNight
                    : i.substring(11, 13) > sunrise &&
                      i.substring(11, 13) <= sunset
                    ? StormyDay
                    : StormyNight
                }
                alt="icon"
              />
              <h2 className="temp">{info.apparent_temperature[index]} °F</h2>
              <div className="humid">
                <img src={Humid} alt="humidity" />
                <h3>{info.relativehumidity_2m[index]}</h3>
              </div>
              <div className="wind">
                <img src={Wind} alt="windspeed" />
                <h4>{info.windspeed_10m[index]} mph</h4>
              </div>
              <h5>
                {Number(i.substring(11, 13)) >= 12
                  ? `${i.substring(11, 13) % 12 || 12} PM`
                  : `${i.substring(11, 13) % 12 || 12} AM`}
              </h5>
            </motion.div>
          ) : null
        )}
      </div>
    </>
  );
};

export default HourlyForcast;
