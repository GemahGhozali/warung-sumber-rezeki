import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItemInput } from "./schemas";

interface CartState {
  cart: CartItemInput[];
  addToCart: (menu: Omit<CartItemInput, "id" | "menuId" | "quantity" | "isCustom"> & { id: string }) => void;
  addCustomItem: (item: Omit<CartItemInput, "id" | "isCustom" | "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getCartItemByMenuId: (menuId: string) => CartItemInput | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (menu) =>
        set((state) => {
          const itemExist = state.cart.find((item) => item.menuId === menu.id && !item.isCustom);

          if (itemExist) {
            return {
              cart: state.cart.map((item) => (item.menuId === menu.id && !item.isCustom ? { ...item, quantity: item.quantity + 1 } : item)),
            };
          }

          const newItem: CartItemInput = { ...menu, id: menu.id, menuId: menu.id, quantity: 1, isCustom: false };

          return { cart: [...state.cart, newItem] };
        }),

      addCustomItem: (customItem) =>
        set((state) => {
          const uniqueId = `custom-${Date.now()}`;
          const newItem: CartItemInput = {
            id: uniqueId,
            ...customItem,
            menuId: null,
            quantity: 1,
            isCustom: true,
          };

          return { cart: [...state.cart, newItem] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter((item) => item.id !== id),
            };
          }

          return {
            cart: state.cart.map((item) => (item.id === id ? { ...item, quantity: quantity } : item)),
          };
        }),

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getCartItemByMenuId: (menuId) => {
        return get().cart.find((item) => item.menuId === menuId && !item.isCustom);
      },
    }),
    {
      name: "shopping-cart",
      skipHydration: true,
    },
  ),
);
