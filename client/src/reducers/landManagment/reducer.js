import t from '../../actions/landManagment/types';

export default function(
  state = {
    newLand:{},
    landCreated:false
  },
  action
) {
  switch (action.type) {

    case  t.CREATE_LAND:
      if (action.payload) {
        state.newLand = action.payload;
        state.landCreated = action.payload.landCreated;
      }
      return { ...state };

    case t.GET_ALL_LANDS:
      if(action.payload){
          state.lands = action.payload;
          state.landCreated = false;
      }
      return {...state};

    case t.GET_LANDS_BY_USER:
      if(action.payload){
          state.lands = action.payload;
          state.landCreated = false;
      }
      return {...state};
    case t.TRANSFER_LAND:

      return {...state};
    default:
      return state;
  }
}
