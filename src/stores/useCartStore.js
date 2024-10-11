import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// const useCartStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }))

// https://github.com/ksjitendra18/zustand-setup/blob/main/src/store/cart.ts

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addItemToCart: (item) => {
        const itemExists = get().cartItems.find((cartItem) => cartItem.id === item.id);

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }

          set({ cartItems: [...get().cartItems] });
        } else {
          set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
        }
      },

      increaseQuantity: (productId) => {
        const itemExists = get().cartItems.find((cartItem) => cartItem.id === productId);

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }

          set({ cartItems: [...get().cartItems] });
        }
      },
      decreaseQuantity: (productId) => {
        const itemExists = get().cartItems.find((cartItem) => cartItem.id === productId);

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            if (itemExists.quantity === 1) {
              const updatedCartItems = get().cartItems.filter((item) => item.id !== productId);
              set({ cartItems: updatedCartItems });
            } else {
              itemExists.quantity--;
              set({ cartItems: [...get().cartItems] });
            }
          }
        }
      },

      removeItemFromCart: (productId) => {
        const itemExists = get().cartItems.find((cartItem) => cartItem.id === productId);

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            const updatedCartItems = get().cartItems.filter((item) => item.id !== productId);
            set({ cartItems: updatedCartItems });
          }
        }
      },

      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cart-items",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
