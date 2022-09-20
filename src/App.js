import React, { useEffect, useState } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl';
import { io } from 'socket.io-client';
import './App.css'

function App() {
  
  const {unityProvider, isLoaded, sendMessage} = useUnityContext({
    loaderUrl: "Build/build_ver0.5.loader.js",
    dataUrl: "Build/build_ver0.5.data",
    frameworkUrl: "Build/build_ver0.5.framework.js",
    codeUrl: "Build/build_ver0.5.wasm",
  })

  const [hideSplash, setHideSplash] = useState(true);

  const [customX, setCustomX] = useState(0)
  const [customZ, setCustomZ] = useState(0);

  const [logs, setLogs] = useState([]);

  // useEffect(() => {
    // const socket = io("ws://localhost:3000/data");

    // socket.on("connect", () => {
    //   setLogs([...logs, "socket connect"])
    // })
    // socket.on("disconnect", () => {
    //   setLogs([...logs, "socket disconnect"])
    // })
    // socket.on("startRedis", (data) => {
    //   setLogs([...logs, `startRedis : ${JSON.stringify(data)}`])
    // })
    // socket.on("redisToClient", (data) => {
    //   setLogs([...logs, `redisToClient : ${JSON.stringify(data)}`])
    // })
  // }, []);

  useEffect(() => {
    if(isLoaded) {
      setTimeout(() => {
        setHideSplash(false)
      }, 2000);
    }
  }, [isLoaded])

  const handleRobotPosition = (x,z) => {
    sendMessage('Robot', "setDestination" , `${x},${z}`)
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
          <button onClick={() => handleRobotPosition(0, 0)}>x:0 / y:0</button>
          <button onClick={() => handleRobotPosition(0, 10)}>x:0 / y:10</button>
          <h3>직접 지정</h3>
          <div style={{marginTop: '10px', display: 'flex',flexDirection: 'column'}}>
            <label>x</label>
            <input type={'number'} value={customX} onChange={(e) => setCustomX(e.target.value)}/>
            <label>y</label>
            <input type={'number'} value={customZ} onChange={(e) => setCustomZ(e.target.value)}/>
            <button onClick={() => handleRobotPosition(customX, customZ)}>move</button>
          </div>
          <h1>Log</h1>
          <div style={{maxHeight: 300, backgroundColor: 'white', overflowY: 'auto'}}>
            {logs.map((val) => <div>{val}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
