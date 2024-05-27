import React from "react";

import { HomeScreen } from "@/features/pokemons/presentation/screens/home/HomeScreen";
import { PaperProvider } from "react-native-paper";

const PokemonsHome = () => {
  return (
    <PaperProvider>
      <HomeScreen />
    </PaperProvider>
  );
};

export default PokemonsHome;
