import { StatusBar } from "expo-status-bar";
import React from "react";
import { TestChart } from "./src/TestChart";


export default function App() {
  return (
    <>
      <TestChart />
      <StatusBar style="auto" />
    </>
  );
}
