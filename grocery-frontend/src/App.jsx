import React, { useState, useEffect } from "react";
import "./App.css";
import GroceryForm from "./components/GroceryForm";
import GroceryList from "./components/GroceryList";

const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api/grocery";

const buildErrorMessage = async (res, fallbackMessage) => {
  try {
    const payload = await res.json();
    return (
      payload.error ||
      payload.detail ||
      payload.message ||
      `${fallbackMessage} (HTTP ${res.status})`
    );
  } catch {
    return `${fallbackMessage} (HTTP ${res.status})`;
  }
};

function App() {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${BASE_URL}/`);
        if (!res.ok) {
          throw new Error(await buildErrorMessage(res, "Failed to fetch items"));
        }
        const data = await res.json();
        setItems(data);
      } catch (err) {
        alert(err.message || "Could not load grocery list");
      }
    };

    fetchItems();
  }, []);

  const addItem = async (itemName) => {
    if (!itemName.trim()) {
      alert("You must write something!");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: itemName, completed: false }),
      });

      if (!res.ok) {
        throw new Error(await buildErrorMessage(res, "Failed to add item"));
      }

      const payload = await res.json();
      setItems((prev) => [...prev, payload.data]);
      setInputText("");
      alert("Item Added Successfully!");
    } catch (err) {
      alert(err.message || "Could not add item");
    }
  };

  const toggleCompleted = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}/toggle/`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(await buildErrorMessage(res, "Failed to toggle item"));
      }

      const payload = await res.json();
      setItems((prev) =>
        prev.map((item) => (item.id === id ? payload.data : item)),
      );
    } catch (err) {
      alert(err.message || "Could not update item");
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}/`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(await buildErrorMessage(res, "Failed to delete item"));
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
      alert("Item Deleted Successfully!");
    } catch (err) {
      alert(err.message || "Could not delete item");
    }
  };

  const startEditing = (id, name) => {
    setEditId(id);
    setInputText(name);
  };

  const updateItem = async () => {
    if (!inputText.trim()) {
      alert("Item cannot be empty!");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/${editId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputText }),
      });

      if (!res.ok) {
        throw new Error(await buildErrorMessage(res, "Failed to update item"));
      }

      const payload = await res.json();
      setItems((prev) =>
        prev.map((item) => (item.id === editId ? payload.data : item)),
      );

      setEditId(null);
      setInputText("");
      alert("Item Updated Successfully!");
    } catch (err) {
      alert(err.message || "Could not update item");
    }
  };

  const cancelEditing = () => {
    setEditId(null);
    setInputText("");
  };

  return (
    <div className="container">
      <div className="grocery-bud">
        <h2>
          Grocery Bud
          <img
            src={`${process.env.PUBLIC_URL}/images/icon.png`}
            alt="grocery icon"
          />
        </h2>
        <GroceryForm
          inputText={inputText}
          setInputText={setInputText}
          addItem={addItem}
          editId={editId}
          updateItem={updateItem}
          cancelEditing={cancelEditing}
        />
        <GroceryList
          items={items}
          toggleCompleted={toggleCompleted}
          deleteItem={deleteItem}
          startEditing={startEditing}
        />
      </div>
    </div>
  );
}

export default App;
