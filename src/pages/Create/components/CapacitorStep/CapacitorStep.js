import React, { useState } from "react";
import { Form, Input, Row, Col, Button } from "antd";

import { validator } from "utils/validators";
import { getStatusValid } from "utils/getStatusValid";
import { Label } from "components/Label/Label";

import styles from "../../CreatePage.module.css";
import { paramsDescription } from "pages/Create/paramsDescription";

const { useForm } = Form;
const initialValues = {
  fee_multiplier: 2,
  moved_capacity_share: 0.1,
  threshold_distance: 0.02,
  move_capacity_timeout: 2 * 3600,
  slow_capacity_share: 0.5,
};

export const CapacitorStep = ({ setCurrent, setData }) => {
  const [form] = useForm();
  const [validFields, setValidFields] = useState({
    fee_multiplier: true,
    moved_capacity_share: true,
    threshold_distance: true,
    move_capacity_timeout: true,
    slow_capacity_share: true,
  });
  const nextIsActive =
    validFields.fee_multiplier &&
    validFields.moved_capacity_share &&
    validFields.threshold_distance &&
    validFields.move_capacity_timeout &&
    validFields.slow_capacity_share;

  const validateValue = ({
    name,
    value,
    type,
    maxValue,
    minValue,
    isInteger,
  }) =>
    validator({
      value,
      type,
      maxValue,
      minValue,
      isInteger,
      onSuccess: () => setValidFields((v) => ({ ...v, [name]: true })),
      onError: () => setValidFields((v) => ({ ...v, [name]: false })),
    });
  return (
    <Form
      size="large"
      layout="vertical"
      form={form}
      initialValues={initialValues}
      className={styles.form}
    >
      <Row>
        <Col sm={{ span: 24 }} xs={{ span: 24 }} md={{ span: 7 }}>
          <Form.Item
            hasFeedback
            validateStatus={getStatusValid(validFields.fee_multiplier)}
            name="fee_multiplier"
            rules={[
              {
                validator: (rule, value) =>
                  validateValue({
                    name: "fee_multiplier",
                    value,
                    type: "number",
                    minValue: 0,
                  }),
              },
            ]}
            label={
              <Label
                required
                label="Fee multiplier"
                descr={paramsDescription.fee_multiplier}
              />
            }
          >
            <Input
              placeholder="Fee multiplier"
              style={{ width: "100%" }}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
        <Col sm={{ span: 24 }} xs={{ span: 24 }} md={{ span: 8, offset: 1 }}>
          <Form.Item
            hasFeedback
            validateStatus={getStatusValid(validFields.moved_capacity_share)}
            name="moved_capacity_share"
            rules={[
              {
                validator: (rule, value) =>
                  validateValue({
                    name: "moved_capacity_share",
                    value,
                    type: "number",
                    minValue: 0,
                  }),
              },
            ]}
            label={
              <Label
                required
                label="Moved capacity share"
                descr={paramsDescription.moved_capacity_share}
              />
            }
          >
            <Input placeholder="Moved capacity share" autoComplete="off" />
          </Form.Item>
        </Col>
        <Col sm={{ span: 24 }} xs={{ span: 24 }} md={{ span: 7, offset: 1 }}>
          <Form.Item
            hasFeedback
            validateStatus={getStatusValid(validFields.threshold_distance)}
            name="threshold_distance"
            rules={[
              {
                validator: (rule, value) =>
                  validateValue({
                    name: "threshold_distance",
                    value,
                    type: "number",
                    minValue: 0,
                  }),
              },
            ]}
            label={
              <Label
                required
                label="Threshold distance"
                descr={paramsDescription.threshold_distance}
              />
            }
          >
            <Input
              placeholder="Threshold distance"
              style={{ width: "100%" }}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col ssm={{ span: 24 }} xs={{ span: 24 }} md={{ span: 7 }}>
          <Form.Item
            hasFeedback
            validateStatus={getStatusValid(validFields.move_capacity_timeout)}
            name="move_capacity_timeout"
            rules={[
              {
                validator: (rule, value) =>
                  validateValue({
                    name: "move_capacity_timeout",
                    value,
                    type: "number",
                    isInteger: true,
                    minValue: 0,
                  }),
              },
            ]}
            label={
              <Label
                required
                label="Move capacity timeout"
                descr={paramsDescription.move_capacity_timeout}
              />
            }
          >
            <Input
              placeholder="Move capacity timeout"
              style={{ width: "100%" }}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
        <Col sm={{ span: 24 }} xs={{ span: 24 }} md={{ span: 8, offset: 1 }}>
          <Form.Item
            hasFeedback
            validateStatus={getStatusValid(validFields.slow_capacity_share)}
            name="slow_capacity_share"
            rules={[
              {
                validator: (rule, value) =>
                  validateValue({
                    name: "slow_capacity_share",
                    value,
                    type: "number",
                  }),
              },
            ]}
            label={
              <Label
                required
                label="Slow capacity share"
                descr={paramsDescription.slow_capacity_share}
              />
            }
          >
            <Input placeholder="Slow capacity share" autoComplete="off" />
          </Form.Item>
        </Col>
      </Row>
      <Button
        disabled={!nextIsActive}
        onClick={() => {
          setData((d) => ({ ...d, ...form.getFieldsValue() }));
          setCurrent((c) => c + 1);
        }}
      >
        Next
      </Button>
    </Form>
  );
};
