import { Slot, Stack } from "expo-router";
import { User } from "firebase/auth";
import React from "react";
import { useState } from "react";

type IAuthContext = {
  loggedIn: User | undefined,
  setLoggedIn: React.Dispatch<React.SetStateAction<User | undefined>>,
}
export const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

export default function RootLayout() {
  const [loggedIn, setLoggedIn] = useState<User | undefined>(undefined);
  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
      <Slot />
    </ AuthContext.Provider>
  );
}
