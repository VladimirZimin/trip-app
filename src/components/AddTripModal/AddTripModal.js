import React, { useState } from "react";

const AddTripModal = ({ show, onClose, onAddTrip }) => {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddTrip = () => {
    // Проверяем, что все поля заполнены
    if (
      city.trim() === "" ||
      startDate.trim() === "" ||
      endDate.trim() === ""
    ) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    // Вызываем функцию onAddTrip для добавления новой поездки
    onAddTrip({ city, startDate, endDate });

    // Очищаем поля ввода
    setCity("");
    setStartDate("");
    setEndDate("");

    // Закрываем модальное окно
    onClose();
  };

  return (
    <div className="modal" style={{ display: show ? "block" : "none" }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Добавить новую поездку</h2>
        <label>Город:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label>Дата начала:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>Дата окончания:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleAddTrip}>Готово</button>
      </div>
    </div>
  );
};

export default AddTripModal;
