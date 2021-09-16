import {  Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import './App.css';
import SearchLocation from './components/searchLocation/searchLocation';
import DetailPage from './components/hotelDetail/hotelDetail';
import HotelListing from './components/hotelDetail/hotelListing';
import ListContext from './contextStore/listStore';


function App(props) {
  return (
      <ListContext.Provider value={{listOfHotels:props.listOfHotels}}>
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
const mapStateToProps = (state) => {
  return {
    listOfHotels: state.listOfHotels
  };
}
export default connect(mapStateToProps) (App);
