import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryProfile = ({ data }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const geo = await data.map((country) =>
          Object.values(country.capitalInfo).length > 0
            ? country.capitalInfo.latlng
            : country.latlng
        );
        const url = "https://api.openweathermap.org/data/2.5/weather";
        console.log("geo", geo);
        axios
          .get(url, {
            params: {
              units: "metric",
              lat: geo[0][0],
              lon: geo[0][1],
              appid: process.env.REACT_APP_WEATHER_API_KEY,
            },
          })
          .then((response) => setWeatherData([response.data]))
          .catch((error) => {
            console.log(error);
            setIsError(true);
          });
      } catch (e) {
        console.log(e.message);
        setIsError(true);
      }
    })();
  }, [data]);

  console.log("weather", weatherData);
  return (
    <>
      {isError && <h1>No data found</h1>}
      {!isError &&
        data.map((country, i) => {
          const language = Object.keys(country).includes("languages");
          const currency = Object.keys(country).includes("currencies");
          const capital = Object.keys(country).includes("capital");
          return (
            <div key={i}>
              <h1 style={{ fontSize: "48pt" }}>
                {country.flag} {country.name.common} {country.flag}
              </h1>
              <div className='flex' style={{ transform: "translateY(-10px)" }}>
                <img src={country.flags.png} alt='' />
              </div>
              <div>
                <p>
                  <b>Population</b>:{" "}
                  {country.population.toLocaleString("en-AU")}
                </p>
                <p>
                  <b>
                    {language && Object.values(country.languages).length > 1
                      ? "Languages"
                      : "Language"}
                  </b>
                  :{" "}
                  {language
                    ? Object.values(country.languages).join(", ")
                    : "None"}
                </p>
                <p>
                  <b>
                    {currency && Object.values(country.currencies).length > 1
                      ? "Currencies"
                      : "Currency"}
                  </b>
                  :{" "}
                  {currency
                    ? Object.values(country.currencies).map(
                        (item, i, arr) =>
                          item.name
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ") + (i !== arr.length - 1 ? ", " : "")
                      )
                    : "None"}
                </p>
              </div>
              <br />
              <h1 style={{ marginBottom: 0 }}>Current Weather in</h1>
              <h1 style={{ margin: 0, fontWeight: 700, fontSize: "32pt" }}>
                {(capital ? country.capital : country.name.common)
                  .toString()
                  .toUpperCase()}
              </h1>
            </div>
          );
        })}
      {!isError && weatherData.length === 1 && (
        <div>
          <img
            style={{
              width: "300px",
              height: "auto",
              border: "none",
              transform: "translateY(-50px)",
            }}
            src={`http://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@4x.png`}
            alt=''
          />
          <p
            style={{
              fontSize: "40pt",
              fontWeight: 700,
              margin: 0,
              transform: "translateY(-120px)",
            }}
          >
            {Math.floor(weatherData[0].main.temp)}&deg;C
          </p>
          <h2 style={{ transform: "translateY(-125px)" }}>
            {weatherData[0].weather[0].main}
          </h2>
          <p style={{ transform: "translateY(-125px)" }}>
            {weatherData[0].weather[0].description}
          </p>
        </div>
      )}
    </>
  );
};

export default CountryProfile;
