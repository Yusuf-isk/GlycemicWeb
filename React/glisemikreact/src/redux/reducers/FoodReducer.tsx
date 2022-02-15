import { IFood } from "../../models/ISingleFood";
import { FoodType } from "../types/FoodType";

export interface IProAction {
  type: FoodType;
  payload: IFood;
}

export function FoodReducer(state: IFood[], action: IProAction) {
  switch (action.type) {
    case FoodType.FOOD_LIST:
      return state;

    case FoodType.FOOD_ADD:
      return [...state, action.payload];

    case FoodType.FOOD_DELETE:
      const index = state.findIndex((item) => item.gid === action.payload.gid);
      state.splice(index, 1);
      return [...state];

    case FoodType.FOOD_UPDATE:
      const uIndex = state.findIndex((item) => item.gid === action.payload.gid);
      state[uIndex] = action.payload;
      return [...state];

    default:
      return state;
  }
}
