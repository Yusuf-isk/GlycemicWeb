import { combineReducers, createStore } from "redux";
import { FoodReducer } from "../reducers/FoodReducer";
import { FavReducer } from "../reducers/FavReducer";

const combine = combineReducers({
  FoodReducer,
  FavReducer,
});

export type StateType = ReturnType<typeof combine>;

export const store = createStore(combine);
