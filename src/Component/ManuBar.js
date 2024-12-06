import React, { useContext, useState } from 'react';
import { fabric } from 'fabric';
import { CanvasContext, ImgUrl2 } from '../Context/CanvasContext';

import { ColorPicker } from 'primereact/colorpicker';

const ManuBar = () => {

    const [canvas] = useContext(CanvasContext);
    const [TimgUrl2, setTImgUrl2] = useContext(ImgUrl2);


    const addRect = () => {
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            width: 200,
            height: 100,
            angle: 0,
            padding: 10,
            // transformMatrix: [0, 0, 0, 0, 0, 0],
            centeredRotation: true,
            originX: "center",
            originY: "center"  // rotation

        });

        canvas.add(rect);
        console.log(rect);

        canvas.renderAll();
        // setname(name + ' Rectangle');
    }

    const handelchange = (e) => {
        e.preventDefault();
        const color = e.value;
        const shape = canvas.getActiveObject();

        if (shape.type === 'group' || shape.type === 'activeSelection') {
            const objects = shape._objects;
            objects.forEach((obj) => {
                obj.set({
                    stroke: `#${color}`
                })
            })
        } else {
            shape.set(({
                stroke: `#${color}`
            }))
        }
        canvas.renderAll();
    }

    const handelchange1 = (e) => {
        e.preventDefault();
        const color = e.value;
        const shape = canvas.getActiveObject();

        if (shape.type === 'group' || shape.type === 'activeSelection') {
            const objects = shape._objects;
            objects.forEach((obj) => {
                obj.set({
                    fill: `#${color}`
                })
            })
        } else {
            shape.set(({
                fill: `#${color}`
            }))
        }
        canvas.renderAll();
    }

    const addCircel = (canvi) => {
        const circle = new fabric.Circle({
            radius: 50,
            top: 300,
            left: 400,
            fill: '0 0 0 0',
            selectable: true,
            originX: "center",
            originY: "center"
            // minScaleLimit: 1.5


        });
        circle.set({
            selectable: true
        })
        canvi.add(circle);
        canvi.renderAll();
        // setname(name + ' Circle');
    }

    const handelDelete = () => {
        canvas.getActiveObjects().forEach((obj) => {
            canvas.remove(obj)
        });
        canvas.renderAll();
    }

    const handelLine = () => {
        const line = new fabric.Line([50, 130, 400, 120], {
            stroke: 'black',
            // fill:"black"
        })
        canvas.add(line);
        canvas.renderAll();
    }

    const handelTextBox = () => {
        const textBox = new fabric.Textbox("Demo Text Box", {
            fontFamily: 'Comic Sans'
        });

        textBox.set({
            top: 70,
            left: 65,
            fontWeight: "bold",
            width: 400,
            borderColor: 'black',
            borderDashArray: [10],
            borderOpacityWhenMoving: 0.1,
            // borderScaleFactor: 5,
            // centeredRotation: false,  // rotation
            // centeredScaling: true,
            cornerColor: 'green',
            cornerDashArray: [5],
            // cornerSize:10
            // cornerStrokeColor: 'green', 
            // transparentCorners: true,
            // cursorColor: "green" ,
            // editable: false,
            // flipX:true,
            // flipY:true,
            // lockUniScaling: false,
            // minScaleLimit:1.5,
            //  fontFamily: 'Comic Sans'
            underline: true,
            // linethrough: true,
            // overline: true,
            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
        })
        canvas.add(textBox);
    }

    const getCanvasValue = () => {
        // console.log(canvas);
        const canvasData = {
            height: canvas.height,
            width: canvas.width,
            backgroundColor: canvas.backgroundColor,
            canvas: JSON.stringify(canvas)
        }
        // canvas.clear();
        let preData = localStorage.getItem('data');
        if (preData) {
            // console.log("preData", preData);
            localStorage.removeItem('data');
            localStorage.setItem('data', JSON.stringify(canvasData));
        } else {
            localStorage.setItem('data', JSON.stringify(canvasData));
        }
    }

    const lockElement = () => {
        var activeObject = canvas.getActiveObject();
        console.log("-+-+-+-+", activeObject);


        if (activeObject) {
            if (activeObject?.type === 'activeSelection') {

                activeObject._objects.forEach(function (item) {
                    item.selectable = false;
                    item.evented = false
                    item.hoverCursor = 'pointer';
                    item.opacity = 0.40;

                });
            }
            else {
                activeObject.selectable = false;
                activeObject.evented = false
                activeObject.hoverCursor = 'default';
                activeObject.opacity = 0.8;
            }
        }
        if (activeObject.type === 'group') {
            activeObject.set({
                selectable: false,
                evented: false
            })
        }

        canvas.discardActiveObject().renderAll();

    }

    function unlockAll() {

        var items = canvas.getObjects();

        if (!items) {
            return;
        }

        items.forEach(function (item) {

            if (item.selectable === false) {
                item.selectable = true;
                item.hoverCursor = 'move';
                item.evented = true;
                item.opacity = 1;
            }
        });

        canvas.discardActiveObject().renderAll();
    }

    const sendBack = () => {
        const obj = canvas.getActiveObject();
        canvas.sendBackwards(obj);
        canvas.discardActiveObject();
        canvas.renderAll();
    }

    const bringToFront = () => {
        const obj = canvas.getActiveObject();
        canvas.bringToFront(obj);
        canvas.renderAll();

        // other method's of leayearing
        // canvas.sendToBack(myObject)
        //canvas.sendBackwards(myObject)
        // canvas.bringForward(myObject)
        // canvas.bringToFront(myObject)
    }

    const addGroup = () => {

        const rect = new fabric.Rect({
            left: 200,
            top: 100,
            width: 800,
            height: 700,
            // hasControls: false,
            // hasBorders: false
            // skipTargetFind: false,
            color: 'red',
            backgroundColor: 'white'

        });
        const group = new fabric.Group([rect], {
            visible: true
        });
        canvas.add(group);
        canvas.remove(group);

        canvas.renderAll();
    }

    const createGroup = () => {
        const obj = canvas.getActiveObjects();

        if (obj) {
            canvas.discardActiveObject();
            const group = new fabric.Group(obj, {
                originX: "center",
                originY: "center"
            });
            obj.forEach((o) => {
                canvas.remove(o);
            })

            canvas.add(group);

            canvas.renderAll();
        } else {
            console.log("Select more than one object to group.");
        }
    };

    // const destroyGroup = () => {
    //     const group = canvas.getActiveObject();

    //     if (group && group.type === 'group') {
    //         const objects = group._objects;

    //         const groupLeft = group.left;
    //         const groupTop = group.top;

    //         console.log('groupLeft ' + groupLeft);
    //         console.log('groupTop' + groupTop);

    //         canvas.remove(group);

    //         objects.forEach(obj => {
    //             delete obj.group;
    //             obj.set({
    //                 selectable: true,
    //                 hasControls: true,
    //                 hasBorders: true,
    //                 editable: true,
    //                 left: obj.left + groupLeft,
    //                 top: obj.top + groupTop,
    //             });
    //             canvas.add(obj);  // Add the object back to the canvas
    //         });



    //         // Render canvas after the change
    //         canvas.renderAll();
    //     }
    // };

    const destroyGroup1 = () => {
        let activeObject = canvas.getActiveObject();

        if (activeObject.type === "group") {
            // alert(items);
            activeObject._restoreObjectsState();

            let items = activeObject._objects;
            canvas.remove(activeObject);
            for (let i = 0; i < items.length; i++) {
                canvas.add(items[i]);
                canvas.item(canvas.size() - 1).hasControls = true;
            }
            canvas.renderAll();
        }
    }

    const getobjPro = () => {
        console.log(canvas.getActiveObject());
    }

    const rotateLeft = () => {
        const shape = canvas.getActiveObject();
        shape?.set({
            angle: shape.angle - 90
        })
        canvas.renderAll();
    }

    const rotateRight = () => {
        const shape = canvas.getActiveObject();
        shape?.set({
            angle: shape.angle + 90
            // rotate: 90
        })
        canvas.renderAll();
    }

    const backTo0 = () => {
        const shape = canvas.getActiveObject();
        shape?.set({
            angle: 0
            // rotate: 90
        })
        canvas.renderAll();
    }

    const duplicate = () => {
        const shape = canvas.getActiveObject();
        // const obj = shape.
        canvas.discardActiveObject();
        canvas.add(shape);
        shape.set({
            left: shape.left + 10,
            top: shape.top + 10
        })
        canvas.renderAll();
    }

    let rect1;

    const insetPol = () => {
        let pol = new fabric.Polygon([
            // {x: 200, y: 40}, 
            { x: 270, y: 27 },
            { x: 270, y: 127 },
            { x: 150, y: 100 },
            { x: 150, y: 50 }],
            {
                left: 250,
                top: 150,
                scaleX: 3,
                scaleY: 3,
                centeredRotation: true,
                originX: "center",
                originY: "center"  // rotation
            }
        );
        canvas.add(pol);
        canvas.renderAll();
    }

    const changePerspective = () => {
        let obj = canvas.getActiveObject();
        // console.log(obj.type);
        // console.log(obj._originalElement.currentSrc);
        // console.log(img_src);
        
        if (obj.type === 'image' ) {
            let img_src = obj._originalElement.currentSrc;
            // console.log(img_src);
            setTImgUrl2(img_src);
            // canvas.remove(obj);
        }
        else if (obj) {
            const dataURL = obj.toDataURL({
              format: 'svg',
              multiplier: 2 
            });
            setTImgUrl2(dataURL);
            // canvas.remove(obj);
            // const link = document.createElement('a');
            // link.href = dataURL;
            // link.download = 'exported-object.png';
            // link.click();
          }
        canvas.discardActiveObject();
    }

   


    return (
        <>
            ManuBar
            <div>
                <button style={{ margin: '4px' }} onClick={() => addRect()} >Reactangle</button>
                <button style={{ margin: '4px' }} onClick={() => addCircel(canvas)} >Circle</button>

                <label>Change border</label>
                <ColorPicker style={{ margin: '4px' }} value={'black'} onChange={(e) => handelchange(e)} />
                <br />
                <label>Change fill</label>
                <ColorPicker style={{ margin: '4px' }} value={'black'} onChange={(e) => handelchange1(e)} />
                <br></br>

                <button onClick={() => handelDelete()} >Delete Item</button>
                <button onClick={() => handelLine()} >Line</button>
                <button onClick={() => handelTextBox()}>Text Box</button>
                <button onClick={() => getCanvasValue()} >Save canvas value</button>
                <button onClick={lockElement} >Lock Element</button>
                <button onClick={unlockAll} >unlockAll Element</button>
                <button onClick={sendBack} >Send Back by 1 step  </button>
                <button onClick={bringToFront} > Bring To Front</button>
                <button onClick={createGroup} > Create Group</button>
                <button onClick={destroyGroup1} > remove Group</button>
                <button onClick={getobjPro} >getobjPro</button>
                <button onClick={addGroup} >addGroup</button>
                <button onClick={rotateLeft} >Rotate Left</button>
                <button onClick={rotateRight} >Rotate Right</button>
                <button onClick={backTo0} >Back to 0 deg</button>

                <button onClick={duplicate} >Duplicate</button>

                <button onClick={changePerspective} >Change Perspective</button>

                <button onClick={insetPol} >Inset Polygon</button>


            </div>
        </>
    )
}

export default ManuBar;