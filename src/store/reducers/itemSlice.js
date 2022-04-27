import { getItems } from "../../services/itemsService";

const initialState = {
  items: [],
  filteredItems: [],
  searchTerm: "",
  status: "IDLE",
  showStock: false,
  error: null,
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ITEMS_STARTED":
      return {
        ...state,
        status: "LOADING",
      };
    case "FETCH_ITEMS_SUCCEDED":
      return {
        ...state,
        filteredItems: action.payload,
        items: action.payload,
        status: "SUCCEDED",
      };
    case "FETCH_ITEMS_FAILED":
      return {
        ...state,
        status: "FAILED",
        error:action.payload
      };
    case "FILTER_ITEMS":
      const result = state.items.filter((item) => {
        if (state.showStock) {
          return (
            item.name.toUpperCase().includes(state.searchTerm.toUpperCase()) &&
            item.stocked === state.showStock
          );
        } else {
          return item.name
            .toUpperCase()
            .includes(state.searchTerm.toUpperCase());
        }
      });
      return {
        ...state,
        filteredItems: result,
      };
    case "NEW_ITEM":
      const newProduct = {
        ...action.payload,
        stocked: true,
        id: state.items.length + 1,
      };
      const newItemList = [...state.items, newProduct];
      return {
        ...state,
        items: newItemList,
        filteredItems: newItemList,
      };
    case "TOGGLE_STOCK":
      return {
        ...state,
        showStock: !state.showStock,
      };
    case "SET_SEARCH_TEARM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function fetchItems() {
  return async (dispatch) => {
    dispatch({ type: "FETCH_ITEMS_STARTED" });
    await timeout(2000);
    try {
      const response = await getItems();
      dispatch({ type: "FETCH_ITEMS_SUCCEDED", payload: response });
    } catch (err) {
      dispatch({ type: "FETCH_ITEMS_FAILED", payload: err });
    }
  };
}
