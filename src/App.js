import './App.css';
import SearchLocation from './components/searchLocation/searchLocation';
import DetailPage from './components/detailPage/detailPage';
import HotelListing from './components/detailPage/hotelListing';
import {  Route, Switch } from "react-router-dom";
import ListContext from './contextStore/listStore';

const listOfHotels=[
  {name:'FabHotel La Paz Stay',location:'New Delhi',Id:1},
  {name:'FabHotel Rove',location:'New Delhi',Id:2},
  {name:'FabHotel Le Grand',location:'New Delhi',Id:3},
  {name:'FabHotel Vista Suite',location:'Banglore',Id:4},
  {name:'FabHotel Sahar Garden',location:'Mumbai',Id:5},
]
function App(props) {
  return (
      <ListContext.Provider value={{listOfHotels:listOfHotels}}>
    <div className="App">
      <Switch>
      <Route exact path='/'><SearchLocation data-testid="search-location" onChange={() => null}  /></Route>
      <Route exact path='/:id'><DetailPage/></Route>
      <Route exact path='/listing/:location'><HotelListing/></Route>
        </Switch>
    </div>
      </ListContext.Provider>
  );
}

export default App;
