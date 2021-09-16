import { GET_LIST} from './action';
const initialState = {
  listOfHotels: [
    {name:'FabHotel La Paz Stay',location:'New Delhi',Id:1},
    {name:'FabHotel Rove',location:'New Delhi',Id:2},
    {name:'FabHotel Le Grand',location:'New Delhi',Id:3},
    {name:'FabHotel Vista Suite',location:'Banglore',Id:4},
    {name:'FabHotel Sahar Garden',location:'Mumbai',Id:5},
  ]
};
function reducer(state = initialState, action) {
switch(action.type) {
  case GET_LIST:
    return {
        listOfHotels: state.listOfHotels
    };
  default:
    return state;
  }
}
export default reducer;