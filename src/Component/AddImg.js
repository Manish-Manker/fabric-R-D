import React, { useContext, useState, useEffect } from 'react';
import { CanvasContext, ImgUrl } from '../Context/CanvasContext';
import { fabric } from 'fabric';

const AddImg = () => {
  const [imgUrl, setImgUrl] = useState();
  const [canvas] = useContext(CanvasContext);

  const [TimgUrl, setTImgUrl] = useContext(ImgUrl);

  useEffect(() => {
    // console.log(TimgUrl);
    if (TimgUrl) {
      addImage(TimgUrl)
    }
  }, [TimgUrl]);

  const addImage = (imgUrl) => {
    fabric.Image.fromURL(imgUrl, (img) => {
      img.set({
        top: 200,
        left: 200,
        selectable: true,
        centeredRotation: true,
        originX: "center",
        originY: "center" ,  // rotation
        margin: -100
      });
      canvas.add(img);
      canvas.renderAll();
    });
    setTImgUrl(null);
  };

  const handleImage = () => {
    fabric.Image.fromURL(imgUrl, (img) => {
      img.set({
        top: 200,
        left: 200,
        selectable: true,
        centeredRotation: true,
        originX: "center",
        originY: "center"  // rotation
      });
      canvas.add(img);
      canvas.renderAll();
    });
    setImgUrl('');
  };

  return (
    <>
      <div>
        <label style={{ margin: 10 }}>Insert Img Link</label>
        <input style={{ margin: 10 }} value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
        <button onClick={handleImage}>Insert Img</button>
      </div>
    </>
  );
};

export default AddImg;