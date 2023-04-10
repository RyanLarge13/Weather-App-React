import { useState, useEffect } from "react";
import { CircleLoader } from "react-spinners";
import Axios from "axios";
import TodaysForcast from "./components/TodaysForcast/TodaysForcast";
import HourlyForcast from "./components/HourlyForcast/HourlyForcast";
import DailyForcast from "./components/DailyForcast/DailyForcast";
import News from "./components/News/News";
import militaryTimeArray from "./militaryTime";
import "./main.scss";
import "react-tooltip/dist/react-tooltip.css";

const App = () => {
  const [info, setInfo] = useState(null);
  const [hourlyInfo, setHourlyInfo] = useState(null);
  const [dailyInfo, setDailyInfo] = useState(null);
  const [dayOrNight, setDayOrNight] = useState(true);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const hour = new Date().getHours();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      getInfo(long, lat);
    });
  }, []);

  const getInfo = (long, lat) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    Axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m,winddirection_10m,windgusts_10m,temperature_80m&daily=uv_index_max,weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_mean&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=${timeZone}`
    )
      .then((res) => {
        setInfo(res.data);
        setHourlyInfo(res.data.hourly);
        setDailyInfo(res.data.daily);
        const sunrise = res.data.daily.sunrise[0].substring(11, 13);
        const sunset = res.data.daily.sunset[0].substring(11, 13);
        setSunrise(sunrise);
        setSunset(sunset);
        checkDayNight(sunrise, sunset);
      })
      .catch((err) => setInfo(err));
  };

  const checkDayNight = (rise, set) => {
    const day = militaryTimeArray.slice(rise, set);
    day.includes(hour.toString()) ? setDayOrNight(true) : setDayOrNight(false);
  };

  return (
    <section className={dayOrNight ? "day-background" : "night-background"}>
      <div className="bg-img"></div>
      {info ? (
        <section className="main-sec">
          <div className="flex-container">
            <TodaysForcast info={info} dayOrNight={dayOrNight} />
            <News dayOrNight={dayOrNight} />
          </div>
          <div className="flex-container-2">
            <HourlyForcast
              info={hourlyInfo}
              sunrise={sunrise}
              sunset={sunset}
              dayOrNight={dayOrNight}
            />
            <DailyForcast info={dailyInfo} dayOrNight={dayOrNight} />
          </div>
        </section>
      ) : (
        <section className="loading">
          <CircleLoader size={200} />
        </section>
      )}
    </section>
  );
};

export default App;
