import React from "react";
import { Select } from "antd";
import Flag from 'react-world-flags';
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "store/actions/settings/changeLanguage";
import { useLocation } from "react-router-dom";
import historyInstance from "historyInstance";
export const langs = [
  {
    name: "en",
    flag: "usa"
  },
  {
    name: "ru",
    flag: "ru"
  }
];
export const SelectLanguage = () => {
  const { lang } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const urlWithoutLang = langs.find((lang) => lang.name.includes(pathname.split("/")[1])) ? pathname.slice(pathname.split("/")[1].length + 1) : pathname;
  
  return (
    <Select style={{ width: "100%" }} dropdownStyle={{ margin: 20 }} bordered={false} value={lang || "en"} size="large" onChange={(value) => {
      dispatch(changeLanguage(value));
      historyInstance.replace((lang && value !== "en" ? "/" + value : "") + (urlWithoutLang !== "/" ? urlWithoutLang : ""))
    }}>
      {langs.map((lang) => <Select.Option style={{ paddingLeft: 20, paddingRight: 20 }} value={lang.name}><div><Flag code={lang.flag} style={{ border: "1px solid #ddd" }} width="30" /></div></Select.Option>)}
    </Select>
  )
}