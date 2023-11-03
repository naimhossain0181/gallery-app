import React, { useEffect, useState } from "react";
import "./App.css";
import data from "../db.json";
import { useDrag, useDrop } from "react-dnd";
import Image from "./Image";

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheck, setIsCheck] = useState(false);

  const reorderItems = (dragIndex, dropIndex) => {
    const dragItem = images[dragIndex];
    const updatedItems = Array.from(images);
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(dropIndex, 0, dragItem);
    setImages(updatedItems);
  };
  useEffect(() => {
    setImages(data);
  }, []);
  useEffect(() => {
    if (selectedItems.length > 0) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [selectedItems]);
  const handleItemCheck = (id) => {
    if (selectedItems.length > 0) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDeleteSelectedItems = () => {
    const updatedItems = images.filter(
      (item) => !selectedItems.includes(item.id)
    );
    setImages(updatedItems);
    setSelectedItems([]);
  };

  return (
    <section className="container">
      <div className="main-container">
        <div className="gallery-header">
          {isCheck ? (
            <div className="select-header">
              <h1>selected item {selectedItems.length}</h1>
              <button onClick={handleDeleteSelectedItems}>delete</button>
            </div>
          ) : (
            <div className="gallery">
              <h4 className="gallery">Gallery</h4>
            </div>
          )}
        </div>
        <div className="grid-container">
          {images.map((item, index) => (
            <Image
              key={index}
              id={item.id}
              src={item.image}
              index={index}
              reorderItems={reorderItems}
              handleItemCheck={handleItemCheck}
              isCheck={selectedItems.includes(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
