import { IFood } from "../../models/ISingleFood";
import { FavType } from "../types/FavType";

export interface IProAction {
  type: FavType;
  payload: IFood;
}

export function FavReducer(state: IFood[], action: IProAction) {
  switch (action.type) {
    case FavType.FAV_LIST:
      return state;

    case FavType.FAV_ADD:
      return [...state, action.payload];

    case FavType.FAV_REMOVE:
      const index = state.findIndex((item) => item.gid === action.payload.gid);
      state.splice(index, 1);
      return [...state];

    default:
      return state;
  }
}
