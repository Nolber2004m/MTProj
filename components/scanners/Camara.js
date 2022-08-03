import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Camera, CameraType,takePictureAsync } from 'expo-camera';

export default function Camara({ toastRef, setLoading, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [startOver, setStartOver] = useState(true)
  const [type, setType] = useState(Camera.Constants.Type.back)
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const __closeCamera = () => {
    setStartOver(true)
  }

  const __takePicture = async () => {
   
    const photo = await takePictureAsync()
    
    setPreviewVisible(true)
    setCapturedImage(photo)



  }

  return (
    <View
    style={{
      flex: 1
    }}
  >
    {startOver ? (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          onPress={() => setStartOver(false)}
          style={{
            width: 130,
            borderRadius: 4,
            backgroundColor: '#14274e',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Take picture
          </Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View
        style={{
          flex: 1
        }}
      >
        {previewVisible ? (
          <ImageBackground
            source={{uri: capturedImage && capturedImage.uri}}
            style={{
              flex: 1
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 15,
                justifyContent: 'flex-end'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <TouchableOpacity
                  onPress={() => setPreviewVisible(false)}
                  style={{
                    width: 130,
                    height: 40,

                    alignItems: 'center',
                    borderRadius: 4
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20
                    }}
                  >
                    Re-take
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={__savePhoto}
                  style={{
                    width: 130,
                    height: 40,

                    alignItems: 'center',
                    borderRadius: 4
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20
                    }}
                  >
                    save photo
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        ) : (
          <Camera
            style={{flex: 1}}
            type={type}
            ref={(r) => {
            //  camera = r
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: '5%',
                  right: '5%'
                }}
              >
                <TouchableOpacity onPress={__closeCamera}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20
                    }}
                  >
                    X
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: '5%',
                  left: '5%'
                }}
                onPress={() => {
                  setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
                }}
              >
                <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}> Flip </Text>
              </TouchableOpacity>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  padding: 20,
                  justifyContent: 'space-between'
                }}
              >
                <View
                  style={{
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    onPress={__takePicture}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: '#fff'
                    }}
                  />
                </View>
              </View>
            </View>
          </Camera>
        )}
      </View>
    )}
  </View>
  );
}

const styles = StyleSheet.create({
viewContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
