import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>IAlingo - Capacitação em LLMs para o Judiciário</title>
        <meta
          name="description"
          content="Plataforma de capacitação sobre o uso responsável de Grandes Modelos de Linguagem para profissionais do sistema de justiça"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0A0" />
        <link rel="manifest" href="/app.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
