import { CurrencyType } from "@/features/core/types/currency.type";

export class AmountUtils {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static calculateTotal(items: any[], prop?: string) {
    return items.reduce((acc, cur) => (acc += cur[prop ?? "amount"]), 0);
  }

  static round(amount?: number) {
    if (!amount) {
      return 0;
    }

    return Math.round(amount * 100) / 100;
  }

  static formatNumber(amount: number, format?: CurrencyType) {
    if (!format) {
      return AmountUtils.round(amount).toLocaleString("es-PE");
    }

    return AmountUtils.round(amount).toLocaleString("es-PE", {
      style: "currency",
      currency: format,
    });
  }

  static countDigits(value: number) {
    return Math.abs(value).toString().length;
  }
}
