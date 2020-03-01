import App from "next/app";
import Provider from "../components/Provider";
import Head from "next/head";
import './style.css';
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>ObscurA Micro</title>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900i&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default MyApp;
