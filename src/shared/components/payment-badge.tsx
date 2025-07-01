import { PaymentType } from "@/features/core/types/payment-type";
import { Badge } from "@/shared/components/ui/badge";

type Props = {
  type: PaymentType;
};

const PaymentBagde = ({ type }: Props) => {
  const getVariant = () => {
    switch (type) {
      case PaymentType.debit:
        return "blue";
      case PaymentType.credit:
        return "secondary";
      case PaymentType.cash:
        return "success";
      default:
        return "default";
    }
  };

  return <Badge variant={getVariant()}>{type}</Badge>;
};

export default PaymentBagde;
