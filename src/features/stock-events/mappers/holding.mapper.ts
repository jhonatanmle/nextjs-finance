import { Option } from "@/features/core/types/option.type";
import { Portfolio } from "@/features/investments/investments.types";
import { HoldingViewGetResponse } from "@/features/stock-events/interfaces/stock-event-service.interfaces";
import { Holding } from "@/features/stock-events/stock-events.schemas";
import { AmountUtils } from "@/shared/lib/amount";

const mapFrom = (response: HoldingViewGetResponse): Portfolio => {
  if (!response?.data?.holdingsView?.holdings) {
    return {
      amount: 0,
      holdings: [],
      plSpent: 0,
      plUnrealized: 0,
    };
  }

  return {
    amount: AmountUtils.round(response.data.holdingsView.marketValue),
    plSpent: AmountUtils.round(response.data.holdingsView.plSpent),
    plUnrealized: AmountUtils.round(response.data.holdingsView.plUnrealized),
    holdings: response.data.holdingsView.holdings
      .map<Holding>((item) => ({
        amount: AmountUtils.round(item.marketValue),
        symbol: item.symbol,
        plSpent: AmountUtils.round(item.plSpent),
        plUnrealized: AmountUtils.round(item.plUnrealized),
        shares: AmountUtils.round(item.shares),
      }))
      .filter((item) => item.symbol !== "CASH_USD")
      .sort((a, b) => b.amount - a.amount),
  };
};

const mapOptionsFrom = (response: HoldingViewGetResponse): Option[] => {
  if (!response?.data?.holdingsView?.holdings) {
    return [];
  }

  return response.data.holdingsView.holdings.map((item) => ({
    value: item.symbol,
    label: item.symbol,
  }));
};

export const holdingMapper = {
  mapFrom,
  mapOptionsFrom,
};
