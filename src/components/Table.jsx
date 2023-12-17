import React, { useState, useEffect } from "react";
import "./EditableCatTable.css";

const EditableCatTable = ({ catData, onUpdate }) => {
  const [editableData, setEditableData] = useState(catData);
  const [newTreatData, setNewTreatData] = useState({
    name: "",
    quantity: 0,
  });
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  useEffect(() => {
    setEditableData(catData);
  }, [catData]);

  const handleUpdate = () => {
    onUpdate(editableData);
  };

  const handleCellChange = (rowIndex, key, value) => {
    const newData = [...editableData];
    newData[rowIndex][key] = value;
    setEditableData(newData);
  };

  const handleAddTreat = (rowIndex) => {
    setSelectedRowIndex(rowIndex);
  };

  const handleSaveTreat = () => {
    if (selectedRowIndex !== null) {
      const newData = [...editableData];
      const treats = newData[selectedRowIndex].treats || [];
      treats.push({ ...newTreatData });
      newData[selectedRowIndex].treats = treats;
      setEditableData(newData);
      setNewTreatData({ name: "", quantity: 0 });
      setSelectedRowIndex(null);
    }
  };

  function sendDataToServer(data) {
    fetch("https://loginjkhomenko-default-rtdb.firebaseio.com/cats.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Помилка");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Дані відправились:", data);
      })
      .catch((error) => {
        console.error("Помилка:", error);
      });
  }

  function sendDataHendler() {
    sendDataToServer({
      catsInfo: editableData,
      newTreatData: newTreatData,
    });
  }

  return (
    <div className="editable-table-container">
      <table className="editable-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ім'я котика</th>
            <th>Порода</th>
            <th>Вік</th>
            <th>
              Смаколики{" "}
              {selectedRowIndex !== null && (
                <div className="treat-form">
                  <input
                    type="text"
                    placeholder="Назва смаколика"
                    value={newTreatData.name}
                    onChange={(e) =>
                      setNewTreatData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="number"
                    placeholder="Кількість"
                    value={newTreatData.quantity}
                    onChange={(e) =>
                      setNewTreatData((prev) => ({
                        ...prev,
                        quantity: parseInt(e.target.value, 10) || 0,
                      }))
                    }
                  />
                  <button onClick={handleSaveTreat}>Зберегти</button>
                </div>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {editableData.map((row, rowIndex) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) =>
                    handleCellChange(rowIndex, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.breed}
                  onChange={(e) =>
                    handleCellChange(rowIndex, "breed", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.age}
                  onChange={(e) =>
                    handleCellChange(rowIndex, "age", e.target.value)
                  }
                />
              </td>
              <td>
                {row.treats &&
                  row.treats.map((treat, treatIndex) => (
                    <div key={treatIndex} className="treat-item">
                      {treat.name} - {treat.quantity}
                    </div>
                  ))}
                <button onClick={() => handleAddTreat(rowIndex)}>
                  Додати смаколик
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleUpdate} className="update-button">
        Оновити дані
      </button>
      <button className="update-button" onClick={sendDataHendler}>
        Відправка на сервер
      </button>
    </div>
  );
};

export default EditableCatTable;
