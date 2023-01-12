import { useState, useEffect } from "react";
import Axios from "axios";
import TodaysForcast from "./components/TodaysForcast/TodaysForcast";
import HourlyForcast from "./components/HourlyForcast/HourlyForcast";
import DailyForcast from "./components/DailyForcast/DailyForcast";
import "./main.scss";

const App = () => {
  const [info, setInfo] = useState(null);
  const [hourlyInfo, setHourlyInfo] = useState(null);
  const [dailyInfo, setDailyInfo] = useState(null);
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
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m,winddirection_10m,windgusts_10m,temperature_80m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=${timeZone}`
    )
      .then((res) => {
        setInfo(res.data);
        setHourlyInfo(res.data.hourly);
        setDailyInfo(res.data.daily);
      })
      .catch((err) => setInfo(err));
  };

  return (
    <section
      className={hour > 15 && hour < 7 ? "night-background" : "day-background"}
    >
      {info ? (
        <section className="main-sec">
          <TodaysForcast info={info} />
          <HourlyForcast info={hourlyInfo} />
          <DailyForcast info={dailyInfo} />
        </section>
      ) : <section className="loading" ></section>
      }
    </section>
  );
};

export default App;
