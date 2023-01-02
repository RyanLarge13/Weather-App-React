import './todaysForcast.scss'

const TodaysForcast = ({ info }) => {
  return (
    <section className="todays-forcast">
      <h1>{info.current_weather.temperature}</h1>
    </section>
  );
};

export default TodaysForcast;
