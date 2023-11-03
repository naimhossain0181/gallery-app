import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Image = ({id,src,index,reorderItems,handleItemCheck,isCheck}) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'img',
        item: {
          id:id,
          index,
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });

      const [{ isDragOver }, dropRef] = useDrop({
        accept: 'img',
        collect: (monitor) => ({
          isDragOver: monitor.isOver(),
        }),
        drop: (draggedItem) => {
          if (draggedItem.index !== index) {
            reorderItems(draggedItem.index, index);
          }
        },
      });
    return (
        <div
        key={index}
        ref={(node) => dragRef(dropRef(node))}
        className={`grid-item ${isDragging ? 'dragging' : isDragOver ? 'dragOver' : ''} ${index === 0 ? 'large' : ''}`}
      >
        <img className="img" src={src} alt={index} />
        <input className='checkbox' type="checkbox" value={id} checked={isCheck} onChange={() => handleItemCheck(id)} />
      </div>
    );
};

export default Image;