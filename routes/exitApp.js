import React from 'react';
import { BackHandler } from 'react-native';

export default function ExitApp (){
  BackHandler.exitApp();
}