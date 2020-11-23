import React from "react";
import { Link } from "react-router-dom";
import handleViewport from 'react-in-viewport';

import dagIllustration from "./img/dag.svg";
import styles from "./BuiltOnObyte.module.css";

export const BuiltOnObyteNotTracking = ({forwardedRef}) => {
  return (
    <div>
      <div className={styles.title}>Built on Obyte</div>
      <div className={styles.dag}>
        <div className={styles.illustration}>
          <img alt="DAG" src={dagIllustration} />
        </div>
        <div className={styles.info} ref={forwardedRef}>
          <p>
            All these coins are issued on <a target="_blank" rel="noopener" href="https://obyte.org/">Obyte</a> &mdash; one of the first DAG based crypto networks live since 2016.
            Obyte is the first DAG to <a target="_blank" rel="noopener" href="https://medium.com/obyte/decentralization/home">fully decentralize</a> and the first DAG to support dapps, DeFi in particular.
          </p>
          <p>
            Obyte team has developed several unique products such as <a target="_blank" rel="noopener" href="https://obyte.org/platform/textcoins">textcoins</a> (which allow sending cryptocurrency to email), <a target="_blank" rel="noopener" href="https://obyte.org/platform/identity">self-sovereign identity</a>, untraceable currency <a target="_blank" rel="noopener" href="https://obyte.org/platform/blackbytes">blackbytes</a>, and many others.
            Bonded Stablecoins were also developed by the Obyte team and are a completely new kind of stablecoins that are based on bonding curves &mdash; see <Link to="/how-it-works">how it works</Link>.
          </p>
          <p>
            By using a DAG rather than blockchain, Bonded Stablecoins avoid the blockchain issues such as front-running attacks: both front-running by miners and front-running by users bribing miners with fees &mdash; there are simply no miners or other intermediaries in a DAG.
          </p>
        </div>
      </div>
    </div>
  );
}

export const BuiltOnObyte = handleViewport(BuiltOnObyteNotTracking);