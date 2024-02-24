import React, { useState, useEffect } from "react";

const WeatherPanel = ({ selectedTrip }) => {
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [weatherForecastToday, setWeatherForecastToday] = useState([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      if (selectedTrip) {
        const apiKey = "RCQSG53F5KP27KGDYXZWL8DM9";
        const startDate = selectedTrip.startDate;
        const endDate = selectedTrip.endDate;
        const apiUrlDate = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedTrip.city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}`;

        try {
          const response = await fetch(apiUrlDate);
          const data = await response.json();
          setWeatherForecast(data.days);
        } catch (error) {
          console.error("Error fetching weather forecast:", error);
        }
      }
    };

    fetchWeatherForecast();
  }, [selectedTrip]);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      if (selectedTrip) {
        const apiKey = "RCQSG53F5KP27KGDYXZWL8DM9";

        const apiUrlToday = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedTrip.city}/today?unitGroup=metric&include=days&key=${apiKey}`;

        try {
          const response = await fetch(apiUrlToday);
          const data = await response.json();
          setWeatherForecastToday(data);
        } catch (error) {
          console.error("Error fetching weather forecast:", error);
        }
      }
    };

    fetchWeatherForecast();
  }, [selectedTrip]);

  const handlePrevDay = () => {
    setCurrentDayIndex(Math.max(currentDayIndex - 1, 0));
  };

  const handleNextDay = () => {
    setCurrentDayIndex(
      Math.min(currentDayIndex + 1, weatherForecast.length - 1)
    );
  };

  return (
    <div className="weather-panel">
      <h2>Прогноз погоды</h2>
      {selectedTrip && weatherForecast.length > 0 ? (
        <div>
          <h3>{selectedTrip.city}</h3>
          <div>
            <button onClick={handlePrevDay} disabled={currentDayIndex === 0}>
              Предыдущий день
            </button>
            <button
              onClick={handleNextDay}
              disabled={currentDayIndex === weatherForecast.length - 1}
            >
              Следующий день
            </button>
          </div>
          <ul>
            <li>
              <p>
                {weatherForecast[currentDayIndex].datetime} -{" "}
                {weatherForecast[currentDayIndex].conditions}
              </p>
              <p>Температура: {weatherForecast[currentDayIndex].temp}</p>
              <p>Ветер: {weatherForecast[currentDayIndex].windspeed}</p>
              <p>Влажность: {weatherForecast[currentDayIndex].humidity}%</p>
            </li>
          </ul>

          {weatherForecastToday.days.map((item) =>
            console.log(item.description)
          )}
        </div>
      ) : (
        <p>Прогноз погоды недоступен для выбранной поездки</p>
      )}
    </div>
  );
};

export default WeatherPanel;
