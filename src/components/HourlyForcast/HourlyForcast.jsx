import { motion } from "framer-motion";
import weatherCodes from "../../weatherCodes";
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
import FoggyDay from "../../assets/weather-icons-master/production/fill/all/fog-day.svg";
import FoggyNight from "../../assets/weather-icons-master/production/fill/all/fog-night.svg";
import Drizzle from "../../assets/weather-icons-master/production/fill/all/drizzle.svg";
import WindyDay from "../../assets/weather-icons-master/production/fill/all/wind.svg";
import "./hourlyForcast.scss";

const HourlyForcast = ({ info, sunrise, sunset, dayOrNight }) => {
  const hour = new Date().getHours();

  const calculateIcon = (weatherCode) => {
    const decidedIcon = weatherCodes.filter((code) =>
      code.codes.includes(weatherCode)
    );
    return decidedIcon[0].icon;
  };

  return (
    <>
      <div className="hourly-container">
        {info.time.map((i, index) =>
          index < 24 + hour && index > hour - 1 ? (
            <motion.div
              initial={{ y: 25 }}
              whileInView={{ y: 0 }}
              whileHover={{
                scale: 1.01,
                backgroundColor: dayOrNight ? "#fff" : "#000",
                zIndex: 999,
              }}
              className="hourly-div"
              key={index}
            >
              <img
                className="icon"
                src={
                  info.windspeed_10m[index] > 25
                    ? WindyDay
                    : calculateIcon(info.weathercode[index]) === 0
                    ? i.substring(11, 13) >= sunrise &&
                      i.substring(11, 13) < sunset
                      ? ClearDay
                      : ClearNight
                    : calculateIcon(info.weathercode[index]) === 1
                    ? i.substring(11, 13) >= sunrise &&
                      i.substring(11, 13) < sunset
                      ? CloudyDay
                      : CloudyNight
                    : calculateIcon(info.weathercode[index]) === 2
                    ? i.substring(11, 13) >= sunrise &&
                      i.substring(11, 13) < sunset
                      ? RainyDay
                      : RainyNight
                    : calculateIcon(info.weathercode[index]) === 3
                    ? i.substring(11, 13) >= sunrise &&
                      i.substring(11, 13) < sunset
                      ? SnowyDay
                      : SnowyNight
                    : calculateIcon(info.weathercode[index]) === 4
                    ? i.substring(11, 13) >= sunrise &&
                      i.substring(11, 13) < sunset
                      ? StormyDay
                      : StormyNight
                    : calculateIcon(info.weathercode[index]) === 5
                    ? i.substring(11, 13) >= sunrise &&
                      i.substring(11, 13) < sunset
                      ? FoggyDay
                      : FoggyNight
                    : calculateIcon(info.weathercode[index]) === 6 && Drizzle
                }
                alt="icon"
              />
              <h2 className="temp">{info.temperature_2m[index]} °F</h2>
              <p className="apparent">
                feels like {info.apparent_temperature[index]}
              </p>
              <div className="humid">
                <img src={Humid} alt="humidity" />
                <h3>{info.relativehumidity_2m[index]}%</h3>
              </div>
              <div className="wind">
                <img src={Wind} alt="windspeed" />
                <h4>{info.windspeed_10m[index]} mph</h4>
              </div>
              <h5>
                {index === new Date().getHours()
                  ? "Now"
                  : Number(i.substring(11, 13)) >= 12
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
