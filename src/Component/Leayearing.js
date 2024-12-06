import React, { useContext, useState } from 'react'
import { CanvasContext } from '../Context/CanvasContext'
import { fabric } from 'fabric';
// import { nanoid } from 'nanoidv4';
import { nanoid } from 'nanoid'

const Leayearing = () => {

    const [canvas] = useContext(CanvasContext);
    const [layers, setLayers] = useState([]);

    const getObjectById = (id) => {
        return canvas?.getObjects().find(obj => obj.id === id);
    };


    //add a Leayer
    const addLayer = () => {
        const newLeayer = { id: layers.length, obj: [] };
        setLayers(...layers, newLeayer);
    }

    const removeLayer = (layerId) => {
        const layerToRemove = layers.find(layer => layer.id === layerId);
        if (!layerToRemove) return;

        layerToRemove.objects.forEach(id => {
            const object = getObjectById(id);
            if (object) {
                canvas.remove(object);
            }
        });
        const updatedLayers = layers.filter(layer => layer.id !== layerId);
        setLayers(updatedLayers);
        rearrangeObjects(updatedLayers);
        
    };

    const addObjectToLayer = (layerId) => {
        if (!canvas) return;
        const rect = new fabric.Rect({
            width: 100,
            height: 100,
            fill: 'red',
            left: Math.random() * 700,
            top: Math.random() * 500,
            id: nanoid()
        });
        canvas.add(rect);
        setLayers(layers.map(layer => {
            if (layer.id === layerId) {
                return { ...layer, objects: [...layer.objects, rect.id] };
            }
            return layer;
        }));
    };


    const setObjectsVisible = (layerId, visible) => {
        const layer = layers.find(layer => layer.id === layerId);
        if (!layer) return;

        layer.objects.forEach((id) => {
            let object = getObjectById(id);
            if (object) {
                object.set('visible', visible);
            }
        });
        canvas.renderAll();
    };

    const makeObjectsVisible = (layerId) => setObjectsVisible(layerId, true);
    const makeObjectsInvisible = (layerId) => setObjectsVisible(layerId, false);

    const makeObjectsGroup = (layerId) => {
        const layer = layers.find(layer => layer.id === layerId);
        if (!layer) return;

        let groupObjects = layer.objects.map(id => getObjectById(id)).filter(obj => obj);
        let group = new fabric.Group(groupObjects, { id: nanoid() });

        groupObjects.forEach(obj => canvas.remove(obj));
        canvas.add(group);
        setLayers(layers.map(l => l.id === layerId ? { ...l, objects: [group.id] } : l));
        canvas.renderAll();
        return group.id;

    };


    const makeObjectsUngroup = (layerId) => {
        const layer = layers.find(layer => layer.id === layerId);
        if (!layer) return;
        
        let resultIds = [];
        layer.objects.forEach((id) => {
            let object = getObjectById(id);
            if (object && object.type === 'group') {
                let objects = object._restoreObjectsState().getObjects();
                canvas.remove(object);
                objects.forEach(obj => {
                    canvas.add(obj);
                    resultIds.push(obj.id);
                });
            }
        });

        setLayers(layers.map(l => l.id === layerId ? { ...l, objects: resultIds } : l));
        canvas.renderAll();
        return resultIds;
    };


    const rearrangeObjects = (layers) => {
        let index = 0;
        for (let layer of layers) {
          for (let objectId of layer.objects) {
            let object = getObjectById(objectId);
            object?.moveTo(index);
            index++;
          }
        }
        canvas.renderAll();
      };
      
      const sendToBack = (layerId) => {
        let updatedLayers = [...layers];
        let layerIndex = updatedLayers.findIndex(layer => layer.id === layerId);
        if (layerIndex > 0) {
          [updatedLayers[layerIndex - 1], updatedLayers[layerIndex]] = [updatedLayers[layerIndex], updatedLayers[layerIndex - 1]];
          setLayers(updatedLayers);
          rearrangeObjects(updatedLayers);
        }
      };
      
      const bringToFront = (layerId) => {
        let updatedLayers = [...layers];
        let layerIndex = updatedLayers.findIndex(layer => layer.id === layerId);
        if (layerIndex < updatedLayers.length - 1) {
          [updatedLayers[layerIndex + 1], updatedLayers[layerIndex]] = [updatedLayers[layerIndex], updatedLayers[layerIndex + 1]];
          setLayers(updatedLayers);
          rearrangeObjects(updatedLayers);
        }
      };

    return (
        <>
            <div>
                <div>
                    <button onClick={addLayer}>Add Layer</button>
                    <button onClick={() => removeLayer(layers[layers.length - 1]?.id)}>Remove Layer</button>
                    <button onClick={() => addObjectToLayer(layers[layers.length - 1]?.id)}>Add Object to Last Layer</button>
                    <button onClick={() => makeObjectsInvisible(layers[layers.length - 1]?.id)}>Make Last Layer Invisible</button>
                    <button onClick={() => makeObjectsVisible(layers[layers.length - 1]?.id)}>Make Last Layer Visible</button>
                    <button onClick={() => makeObjectsGroup(layers[layers.length - 1]?.id)}>Group Last Layer Objects</button>
                    <button onClick={() => makeObjectsUngroup(layers[layers.length - 1]?.id)}>Ungroup Last Layer Objects</button>
                    {/* <button onClick={() => sendToBack(layers[layers.length - 1]?.id)}>Send Last Layer to Back</button> */}
                    {/* <button onClick={() => bringToFront(layers[layers.length - 1]?.id)}>Bring Last Layer to Front</button> */}
                </div>
                {/* <canvas ref={canvasRef} id="canvas" /> */}
            </div>
        </>
    )
}

export default Leayearing