import React, { useState } from "react";
import EditableCatTable from "./components/Table";
import Switcher from "./components/Switcher.jsx";
import "./App.css";

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleThemeChange = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const initialCatData = [
    { id: 1, name: "Мурзік", breed: "Перс", age: 3, treats: 0 },
    { id: 2, name: "Булка", breed: "Британець", age: 2, treats: 0 },
    { id: 3, name: "Лунтік", breed: "Сіамский", age: 4, treats: 0 },
  ];

  const [catData, setCatData] = useState(initialCatData);
  const [newCat, setNewCat] = useState({
    id: "",
    name: "",
    breed: "",
    age: "",
  });

  const handleUpdate = (updatedData) => {
    setCatData(updatedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCat((prevCat) => ({ ...prevCat, [name]: value }));
  };

  const handleAddCat = () => {
    setCatData((prevData) => [...prevData, { ...newCat, treats: 0 }]);
    setNewCat({ id: "", name: "", breed: "", age: "" });
  };

  return (
    <div className={`app-container ${isDarkTheme ? "dark-theme" : ""}`}>
      <Switcher onClickHandle={handleThemeChange} />
      <h1>Таблиця котиків</h1>
      <EditableCatTable catData={catData} onUpdate={handleUpdate} />
      <form className="form-container">
        <label>ID:</label>
        <input
          type="text"
          name="id"
          value={newCat.id}
          onChange={handleInputChange}
        />

        <label>Ім'я котика:</label>
        <input
          type="text"
          name="name"
          value={newCat.name}
          onChange={handleInputChange}
        />

        <label>Порода:</label>
        <input
          type="text"
          name="breed"
          value={newCat.breed}
          onChange={handleInputChange}
        />

        <label>Вік:</label>
        <input
          type="text"
          name="age"
          value={newCat.age}
          onChange={handleInputChange}
        />

        <button type="button" onClick={handleAddCat}>
          Додати кота
        </button>
      </form>
    </div>
  );
};

export default App;
