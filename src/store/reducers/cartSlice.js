const initialState = { items: [], showCart: false };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_ITEM":
      const filtered = state.items.filter((item) => {
        return item.id !== action.payload.id;
      });
      return { ...state, items: filtered };
    case "TOGGLE_CART":
      return { ...state, showCart: !state.showCart };
    default:
      return state;
  }
};
