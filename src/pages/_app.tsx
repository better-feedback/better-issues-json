import type { AppProps } from "next/app";
import "../index.css";

function MyApp({ Component, pageProps }: AppProps) {
  // <Provider session={pageProps.session}>    
    return <Component {...pageProps} />
  // </Provider>
}

export default MyApp;
