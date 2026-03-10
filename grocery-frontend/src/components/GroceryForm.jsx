import React, { useRef, useEffect } from 'react';
import './GroceryForm.css';

function GroceryForm({ inputText, setInputText, addItem, editId, updateItem, cancelEditing }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateItem();
    } else {
      addItem(inputText);
    }
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="e.g. milk"
        />
        <button 
          type="submit"
          style={{ backgroundColor: editId ? 'var(--edit-orange)' : 'var(--primary-green)' }}
        >
          {editId ? 'Update Item' : 'Add Item'}
        </button>
        {editId && (
          <button 
            type="button" 
            onClick={cancelEditing}
            className="cancel-btn"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default GroceryForm;