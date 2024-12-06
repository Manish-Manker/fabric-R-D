import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const ImageFilter = () => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const initCanvas = () => {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: false,
        selection: true,
        width: 800,
        height: 600,
        backgroundColor:'pink'
      });
      setCanvas(fabricCanvas);

      fabric.Image.fromURL('https://fastly.picsum.photos/id/941/536/354.jpg?hmac=8dGR0ZI6HvkSkMKPgven760t2RIple7hEB1QHsfzkaU', (myImg) => {
        myImg.set({
          left: 0, top: 0, opacity: 0.5,
        });
        fabricCanvas.add(myImg);
        setImg(myImg);

        // Append the original image to the DOM
        const originalImg = new Image();
        
        originalImg.src = fabricCanvas.toDataURL('image/png');
        console.log(originalImg.src);
        imgRef.current.appendChild(originalImg);
      }, { crossOrigin: 'anonymous' });
    };

    initCanvas();

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, []);

  const applyFilter = (filter) => {
    if (!img) return;

    // Remove existing filters
    img.filters = [];

    switch (filter) {
      case 'Polaroid':
        img.filters.push(new fabric.Image.filters.Polaroid());
        break;
      case 'Sepia':
        img.filters.push(new fabric.Image.filters.Sepia());
        break;
      case 'Kodachrome':
        img.filters.push(new fabric.Image.filters.Kodachrome());
        break;
      case 'Contrast':
        img.filters.push(new fabric.Image.filters.Contrast({ contrast: 0.3 }));
        break;
      case 'Brightness':
        img.filters.push(new fabric.Image.filters.Brightness({ brightness: 0.8 }));
        break;
      case 'Greyscale':
        img.filters.push(new fabric.Image.filters.Grayscale());
        break;
      case 'Brownie':
        img.filters.push(new fabric.Image.filters.Brownie());
        break;
      case 'Vintage':
        img.filters.push(new fabric.Image.filters.Vintage());
        break;
      case 'Technicolor':
        img.filters.push(new fabric.Image.filters.Technicolor());
        break;
      case 'Pixelate':
        img.filters.push(new fabric.Image.filters.Pixelate());
        break;
      case 'Invert':
        img.filters.push(new fabric.Image.filters.Invert());
        break;
      case 'Blur':
        img.filters.push(new fabric.Image.filters.Blur());
        break;
      case 'Sharpen':
        img.filters.push(new fabric.Image.filters.Convolute({ matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0] }));
        break;
      case 'Emboss':
        img.filters.push(new fabric.Image.filters.Convolute({ matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1] }));
        break;
      case 'RemoveColor':
        img.filters.push(new fabric.Image.filters.RemoveColor({ threshold: 0.2, distance: 0.5 }));
        break;
      case 'BlacknWhite':
        img.filters.push(new fabric.Image.filters.BlackWhite());
        break;
      case 'Vibrance':
        img.filters.push(new fabric.Image.filters.Vibrance({ vibrance: 1 }));
        break;
      case 'BlendColor':
        img.filters.push(new fabric.Image.filters.BlendColor({ color: '#00ff00', mode: 'multiply' }));
        break;
      case 'HueRotate':
        img.filters.push(new fabric.Image.filters.HueRotation({ rotation: 0.5 }));
        break;
      case 'Saturation':
        img.filters.push(new fabric.Image.filters.Saturation({ saturation: 0.7 }));
        break;
      case 'Gamma':
        img.filters.push(new fabric.Image.filters.Gamma({ gamma: [1, 0.5, 2.1] }));
        break;
      default:
        alert('Filter not implemented');
    }

    // Apply the filters
    img.applyFilters();
    canvas.add(img);
    canvas.renderAll();
  };

  return (
    <div style={{ display: 'grid', justifyItems: 'center', alignItems: 'center' }}>
      <h1>How to do image filters with FabricJS</h1>
      <h3>Original image</h3>
      <div ref={imgRef}></div>
      <hr />
      <h2>Please choose the filter</h2>
      <select onChange={(e) => applyFilter(e.target.value)} id="filter-option">
        <option value="None">None</option>
        <option value="Polaroid">Polaroid</option>
        <option value="Sepia">Sepia</option>
        <option value="Kodachrome">Kodachrome</option>
        <option value="Contrast">Contrast</option>
        <option value="Brightness">Brightness</option>
        <option value="Greyscale">Greyscale</option>
        <option value="Brownie">Brownie</option>
        <option value="Vintage">Vintage</option>
        <option value="Technicolor">Technicolor</option>
        <option value="Pixelate">Pixelate</option>
        <option value="Invert">Invert</option>
        <option value="Blur">Blur</option>
        <option value="Sharpen">Sharpen</option>
        <option value="Emboss">Emboss</option>
        <option value="RemoveColor">Remove Color</option>
        <option value="BlacknWhite">Black and White</option>
        <option value="Vibrance">Vibrance</option>
        <option value="BlendColor">Blend Color</option>
        <option value="HueRotate">Hue Rotate</option>
        <option value="Saturation">Saturation</option>
        <option value="Gamma">Gamma</option>
      </select>
      <h3>After image filter</h3>
      <div id="container">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default ImageFilter;
