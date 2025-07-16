export interface PortfolioConfig {
  watchId: string;
  userId: string;
  access_token?: string;
  date?: string;
}

export interface HoldingView {
  amount: number;
  holdings: {
    symbol: string;
    amount: number;
    plSpent: number;
    plUnrealized: number;
    shares: number;
  }[];
  plSpent: number;
  plUnrealized: number;
}
