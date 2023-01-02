import { useState, useEffect } from "react";
import Axios from "axios";
import TodaysForcast from "./components/TodaysForcast/TodaysForcast";

const App = () => {
  const [info, setInfo] = useState(null);

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
      })
      .catch((err) => setInfo(err));
  };

  return <section>{info ? <TodaysForcast info={info} /> : ""}</section>;
};

export default App;
