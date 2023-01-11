import ClearDay from "../../assets/weather-icons-master/production/fill/all/clear-day.svg";
import RainyDay from "../../assets/weather-icons-master/production/fill/all/rain.svg";
import SnowyDay from "../../assets/weather-icons-master/production/fill/all/snow.svg";
import CloudyDay from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-day.svg";
import StormyDay from "../../assets/weather-icons-master/production/fill/all/thunderstorms-day-rain.svg";
import "./dailyForcast.scss";

const DailyForcast = ({ info }) => {
  return (
    <section className="daily-container">
      {info.time.map((i, index) => (
        <div key={index} className="day">
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
