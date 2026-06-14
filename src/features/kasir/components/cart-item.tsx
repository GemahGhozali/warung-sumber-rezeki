import { formatCurrency } from "@/utils/format-currency";
import { CartItemInput } from "@/features/transaction/schemas";
import CartItemQuantityChanger from "./quantity-changer";

interface CardListProps {
  item: CartItemInput;
}

export default function CardList({ item }: CardListProps) {
  return (
    <li className="p-3 bg-white border border-neutral-300 rounded-lg space-y-3">
      <div className="flex items-end gap-4">
        <img src={item.image || "/images/menu-placeholder.png"} alt={item.menuName} className="size-[50px] rounded-lg border border-neutral-300" />
        <div className="space-y-1 mr-auto">
          <h5 className="font-semibold">{item.menuName}</h5>
          <p className="text-sm text-neutral-500 font-semibold">{formatCurrency(item.price)}</p>
        </div>
        <CartItemQuantityChanger item={item} />
      </div>
      <hr className="border-neutral-300" />
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-neutral-500">Subtotal</p>
        <p className="text-sm font-semibold text-teal-600">{formatCurrency(item.price * item.quantity)}</p>
      </div>
    </li>
  );
}
