import {
  TiWeatherSunny,
  TiWeatherWindyCloudy,
  TiWeatherCloudy,
} from "react-icons/ti";
import { RiSnowyLine, RiRainyLine } from "react-icons/ri";
import "./hourlyForcast.scss";

const HourlyForcast = ({ info }) => {
  return (
    <>
      <h2 className="hourly-title">Hourly</h2>
      <div className="hourly-container">
        {info.time.map((i, index) =>
          index < 24 ? (
            <div className="hourly-div" key={index}>
              <div className="icon">
                {info.weathercode[index] === 0 ? (
                  <TiWeatherSunny />
                ) : info.weathercode[index] >= 1 &&
                  info.weathercode[index] <= 3 ? (
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
              </div>
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
