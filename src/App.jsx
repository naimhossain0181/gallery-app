import React, { useEffect, useState } from 'react';
import './App.css'
import data from '../db.json'
import { useDrag, useDrop } from 'react-dnd';
const App = () => {
  const [images, setImages] = useState(data)

  const reorderItems = (dragIndex, dropIndex) => {
    const dragItem = images[dragIndex]
    const updatedItems = Array.from(images)
    updatedItems.splice(dragIndex, 1)
    updatedItems.splice(dropIndex, 0, dragItem)
    setImages(updatedItems)
  }
  return (
    <section className='container'>
      <div className='main-container'>
        <div className='gallery-header gallery'>
          <h4>Gallery</h4>
        </div>
        <div className='grid-container'>
          {
            images.map((item, index) => {
              const [{ isDraging }, dragRef] = useDrag({
                type: 'img',
                item: {
                  id: item.id,
                  index
                },
                collect: (monitor) => ({
                  isDraging: monitor.isDragging()
                })
              })

              const [{ isDragOver }, dropRef] = useDrop({
                accept: 'img',
                collect: (monitor) => ({
                  isDragOver: monitor.isOver()
                }),

                drop: (draggedItem) => {
                  console.log(draggedItem)
                  console.log(draggedItem.index)
                  if (draggedItem.index !== index) {
                    reorderItems(draggedItem.index, index)

                  }
                }

              })
              return <div key={index} ref={(node) => dragRef(dropRef(node))} className={`grid-item ${isDraging?'dargging':isDragOver?'dragOver':''} ${index === 0 ? 'large' : ''}`}>
                <img className="img" src={item.image} alt={index} />
              </div>
            })
          }
        </div>
      </div>
    </section>


  );
};

export default App;