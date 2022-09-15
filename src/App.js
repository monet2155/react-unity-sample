import React, { useEffect, useState } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl';
import './App.css'

function App() {
  
  const {unityProvider, isLoaded} = useUnityContext({
    loaderUrl: "Build/build_ver0.1.loader.js",
    dataUrl: "Build/build_ver0.1.data",
    frameworkUrl: "Build/build_ver0.1.framework.js",
    codeUrl: "Build/build_ver0.1.wasm",
  })

  const [hideSplash, setHideSplash] = useState(true);

  const [customX, setCustomX] = useState(0)
  const [customZ, setCustomZ] = useState(0);

  useEffect(() => {
    if(isLoaded) {
      setTimeout(() => {
        setHideSplash(false)
      }, 2000);
    }
  }, [isLoaded])

  const onClickPoiButton = (x, z) => {
    
  }  

  const onClickCustomPositionButton = () => {

  }

  return (
    <div className="container">
      <div className="contents-container">
        <div>
          {hideSplash && <div className="loading-screen">Loading...</div>}
          <Unity
            unityProvider={unityProvider}
            style={{ width: 1200, height: 800 }}
          />
        </div>
        <div className="util-container">
          <h1>Utility</h1>
          <h2>1. 이동</h2>
          <h3>지점</h3>
          <button onClick={() => onClickPoiButton(0, 0)}>x:0 / y:0</button>
          <button onClick={() => onClickPoiButton(2, 3)}>x:2 / y:3</button>
          <h3>직접 지정</h3>
          <div style={{marginTop: '10px', display: 'flex',flexDirection: 'column'}}>
            <label>x</label>
            <input type={'number'}/>
            <label>y</label>
            <input type={'number'}/>
            <button onClick={() => onClickCustomPositionButton()}>move</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
