import React, { useEffect, useState } from 'react'
import { fabric } from 'fabric';

const ShowName = () => {

    const [canvas2, setCanvas2] = useState();
    const [value, setvalue] = useState();



    const initcanvas = () => {
        const canvas = new fabric.Canvas('canvas2', {
            height: value.height,
            width: value.width,
            backgroundColor: value.backgroundColor,
        })
        setCanvas2(canvas);
        canvas.loadFromJSON(JSON.parse(value.canvas));
        canvas.renderAll();
        // return canvas;
    }

    const showSaveCanvas = async () => {
        if(canvas2){
            canvas2.remove(canvas2.getObjects());
            let data = JSON.parse(localStorage.getItem('data'));
            setvalue(data);
            initcanvas();
        }
        else{
            initcanvas();
        }
    }

    // const getCanvasValue = () => {
    //     if(canvas2){
    //         canvas2.remove(canvas2.getObjects());
    //     }
    //     console.log('----------------------------------------');
    //     const canvasData = {
    //         height: canvas2.height,
    //         width: canvas2.width,
    //         backgroundColor: canvas2.backgroundColor,
    //         canvas: JSON.stringify(canvas2)
    //     }
    //     // canvas.clear();
    //     localStorage.removeItem('data');
    //     localStorage.setItem('data', JSON.stringify(canvasData));
    //     showSaveCanvas();
    // }

    
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('data'));
        setvalue(data);
    }, [])


    return (
        <>
            <canvas id='canvas2' style={{ marginLeft: 200 }} />
            <button onClick={() => showSaveCanvas()} >Show Save Cavas</button>
        </>
    )
}

export default ShowName