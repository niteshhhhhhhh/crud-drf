import React from 'react';
import GroceryItem from './GroceryItem';
import './GroceryList.css';

function GroceryList({ items, toggleCompleted, deleteItem, startEditing }) {
  if (items.length === 0) {
    return <p className="empty-message">No items in your list. Add something!</p>;
  }

  return (
    <ul className="list-container">
      {items.map(item => (
        <GroceryItem 
          key={item.id}
          item={item}
          toggleCompleted={toggleCompleted}
          deleteItem={deleteItem}
          startEditing={startEditing}
        />
      ))}
    </ul>
  );
}

export default GroceryList;