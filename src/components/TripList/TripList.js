import React, { useState } from "react";

const TripList = ({ trips, onSelectTrip, onDeleteTrip, onClearTrips }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTrips = trips.filter((trip) =>
    trip.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="trip-list">
      <h2>Поездки</h2>
      <input
        type="text"
        placeholder="Поиск по городу"
        value={searchQuery}
        onChange={handleSearch}
      />
      <button onClick={onClearTrips}>Удалить все поездки</button>
      <ul>
        {filteredTrips.map((trip, index) => (
          <li key={index} onClick={() => onSelectTrip(trip)}>
            {trip.city} - {trip.startDate} до {trip.endDate}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTrip(trip);
              }}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
