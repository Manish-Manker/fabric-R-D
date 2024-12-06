import './App.css';
import { CanvasContext, NameContext, ImgUrl, ImgUrl2 } from './Context/CanvasContext';
import { useState } from 'react';
import DemoCanvas from './Component/DemoCanvas';
import ManuBar from './Component/ManuBar';
import ShowName from './Component/ShowName';
// import ImageFilter from './Component/ImageFilter';
import AddImg from './Component/AddImg';
import ThreeCanva from './Component/ThreeCanva';
// import Leayearing from './Component/Leayearing';
import DrowingBoard from './Component/DrowingBoard';

function App() {

  const [canvas, setCanvas] = useState("");
  const [name, setname] = useState(' ');
  const [TimgUrl, setTImgUrl] = useState('');
  const [TimgUrl2, setTImgUrl2] = useState('');

  return (
    <>
      <NameContext.Provider value={[name, setname]}>
        <CanvasContext.Provider value={[canvas, setCanvas]}>
          <ImgUrl.Provider value={[TimgUrl, setTImgUrl]}>
            <ImgUrl2.Provider value={[TimgUrl2, setTImgUrl2]}>

              <div className="App">
                <h1>Fabric Canvas Useing ContextAPI</h1>
                <ManuBar />
                <br />
                <AddImg />
                <br />
                <DrowingBoard />
                <br />
                <DemoCanvas />
                <br /><br />
                <ThreeCanva />
              </div>
              <ShowName />

            </ImgUrl2.Provider>
          </ImgUrl.Provider>
        </CanvasContext.Provider>
      </NameContext.Provider>
      {/* <ImageFilter /> */}
    </>
  );
}

export default App;