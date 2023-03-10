import React, { useState, useEffect } from 'react';
import {  Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';


export default function cocktailAccelerometer({ navigation }) {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);


  if (x >= 0.45 && y >= 0.45) {
    console.log("Refresh")
    navigation.replace("Random cocktail", {over18:true})
  }

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(setData)
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
}