import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <CookiesProvider>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <AuthProvider>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                theme="colored"
                pauseOnHover
                />
              <Component {...pageProps} />
            </AuthProvider>
          </PersistGate>
        </Provider> 
      </SessionProvider>
    </CookiesProvider>
  )
}
