import React, { useContext, useState } from 'react';
import SignIn from './signIn';
import Navigator from '../routes/drawer';
import NavigatorSeller from '../routes/drawerForSeller';
import UserContextProvider, { UserContext } from "../Contexts/UserContext";


const Main = () =>{

  const {user} = useContext(UserContext);
  
  if(Object.keys(user).length > 0){
    if(user.type === 'client'){
      return (
        <Navigator/>
        )
    }else{
      return (
        <NavigatorSeller />
      )
    }
  }else{
    return(
      <SignIn/>
    )

  }
}

export default Main;