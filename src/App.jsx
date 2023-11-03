import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import data from "../db.json";
import Image from "./Image";

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const uploadRef = useRef(null)

  const reorderItems = (dragIndex, dropIndex) => {
    const dragItem = images[dragIndex];
    const updatedItems = Array.from(images);
    updatedItems.splice(dragIndex, 1);
    updatedItems.splice(dropIndex, 0, dragItem);
    setImages(updatedItems);
  };

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

  const handleImageUpload = (e) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
    const uploadFile = e.target.files[0]
    if (acceptedImageTypes.includes(uploadFile.type)) {
      const reader = new FileReader()
      reader.onload = (event) => {
        // console.log(event.target.result)
        setImages([...images, { id: images.length + 1, image: event.target.result }])
      }
      if (uploadFile) {
        reader.readAsDataURL(uploadFile)
      }
    }

  }
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
  return (
    <section className="container">
      <div className="main-container">
        <div className="gallery-header">
          {isCheck ? (
            <div className="select-header">
              <h1 style={{ color: "green" }}>selected items {selectedItems.length}</h1>
              <button className="delete" onClick={handleDeleteSelectedItems}>Delete</button>
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
          <div className="upload" onClick={() => uploadRef.current.click()}>
            Add Item
          </div>
          <input style={{ display: "none" }} accept="image/*" type="file" ref={uploadRef} onChange={handleImageUpload} />
        </div>
      </div>
    </section>
  );
};

export default App;
