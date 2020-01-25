import Head from "next/head";

const App = props => {
  return (
    <div>
      <Head>
        <title>ObscurA</title>
      </Head>
      {props.children}
    </div>
  );
};

export default App;
