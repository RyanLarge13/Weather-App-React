import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import Thermometer from "../../assets/weather-icons-master/production/fill/all/thermometer.svg";
import Sunrise from "../../assets/weather-icons-master/production/fill/all/sunrise.svg";
import Rain from "../../assets/weather-icons-master/production/fill/all/raindrops.svg";
import Uv1 from "../../assets/weather-icons-master/production/fill/all/uv-index-1.svg";
import Uv2 from "../../assets/weather-icons-master/production/fill/all/uv-index-2.svg";
import Uv3 from "../../assets/weather-icons-master/production/fill/all/uv-index-3.svg";
import Uv4 from "../../assets/weather-icons-master/production/fill/all/uv-index-4.svg";
import Uv5 from "../../assets/weather-icons-master/production/fill/all/uv-index-5.svg";
import Uv6 from "../../assets/weather-icons-master/production/fill/all/uv-index-6.svg";
import Uv7 from "../../assets/weather-icons-master/production/fill/all/uv-index-7.svg";
import Uv8 from "../../assets/weather-icons-master/production/fill/all/uv-index-8.svg";
import Uv9 from "../../assets/weather-icons-master/production/fill/all/uv-index-9.svg";
import Uv10 from "../../assets/weather-icons-master/production/fill/all/uv-index-10.svg";
import Uv11 from "../../assets/weather-icons-master/production/fill/all/uv-index-11.svg";

const TargetedInfo = ({ details, precipitation, name, dayOrNight }) => {
  const [uvIndex, setUvIndex] = useState(0);
  const [photo, setPhoto] = useState(Uv1);

  useEffect(() => {
    setUvIndex(Math.floor(details.uv_index_max[0]));
  }, []);

  useEffect(() => {
    if (uvIndex === 1) setPhoto(Uv1);
    if (uvIndex === 2) setPhoto(Uv2);
    if (uvIndex === 3) setPhoto(Uv3);
    if (uvIndex === 4) setPhoto(Uv4);
    if (uvIndex === 5) setPhoto(Uv5);
    if (uvIndex === 6) setPhoto(Uv6);
    if (uvIndex === 7) setPhoto(Uv7);
    if (uvIndex === 8) setPhoto(Uv8);
    if (uvIndex === 9) setPhoto(Uv9);
    if (uvIndex === 10) setPhoto(Uv10);
    if (uvIndex === 11) setPhoto(Uv11);
  }, [uvIndex]);

  return (
    <>
      <Tooltip id="high-low" />
      <Tooltip id="sunrise-sunset" />
      <Tooltip id="chance-of-rain" />
      <Tooltip id="uv-index" />
      <section className="target-container">
        <div
          data-tooltip-id="high-low"
          data-tooltip-content="High and Low temperature"
          className="target-info"
        >
          <img src={Thermometer} alt="high low temp" />
          <p>
            {details.temperature_2m_max[0]} / {details.temperature_2m_min[0]}
          </p>
        </div>
        <div
          data-tooltip-id="sunrise-sunset"
          data-tooltip-content="Sunrise & Sunset"
          className="target-info"
        >
          <img src={Sunrise} alt="sunrise sunset" />
          <p>
            {details.sunrise[0].substring(11)[0] === "0"
              ? details.sunrise[0].substring(12)
              : details.sunrise[0].substring(11)}{" "}
            am / {details.sunset[0].substring(11, 13) % 12 || 12}:
            {details.sunset[0].substring(14)} pm
          </p>
        </div>
        <div
          data-tooltip-id="chance-of-rain"
          data-tooltip-content="Chance of Rain Today"
          className="target-info"
        >
          <img src={Rain} alt="chance of rain" />
          <p>{precipitation}%</p>
        </div>
        <div
          data-tooltip-id="uv-index"
          data-tooltip-content="UV Index"
          className="target-info"
        >
          <img src={photo} alt="uv index" />
          <p>{uvIndex}</p>
        </div>
      </section>
    </>
  );
};

export default TargetedInfo;
