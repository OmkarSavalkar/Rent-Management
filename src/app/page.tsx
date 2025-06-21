"use client";
import Login from "./auth/login/page";
import { SnackbarProvider } from "notistack";

export default function Home() {
  return (
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <div>
        <Login />
      </div>
    </SnackbarProvider>
  );
}
