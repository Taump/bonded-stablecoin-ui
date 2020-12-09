import React, { useEffect } from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import { ExchangeForm } from "./components/ExchangeForm";
import { ExchangeList } from "./components/ExchangeList";
import { ExchangeView } from "./components/ExchangeView";

const { Title, Text } = Typography;

export const BuyPage = () => {
  const { pendingExchanges, exchanges } = useSelector(
    (state) => state.settings
  );
  const current = exchanges.find((p) => p.id === pendingExchanges);
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "Bonded stablecoins - Buy interest tokens";
  }, []);
  return (
    <div>
      <Title level={1}>{t("buy.title","Buy interest tokens")}</Title>
      <Text type="secondary">
        {t("buy.desc", "Buy interest earning tokens (IUSD, IBIT, etc) for any crypto in one easy step.")}
      </Text>
      {pendingExchanges && current ? (
        <ExchangeView current={current} />
      ) : (
        <ExchangeForm />
      )}

      <ExchangeList />
    </div>
  );
};
