import React, { useContext, useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { CanvasContext } from '../Context/CanvasContext';
import { ColorPicker } from 'primereact/colorpicker';

const DrawingBoard = () => {
    const [canvas] = useContext(CanvasContext);
    const [isDrawing, setIsDrawing] = useState(false);

    // State for brush properties
    const [brushWidth, setBrushWidth] = useState(50);
    const [brushColor, setBrushColor] = useState('#ff0000');
    const [brushType, setBrushType] = useState('Pencil');

    const [undo, setUndo] = useState([]);

    // Update the brush whenever the brush type, width, or color changes
    const updateBrush = () => {
        if (!canvas) return;

        // Update the drawing brush
        canvas.freeDrawingBrush = new fabric[brushType + 'Brush'](canvas);
        canvas.freeDrawingBrush.width = brushWidth;
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.drawStraightLines = true;
        canvas.freeDrawingBrush.limitedToCanvasSize = true;


        canvas.renderAll();
    };
    const handleDrawing = () => {
        setIsDrawing(prev => !prev);
        canvas.isDrawingMode = !isDrawing;
        canvas.renderAll();
    };
    // Call updateBrush whenever brush properties change
    useEffect(() => {
        updateBrush();
    }, [brushType, brushWidth, brushColor, handleDrawing]);



    const setBrushColor1 = (color) => {
        setBrushColor(`#${color}`);
    };

    const setBrushWidth1 = (value) => {
        setBrushWidth(parseInt(value) );
    };

    const clearCanvas = () => {
        canvas.getObjects().forEach((obj) => {
            canvas.remove(obj);
        });
        canvas.renderAll();
    };

    const Eraser = () => {
        setBrushColor('#ffc0cb');
        setBrushWidth(25);
        setBrushType('Pencil');
        updateBrush();
    }

    const handleUndo = () => {
        const objs = canvas.getObjects();
        if (objs.length > 0) {
            let lastObj = objs[objs.length - 1];
            canvas.remove(lastObj);
            setUndo([...undo, lastObj]);
            canvas.renderAll();
        }
    }

    const handleRedo = () => {
        if (undo.length > 0) {
            let lastObj = undo[undo.length - 1];
            canvas.add(lastObj);
            canvas.renderAll();
            setUndo(undo.slice(0, undo.length - 1));
        }
    }

    return (
        <>
            <div>Drawing Board</div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center', flexDirection: 'row' }}>
                <button style={{ background: isDrawing ? 'green' : 'red' }} onClick={handleDrawing}>
                    Drawing Mode {isDrawing ? 'on' : 'off'}
                </button>

                <button onClick={() => setBrushType('Pencil')}>Pencil Brush</button>
                <button onClick={() => setBrushType('Circle')}>Circle Brush</button>
                <button onClick={() => setBrushType('Spray')}>Spray Brush</button>  
                <button onClick={Eraser}>Eraser</button>
                <button onClick={handleUndo}>Undo</button>
                <button onClick={handleRedo}>Redo</button>
            
            <br />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label>Brush Width:</label>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={brushWidth}
                    onChange={(e) => setBrushWidth1(e.target.value)}
                />
                <span>{brushWidth}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label>Brush Color:</label>
                <ColorPicker value={brushColor} onChange={(e) => setBrushColor1(e.value)} />
            </div>
            </div>

            <br />
            <button onClick={clearCanvas}>Clear</button>
        </>
    );
};

export default DrawingBoard;
