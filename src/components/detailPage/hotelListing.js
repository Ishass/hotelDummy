import { useParams,NavLink } from 'react-router-dom';
import React, { useContext,useState,useEffect } from "react";
import HotelIcon from '@material-ui/icons/Hotel';
import ListContext from '../../contextStore/listStore';
import  styles from './hotelListing.module.css';

function HotelListing(props) {
    const params = useParams();
    const listFromContext=useContext(ListContext);
  const [displayHotel, setDisplayHotel] = useState([]);
  
  useEffect(() => {
    let searchHotels=()=>{
        let resultant=[];
        let city=params.location&&params.location.split(',')[0].toLowerCase();
        let state=params.location&&params.location.split(',')[1].trim().toLowerCase();
     let searchItem=city+','+state;
            listFromContext.listOfHotels.forEach(item=>{
                let name=item.name.toLowerCase()
                let location=item.location.toLowerCase()
                if(searchItem.indexOf(name)>=0|| searchItem.indexOf(location)>=0){
                    resultant.push(item)
                }
               });
        setDisplayHotel(resultant);
    }
    searchHotels();

  }, [listFromContext.listOfHotels,params]);
  return (
    <div className="" data-testid='render-listing'>
        {displayHotel.length>0?displayHotel.map((item,key)=>{
            return(
                <NavLink key={key} to={`/${item.Id}`}>

                 <div  key={key}  className={styles.displayItems}>
                      <HotelIcon style={{color: '#b7b0b0'}}/>
                <div style={{paddingLeft:'2vh',paddingRight:'2vh'}}>
                      {item.name}
                  </div>
                  
                    <div style={{color:'#b7b0b0'}}>  {item.location}</div>
                
                  </div>
            </NavLink>)
        }):<div style={{fontWeight:'bold'}}>No Hotels Found!</div>}
    </div>
  );
}

export default HotelListing
