import { Slot, Stack } from "expo-router";
import React from "react";
import { useState } from "react";

type IAuthContext = {
  loggedIn: boolean,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}
export const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

export default function RootLayout() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
      <Slot />
    </ AuthContext.Provider>
  );
}
