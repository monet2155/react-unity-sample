import React from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl';

function App() {
  
  const {unityProvider} = useUnityContext({
    loaderUrl: "Build/build_ver0.1.loader.js",
    dataUrl: "Build/build_ver0.1.data",
    frameworkUrl: "Build/build_ver0.1.framework.js",
    codeUrl: "Build/build_ver0.1.wasm",
  })


  return (
    <div style={{flex:1, backgroundColor: '#ccc'}}>
      <Unity unityProvider={unityProvider} style={{ width: 1200, height: 800 }} />
    </div>
  );
}

export default App;
