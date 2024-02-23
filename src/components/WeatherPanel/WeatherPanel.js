import React, { useState, useEffect } from "react";

const WeatherPanel = ({ selectedTrip }) => {
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      if (selectedTrip) {
        const apiKey = "RCQSG53F5KP27KGDYXZWL8DM9"; // Вставьте ваш API ключ
        const startDate = selectedTrip.startDate;
        const endDate = selectedTrip.endDate;
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedTrip.city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setWeatherForecast(data.days);
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
        </div>
      ) : (
        <p>Прогноз погоды недоступен для выбранной поездки</p>
      )}
    </div>
  );
};

export default WeatherPanel;
