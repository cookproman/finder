import React from "react";
import s from "./Msg.module.scss";
import Coin from "../components/Coin";
import {
  sliceMsgType,
  isTerraAddress,
  isValidatorAddress
} from "../scripts/utility";
import format from "../scripts/format";
import Finder from "./Finder";
import { isArray } from "lodash";

export default (msg: Msg, index: number) => {
  return (
    <div className={s.msgBox} key={index}>
      <div className={s.type}>{sliceMsgType(msg.type)}</div>

      {Object.keys(msg.value).map(key => {
        if (isTerraAddress(msg.value[key])) {
          return (
            <p key={key + JSON.stringify(msg.value[key])}>
              <span>{key}</span>
              <Finder q="account" v={msg.value[key]}>
                {msg.value[key]}
              </Finder>
            </p>
          );
        } else if (isValidatorAddress(msg.value[key])) {
          return (
            <p key={key + JSON.stringify(msg.value[key])}>
              <span>{key}</span>
              <Finder q="validator" v={msg.value[key]}>
                {msg.value[key]}
              </Finder>
            </p>
          );
        } else if (key === "amount" || key === "offer_coin") {
          return (
            <p key={key + JSON.stringify(msg.value[key])}>
              <span>{key}</span>
              <span>
                {Array.isArray(msg.value[key]) ? (
                  msg.value[key].map((a: Coin) => <Coin key={a.denom} {...a} />)
                ) : (
                  <Coin {...msg.value[key]} />
                )}
              </span>
            </p>
          );
        } else if (key === "ask_denom" || key === "denom") {
          return (
            <p key={key + JSON.stringify(msg.value[key])}>
              <span>{key}</span>
              <span>{format.denom(msg.value[key])}</span>
            </p>
          );
        } else {
          return (
            <p key={key + JSON.stringify(msg.value[key])}>
              <span>{key}</span>
              {isArray(msg.value[key]) ? (
                <div>
                  {msg.value[key].map((j: any) => (
                    <p>{`${JSON.stringify(j, undefined, 2)}`}</p>
                  ))}
                </div>
              ) : (
                <span>{JSON.stringify(msg.value[key])}</span>
              )}
            </p>
          );
        }
      })}
    </div>
  );
};
