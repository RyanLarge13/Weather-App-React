import { useEffect } from "react";
import {
  TiWeatherSunny,
  TiWeatherWindyCloudy,
  TiWeatherCloudy,
} from "react-icons/ti";
import { RiSnowyLine, RiRainyLine } from "react-icons/ri";
import "./dailyForcast.scss";

const DailyForcast = ({ info }) => {
  useEffect(() => {
    console.log(info);
  }, []);

  return (
    <section className="daily-container">
      <h2 className="title">Daily</h2>
      {info.time.map((i, index) => (
        <div key={index} className="day">
          <h5 className="icon">
            {info.weathercode[index] === 0 ? (
              <TiWeatherSunny />
            ) : info.weathercode[index] >= 1 && info.weathercode[index] <= 3 ? (
              <TiWeatherCloudy />
            ) : info.weathercode[index] >= 61 &&
              info.weathercode[index] <= 82 ? (
              <RiRainyLine />
            ) : info.weathercode[index] >= 71 &&
              info.weathercode[index] <= 77 ? (
              <RiSnowyLine />
            ) : (
              <TiWeatherWindyCloudy />
            )}
          </h5>
          <h2 className="time">{i}</h2>
          <div className="daily-info">
            <h3>Low: {info.temperature_2m_min[index]}</h3>
            <h3>High: {info.temperature_2m_max[index]}</h3>
            <h4>Sun Rise: {info.sunrise[index]}</h4>
            <h4>Sun Set: {info.sunset[index]}</h4>
          </div>
        </div>
      ))}
    </section>
  );
};

export default DailyForcast;
