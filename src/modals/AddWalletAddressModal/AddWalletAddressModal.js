import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import obyte from "obyte";
import { addWallet } from "store/actions/settings/addWallet";

export const AddWalletAddressModal = ({ visible, setShowWalletModal }) => {
  const dispatch = useDispatch();
  const addressInput = useRef(null);
  const { t } = useTranslation();
  const [address, setAddress] = useState({
    value: undefined,
    valid: undefined,
  });

  const handleChange = (ev) => {
    const value = ev.target.value;
    if (obyte.utils.isValidAddress(value)) {
      setAddress({ value: value, valid: true });
    } else {
      setAddress({ value: value, valid: false });
    }
  };

  let validateStatus = "";
  if (address.valid === true) {
    validateStatus = "success";
  } else if (address.valid === false) {
    validateStatus = "error";
  } else {
    validateStatus = "";
  }

  const handleCancel = () => {
    setShowWalletModal(false);
    setAddress({ value: undefined, valid: undefined });
  };

  const handleAdd = (address) => {
    if (address) {
      dispatch(addWallet(address));
    }
    handleCancel();
  };

  useEffect(() => {
    if (addressInput.current) {
      addressInput.current.focus();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      title={t("modals.add_wallet.title", "Add Wallet")}
      style={{ zIndex: -1 }}
      onCancel={handleCancel}
      footer={[
        <Button key="close" onClick={handleCancel}>
          {t("modals.common.close", "Close")}
        </Button>,
        <Button
          key="add"
          type="primary"
          disabled={!address.valid}
          onClick={() => handleAdd(address.value)}
        >
          {t("modals.common.add", "Add")}
        </Button>,
      ]}
    >
      <Form size="large">
        <Form.Item hasFeedback={true} validateStatus={validateStatus}>
          <Input
            placeholder={t("modals.add_wallet.wallet_address", "Wallet address")}
            value={address.value}
            onChange={handleChange}
            ref={addressInput}
            autoFocus={true}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                handleAdd(address.value);
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
