import React, { useState, useEffect, useContext} from "react";
import { NavLink } from "react-router-dom";
import HotelIcon from '@material-ui/icons/Hotel';
import  './searchHotel.css';
import ListContext from '../../contextStore/listStore';


function SearchHotel(props) {
  const listFromContext=useContext(ListContext);
  const [displayHotels, setDisplayHotels] = useState([]);
    
 

  useEffect(() => {
    let searchHotels=(searchItem)=>{
        let resultant=[];
        let searchedItem=searchItem.toLowerCase();
     
            listFromContext.listOfHotels.forEach(item=>{
                let name=item.name.toLowerCase()
                let location=item.location.toLowerCase()
                if(name.indexOf(searchedItem)>=0|| location.indexOf(searchedItem)>=0){
                    resultant.push(item)
                }
               });
        setDisplayHotels(resultant);
    }
    searchHotels(props.searchQuery)

  }, [props.searchQuery,listFromContext.listOfHotels]);

let renderHotelDetail=()=>{
    return(
        displayHotels.map((item,index)=>{
            return(
                <NavLink key={index} to={`/${item.Id}`}>
                <div key={index}  className="displayItems">
                      <HotelIcon style={{color: '#b7b0b0'}}/>
                <div style={{paddingLeft:'2vh',paddingRight:'2vh'}}>
                      {item.name}
                  </div>
                  
                    <div style={{color:'#b7b0b0'}}>  {item.location}</div>
                
                  </div>
                </NavLink>
                
            )
        })
        )
}
  return (
    <div className="searchHotel">
    {displayHotels.length>0?
    <>
    <label>Hotels</label>
     {renderHotelDetail()}
     </>:<div style={{fontWeight:'bold'}}>No Hotels Found!</div> 
    }
    </div>
  );
}

export default SearchHotel;
