```javascript
import * as Camera from 'expo-camera';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        const cameraInfo = await Camera.getCameraInfoAsync(cameraType);
        if (!cameraInfo) {
          setError('No camera found');
        }
      } else {
        setError('Camera permission denied');
      }
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View><Text>Requesting camera access...</Text></View>;
  }
  if (error) {
    return <View><Text>{error}</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} >
        {/* Camera controls here */}
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
export default App;
```