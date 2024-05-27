import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
