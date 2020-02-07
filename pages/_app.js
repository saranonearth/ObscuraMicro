import App from "next/app";
import Provider from "../components/Provider";
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>ObscurA Micro</title>
        </Head>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default MyApp;
