import React from "react";

const TripDetails = ({ trip }) => {
  if (!trip) {
    return (
      <div className="trip-details">
        Выберите поездку для отображения подробностей.
      </div>
    );
  }

  return (
    <div className="trip-details">
      <h2>Подробности поездки</h2>
      <p>Город: {trip.city}</p>
      <p>Начало поездки: {trip.startDate}</p>
      <p>Конец поездки: {trip.endDate}</p>
    </div>
  );
};

export default TripDetails;
