import Geolocation from 'react-native-geolocation-service';

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        // resolve({ latitude, longitude });
        resolve({ latitude: -34.405826, longitude: 150.881470 });
      },
      error => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  });
};
