import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import UserContextProvider, { UserContext } from "./Contexts/UserContext";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Card from './shared/card'
import Main from './screens/main'

export default function App() {

  return (
    <UserContextProvider>
      <Main/>
    </UserContextProvider>
  );
}
