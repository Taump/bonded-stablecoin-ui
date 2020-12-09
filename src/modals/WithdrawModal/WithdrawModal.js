import React, { useState, useRef, useEffect } from "react";
import { Modal, Space, Button, Form, Input } from "antd";
import { useTranslation } from 'react-i18next';

import { redirect } from "utils/redirect";
import { generateLink } from "utils/generateLink";

export const WithdrawModal = ({
  visible,
  setVisible,
  max,
  symbol,
  asset,
  governance_aa,
  activeWallet,
  decimals,
}) => {
  const amountInput = useRef();
  const { t } = useTranslation();
  const [amount, setAmount] = useState({
    value: undefined,
    valid: false,
  });

  useEffect(() => {
    if (amountInput.current) {
      amountInput.current.focus();
    }
  }, [visible]);

  const handleChangeAmount = (ev) => {
    const value = ev.target.value;
    const reg = /^[0-9.]+$/;

    if (value === "" || value === "0") {
      setAmount({ value, valid: false });
    } else {
      if (
        (~(value + "").indexOf(".") ? (value + "").split(".")[1].length : 0) <=
        decimals
      ) {
        if (reg.test(String(value))) {
          setAmount({ value, valid: true });
        } else {
          setAmount({ value, valid: false });
        }
      }
    }
  };

  const link = generateLink(
    1e4,
    {
      withdraw: 1,
      amount:
        amount.value !== "" && amount.value !== undefined
          ? amount.value * 10 ** decimals
          : undefined,
    },
    activeWallet,
    governance_aa
  );

  const onCancel = () => {
    setVisible(false);
    setAmount({
      value: undefined,
      valid: false,
    });
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={t("modals.withdraw.title", "Withdraw support")}
      footer={
        <Space>
          <Button key="Cancel" onClick={onCancel}>
            {t("modals.common.close", "Close")}
          </Button>
          <Button
            key="submit"
            type="primary"
            href={link}
            disabled={
              (amount.value !== "" &&
                amount.value !== undefined &&
                amount.valid === false) ||
              Number(amount.value) > max
            }
            onClick={() =>
              setTimeout(() => {
                onCancel();
              }, 100)
            }
          >
            {t("modals.withdraw.withdraw", "Withdraw")}
          </Button>
        </Space>
      }
    >
      <Form size="large">
        <Form.Item extra={t("modals.withdraw.amount_info", "Leave empty if you want to withdraw the entire amount")}>
          <Input
            placeholder={t("modals.withdraw.amount_placeholder", "Amount withdraw (Max: {{max}})", {max})}
            autoComplete="off"
            autoFocus={true}
            onChange={handleChangeAmount}
            ref={amountInput}
            value={amount.value}
            suffix={symbol || asset.slice(0, 4)}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                if (
                  !(
                    (amount.value !== "" &&
                      amount.value !== undefined &&
                      amount.valid === false) ||
                    Number(amount.value) > max
                  )
                ) {
                  redirect(link);
                  setTimeout(() => {
                    onCancel();
                  }, 100);
                }
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
