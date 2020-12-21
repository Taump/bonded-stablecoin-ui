import React from "react";
import { percentageParams } from "./components/percentageParams";

export const viewParameter = (value, name, isBlock = false) => {
  if (value) {
    if (name === "oracles") {
      const oracles = parseOracle(value.trim());
      return oracles.map((oracle, i) => {
        return <span key={name + '-' + oracle + "-" + i} style={isBlock ? { display: "block" } : { fontSize: 14, wordBreak: "break-all" }}>{oracle.address + " " + oracle.feed_name + " \"" + oracle.op + "\""}</span>;
      })
    } else if (percentageParams.includes(name)) {
      return value * 100 + "%"
    } else {
      return value;
    }
  } else {
    return "-"
  }
}

export const parseOracle = (oracles) => oracles.split(" ").map((info) => ({
  address: info.slice(0, 32),
  op: info.slice(32, 33),
  feed_name: info.slice(33, info.length)
}));