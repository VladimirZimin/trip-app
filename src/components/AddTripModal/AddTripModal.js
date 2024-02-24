import React, { useState } from "react";
import { createPortal } from "react-dom";

import style from "./AddTripModal.module.css";
import Modal from "components/Modal/Modal";

const modalRoot = document.querySelector("#modal-root");

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

  return createPortal(
    <Modal show={show}>
      <div className={style.modalHeader}>
        <h2>Create trip</h2>
        <button
          className={style.close}
          type="button"
          onClick={onClose}
        ></button>
      </div>

      <div className={style.modalBody}>
        <label htmlFor="select">City</label>
        <select
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="select"
        >
          <option disabled={true} value="">
            Please select a city
          </option>
          <option value="London">London</option>
          <option value="Berlin">Berlin</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Rome">Rome</option>
          <option value="Warsaw">Warsaw</option>
          <option value="Budapest">Budapest</option>
        </select>

        <label>Start date </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Select date"
        />

        <label>End date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Select date"
        />
      </div>

      <div className={style.modalFooter}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="button" onClick={handleAddTrip}>
          Save
        </button>
      </div>
    </Modal>,
    modalRoot
  );
};

export default AddTripModal;
