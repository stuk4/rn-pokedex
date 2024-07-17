import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";

import { ThemeContextProvider } from "../features/shared/presentation/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <RootLayoutWrapper />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}

function RootLayoutWrapper() {
  return (
    <>
      <StatusBar />
      <Stack screenOptions={{}}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(pokemons)/home"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(pokemons)/pokemon/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
