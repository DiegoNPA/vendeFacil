import React, { useContext, useState } from 'react';
import SignIn from './signIn';
import Navigator from '../routes/drawer'
import UserContextProvider, { UserContext } from "../Contexts/UserContext";


const Main = () =>{
  const {user} = useContext(UserContext);
  if(Object.keys(user).length > 0){
    return (
      <Navigator/>
      )
    }else{
      return(
        <SignIn/>
    )

  }
}

export default Main;