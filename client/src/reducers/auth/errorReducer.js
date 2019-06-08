import t from "../../actions/auths/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case t.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
