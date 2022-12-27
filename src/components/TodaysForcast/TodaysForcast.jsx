const TodaysForcast = ({ info }) => {
  return (
    <section>
      <h1>{info.current_weather.temperature}</h1>
    </section>
  );
};

export default TodaysForcast;
