import { cache } from "react";
import stockEventsApi from "./stock-events.api";
import type { PortfolioConfig } from "./stock-events.types";

export const getUserWallet = cache(
  async (): Promise<PortfolioConfig | null> => {
    return await stockEventsApi.getUserWallet();
  }
);