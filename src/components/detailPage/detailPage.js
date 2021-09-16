import { useParams } from 'react-router-dom';
import React, { useContext,useState,useEffect } from "react";
import ListContext from '../../contextStore/listStore';

function DetailPage(props) {
    const params = useParams();
    const listFromContext=useContext(ListContext);
  const [displayHotel, setDisplayHotel] = useState({});

  
  useEffect(() => {
    let getHotelsDetail=()=>{
        let resultant;
        if(params){

            listFromContext.listOfHotels.forEach(item=>{
                if(item.Id===Number(params.id)){
                 resultant=item;
                }
            });
        }
        setDisplayHotel(resultant);
    }
    getHotelsDetail();

  }, [listFromContext.listOfHotels,params]);
  return (
    <div data-testid='render-detail'>
     {displayHotel&&displayHotel.name}
     <br/>
     {displayHotel&&displayHotel.location}
    </div>
  );
}

export default DetailPage
