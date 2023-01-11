import ClearDay from "../../assets/weather-icons-master/production/fill/all/clear-day.svg";
import RainyDay from "../../assets/weather-icons-master/production/fill/all/rain.svg";
import SnowyDay from "../../assets/weather-icons-master/production/fill/all/snow.svg";
import CloudyDay from "../../assets/weather-icons-master/production/fill/all/partly-cloudy-day.svg";
import StormyDay from "../../assets/weather-icons-master/production/fill/all/thunderstorms-day-rain.svg";
import "./hourlyForcast.scss";

const HourlyForcast = ({ info }) => {
  return (
    <>
      <h2 className="hourly-title">Hourly</h2>
      <div className="hourly-container">
        {info.time.map((i, index) =>
          index < 24 ? (
            <div className="hourly-div" key={index}>
              <img
                className="icon"
                src={
                  info.weathercode[index] === 0
                    ? ClearDay
                    : info.weathercode[index] >= 1 &&
                      info.weathercode[index] <= 3
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
              <h2 className="temp">{info.apparent_temperature[index]} F</h2>
              <h3>Humidity: {info.relativehumidity_2m[index]}</h3>
              <h4>Wind: {info.windspeed_10m[index]} mph</h4>
              <h5>
                {Number(i.substring(11, 13)) >= 12
                  ? `${i.substring(11, 13) % 12 || 12} PM`
                  : `${i.substring(11, 13) % 12 || 12} AM`}
              </h5>
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default HourlyForcast;
