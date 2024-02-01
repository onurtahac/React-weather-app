import "./App.css";
import Weather from "./WeatherResult";
import React, { useState } from "react";

function App() {
  //useState tanımladık
  const [Weatherdata, setWeatherdata] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [city, setCity] = useState(undefined);

  //Api keyimizi tanımladık bilgileri almak için
  const APP_KEY = "16b3108a80c2464595195425230208";

  //girilen şehrin verilerini almamıza ve siteye aktarmamıza yarayan kod
  async function getdata() {
    if (city === undefined || city === "") {
      setErrorMessage("Arama bölümü boş olamaz.");

      const timeout = setTimeout(() => {
        setErrorMessage("");
      }, 1000); //1 saniye sonra mesajı temizler

      return () => clearTimeout(timeout);
    }

     
    else {
      const data = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${city}&days=3&aqi=no&alerts=no`);
        
        
          
        
      const result = await data.json();
      setWeatherdata(result.forecast.forecastday);
      if (city !== undefined || city === result) {
        setErrorMessage("Arama bölümü boş olamaz.");
  
        const timeout = setTimeout(() => {
          setErrorMessage("");
        }, 1000); //1 saniye sonra mesajı temizler
  
        return () => clearTimeout(timeout);
      }

      console.log(result.forecast.forecastday);
    }
  }

  return (
    <div className="App">
      <div
        className="error-popup"
        style={{ display: errorMessage ? "flex" : "none" }}
      >
        {errorMessage}
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Şehir arayınız..."
          onBlur={(e) => {
            setCity(e.target.value);
          }}
        />
        <button onClick={getdata}>Ara</button>

        {Weatherdata.length > 0 && <div className="cityscreen">{city}</div>}
        
      </div>

      {Weatherdata.length > 0 && Weatherdata.map((item) => (
        <Weather
          key={item.date}
          date={item.date}
          mintemp={item.day.mintemp_c}
          maxtemp={item.day.mintemp_c}
          condition={item.day.condition.text}
          icon={item.day.condition.icon}
        />
      ))}
    </div>
  );
}
export default App;
