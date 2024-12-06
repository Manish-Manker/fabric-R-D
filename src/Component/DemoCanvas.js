import React, { useContext, useEffect } from 'react';
import { CanvasContext } from '../Context/CanvasContext';
import { fabric } from 'fabric';

const DemoCanvas = () => {
  const [canvas, setCanvas] = useContext(CanvasContext);


  useEffect(() => {
    const newCanvas = initCanvas();
    setCanvas(newCanvas);
  
    // newCanvas.on('mouse:down', (e) => {
    //   const pointer = newCanvas.getPointer(e.e);
    //   console.log('Mouse down at:', pointer);
    // });

    // newCanvas.on('mouse:move', (e) => {
    //   const pointer = newCanvas.getPointer(e.e);
    //   console.log('Mouse move at:', pointer);
    // });
    
    // newCanvas.on('mouse:up',(e) => {
    //   const pointer = newCanvas.getPointer(e.e);
    //   console.log('Mouse up at:', pointer);
    // });

    // newCanvas.on('object:selected', (e) => {
    //   console.log('Object selected: ----', e.target);
    // });


    // newCanvas.on('object:modified', (e) => {
    //   console.log('Object modified:', e.target);
    // });

    // newCanvas.on("before:selection:cleared" , (e)=>{
    //   console.log("before:selection:cleared");
    // })

    // newCanvas.on("selection:created",(e)=>{
    //   console.log("selection:created -- ", e.target);
    // })

    // newCanvas.on("selection:cleared",()=>{
    //   console.log("selection:cleared-----");
    // })

    // newCanvas.on("object:moving",()=>{
    //   console.log("object:moving----------");
    // })
    
    // newCanvas.on("object:scaling",()=>{
    //   console.log("object:scaling---------------");
    // })

    // newCanvas.on("object:rotating",(e)=>{
    //   console.log("object:rotating----------------+++++++++",e.target);
    // })

    newCanvas.on("object:added",(e)=>{
      console.log("object:added+++++",e.target.type);
    })

    newCanvas.on("object:removed",(e)=>{
      console.log("object:removed-+-+-+-+-+", e.target.type);
    })


    return () => {
      newCanvas.off('object:added');
      newCanvas.off('mouse:removed');
      newCanvas.off('object:modified');
      newCanvas.dispose();
    };
  }, [setCanvas]); 

  const initCanvas = () => {
    return new fabric.Canvas('canvas', {
      height: 600,
      width: 1300,
      backgroundColor: 'pink',
      selection: true,
      isDrawingMode: false,
      centeredRotation :true,
      originX: "center",
      originY: "center"  ,
      // renderOnAddRemove: false
    });
  };

  return (
    <>
      <div>DemoCanvas</div>
      <br />
      <canvas id="canvas" style={{ marginLeft: 200 }} />
    </>
  );
};

export default DemoCanvas;
