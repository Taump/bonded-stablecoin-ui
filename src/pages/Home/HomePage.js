import React, { useState } from "react";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";

import { Header } from "./components/Header/Header";
import { Tokens } from "./components/Tokens/Tokens";
import { Reasons } from "./components/Reasons/Reasons";
import { Footer } from "./components/Footer/Footer";
import { BuiltOnObyte } from "./components/BuiltOnObyte/BuiltOnObyte";
import { Liquidity } from "./components/Liquidity/Liquidity";

import styles from "./HomePage.module.css";


export const HomePage = () => {
  const [shownReasons, setShownReasons] = useState(false);
  const [shownLiquidity, setShownLiquidity] = useState(false);
  const [shownBuiltOnObyte, setShownBuiltOnObyte] = useState(false);

  return (
    <div className={styles.container}>
      <Helmet title="Bonded stablecoins" />
      <Header />
      <Tokens />
      <Liquidity onEnterViewport={() => {
        if(!shownLiquidity){
          setShownLiquidity(true);
          ReactGA.event({
            category: "Stablecoin",
            action: "Shown liquidity"
          })
        }
      }} />
      <BuiltOnObyte onEnterViewport={() => {
        if(!shownBuiltOnObyte){
          setShownBuiltOnObyte(true);
          ReactGA.event({
            category: "Stablecoin",
            action: "Shown built on obyte"
          })
        }
      }} />
      <Reasons onEnterViewport={() => {
        if(!shownReasons){
          setShownReasons(true);
          ReactGA.event({
            category: "Stablecoin",
            action: "Shown reasons"
          })
        }
      }} />
      <Footer />
    </div>
  );
};
