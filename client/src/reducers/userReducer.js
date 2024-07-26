import { FOLLOW_USER, GET_USER, UPLOAD_PICTURE } from "../actions/userActions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: [...state.following, action.payload.idToFollow],
      };

    default:
      return state;
  }
}
