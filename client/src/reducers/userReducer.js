import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_USER,
  UPLOAD_PICTURE,
} from "../actions/userActions";

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
        following: [action.payload.idToFollow, ...state.user.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.user.following.filter(
          (id) => id != action.payload.idToUnFollow
        ),
      };

    default:
      return state;
  }
}
