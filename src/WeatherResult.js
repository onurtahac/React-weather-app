import "./Weather.css";

function WeatherResult({ value, date, mintemp, condition, icon }) {
  return (
    <div className="result">
      <br />
      <h2 className="h2">{date}</h2>
      <ul>
        <li>
          <img src={icon} alt="" />
        </li>
        <li>{condition}</li>
        <li>{mintemp} C </li>
      </ul>
    </div>
  );
}
export default WeatherResult;
