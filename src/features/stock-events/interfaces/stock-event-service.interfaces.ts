export interface HoldingViewGetResponse {
  data: HoldingViewDataResponse;
}

export interface HoldingViewDataResponse {
  holdingsView: HoldingViewResponse;
}

interface HoldingViewResponse {
  cash: number;
  currency: string;
  marketValue: number;
  holdings: HoldingResponse[];
  plSpent: number;
  plUnrealized: number;
}

interface HoldingResponse {
  symbol: string;
  marketValue: number;
  plSpent: number;
  plUnrealized: number;
  shares: number;
}
