import { formatCurrency } from "@/utils/format-currency";
import { TransactionDetailsItem } from "../types";

interface TransactionItemCardProps {
  item: TransactionDetailsItem;
}

export default function TransactionItemCard({ item }: TransactionItemCardProps) {
  return (
    <li className="flex items-center gap-3 p-3 border border-neutral-300 rounded-lg">
      <img src={item.image || "/images/menu-placeholder.png"} alt={item.menuName} className="size-[50px] object-cover rounded-full border border-neutral-300" />
      <div className="space-y-1">
        <h6 className="font-semibold">
          {item.menuName} ({item.quantity}x)
        </h6>
        <p className="text-sm text-neutral-500 font-semibold">{formatCurrency(item.price)}</p>
      </div>
      <p className="text-teal-600 font-semibold text-sm ml-auto self-end">{formatCurrency(item.subtotal)}</p>
    </li>
  );
}
