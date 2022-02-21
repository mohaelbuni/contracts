
import {useLocation} from 'react-router-dom'
// import {Image} from 'react-bootstrap'
import React, { useState, useCallback } from 'react';
import ImageViewer from 'react-simple-image-viewer';

function ContractDetails() {
  const location = useLocation()
    const data = location.state
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = [
    ];
    images.push(data.image)
  
    const openImageViewer = useCallback((index) => {
      setCurrentImage(index);
      setIsViewerOpen(true);
    }, []);
  
    const closeImageViewer = () => {
      setCurrentImage(0);
      setIsViewerOpen(false);
    };
  
    return (
      <div>
        <h1>{data.title}</h1>
        {images.map((src, index) => (
          <img
            src={ src }
            onClick={ () => openImageViewer(index) }
            width="300"
            key={ index }
            style={{ margin: '2px' }}
            alt=""
          />
        ))}
        {isViewerOpen && (
          <ImageViewer
            src={ images }
            currentIndex={ currentImage }
            disableScroll={ false }
            closeOnClickOutside={ true }
            onClose={ closeImageViewer }
          />
        )}
      </div>
    );

}

export default ContractDetails