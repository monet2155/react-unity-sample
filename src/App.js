import React, { useEffect, useState } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl';

function App() {
  
  const {unityProvider, isLoaded} = useUnityContext({
    loaderUrl: "Build/build_ver0.1.loader.js",
    dataUrl: "Build/build_ver0.1.data",
    frameworkUrl: "Build/build_ver0.1.framework.js",
    codeUrl: "Build/build_ver0.1.wasm",
  })

  const [hideSplash, setHideSplash] = useState(true);

  useEffect(() => {
    if(isLoaded) {
      setTimeout(() => {
        setHideSplash(false)
      }, 2000);
    }
  }, [isLoaded])
  

  return (
    <div style={{ flex: 1, backgroundColor: "#ccc" }}>
      {hideSplash && (
        <div
          style={{
            backgroundColor: "black",
            width: 1200,
            height: "800px",
            position: "absolute",
            color: "white",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading...
        </div>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{ width: 1200, height: 800 }}
      />
    </div>
  );
}

export default App;
