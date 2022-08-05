import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const items = [...state.items];
      let present = false;
      items.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity += 1;
          present = true;
        }
      });
      if (present) {
        state.items = [...items];
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newItems = [...state.items];
      if (index >= 0) {
        if (newItems[index].quantity > 1) {
          newItems[index].quantity -= 1;
        } else {
          newItems.splice(index, 1);
        }
      } else {
        console.warn(
          `Cannot remove product (id:${action.payload.id}) as it is not in the Basket!`
        );
      }
      state.items = newItems;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export default basketSlice.reducer;
