import http from "services/http";

import { LOAD_PREV_TRANSACTIONS } from "store/types";

export const getPrevTransactionsForBot = () => async (dispatch, getState) => {

  try {
    const store = getState();
    const { active: { address, deposit_aa, governance_aa, stable_aa, fund_state, bonded_state: { decision_engine_aa } } } = store;

    if (!address) {
      return setTimeout(() => {
        dispatch(getPrevTransactionsForBot());
      }, 500);
    };

    const curveResponses = await http.getAaResponses(address);

    const depositOrStableResponses = await http.getAaResponses(stable_aa || deposit_aa);

    const governanceResponses = await http.getAaResponses(governance_aa);

    let deResponses = [];

    if (decision_engine_aa) {
      deResponses = await http.getAaResponses(decision_engine_aa);
    }

    const curveGetTransactions = curveResponses.map((t) => {
      const unitInfo = http.getJoint(t.trigger_unit).then((info) => {
        const { joint: { unit } } = info;
        return {
          trigger_unit: t.trigger_unit,
          unit,
          bounced: t.bounced,
          trigger_address: t.trigger_address,
          objResponseUnit: t.objResponseUnit
        }
      });

      return unitInfo;
    });

    const depositOrStableGetTransactions = depositOrStableResponses.map((t) => {
      const unitInfo = http.getJoint(t.trigger_unit).then((info) => {
        const { joint: { unit } } = info;
        return {
          trigger_unit: t.trigger_unit,
          unit,
          bounced: t.bounced,
          trigger_address: t.trigger_address,
          objResponseUnit: t.objResponseUnit
        }
      });
      return unitInfo;
    });

    const governanceGetTransactions = governanceResponses.map((t) => {
      const unitInfo = http.getJoint(t.trigger_unit).then((info) => {
        const { joint: { unit } } = info;
        return {
          trigger_unit: t.trigger_unit,
          unit,
          bounced: t.bounced,
          trigger_address: t.trigger_address,
          objResponseUnit: t.objResponseUnit
        }
      });
      return unitInfo;
    });

    const deGetTransactions = deResponses.map((t) => {
      const unitInfo = http.getJoint(t.trigger_unit).then((info) => {
        const { joint: { unit } } = info;
        return {
          trigger_unit: t.trigger_unit,
          unit,
          bounced: t.bounced,
          trigger_address: t.trigger_address,
          objResponseUnit: t.objResponseUnit
        }
      }).then(async (data) => {
        let isRedeem;
        const messages = data.unit.messages;
        for (const message of messages) {
          if (message.app === "payment" && "asset" in message.payload) {
            const assetInPayload = message.payload.asset;
            if (assetInPayload === fund_state.shares_asset) {
              isRedeem = true;
            }
          }
        }

        if (isRedeem) {
          const chain = await http.getAaResponseChain(data.unit.unit);

          return { ...data, chain }
        } else {
          return data
        }
      })
      return unitInfo;
    });

    const curveUnits = {};
    const depositOrStableUnits = {};
    const governanceUnits = {};
    const deUnits = {};

    const curveTransactions = await Promise.all(curveGetTransactions);
    const depositOrStableTransactions = await Promise.all(depositOrStableGetTransactions);
    const governanceTransactions = await Promise.all(governanceGetTransactions);
    const deTransactions = await Promise.all(deGetTransactions);

    curveTransactions.forEach(({ trigger_unit, unit, bounced, trigger_address, objResponseUnit }) => {
      curveUnits[unit.unit] = { ...unit, trigger_unit, bounced, isStable: true, trigger_address, objResponseUnit: objResponseUnit || {} };
    });

    depositOrStableTransactions.forEach(({ trigger_unit, unit, bounced, trigger_address, objResponseUnit }) => {
      depositOrStableUnits[unit.unit] = { ...unit, trigger_unit, bounced, isStable: true, trigger_address, objResponseUnit: objResponseUnit || {} };
    });

    governanceTransactions.forEach(({ trigger_unit, unit, bounced, trigger_address, objResponseUnit }) => {
      governanceUnits[unit.unit] = { ...unit, trigger_unit, bounced, isStable: true, trigger_address, objResponseUnit: objResponseUnit || {} };
    });

    deTransactions.forEach(({ trigger_unit, unit, bounced, trigger_address, objResponseUnit, next, ...other }) => {
      deUnits[unit.unit] = { ...unit, trigger_unit, bounced, isStable: true, trigger_address, objResponseUnit: objResponseUnit || {}, other };
    });

    dispatch({
      type: LOAD_PREV_TRANSACTIONS,
      payload: { curveUnits, depositOrStableUnits, governanceUnits, deUnits }
    })
  } catch (e) {
    console.error("getPrevTransactionsForBot error", e);
  }
}
