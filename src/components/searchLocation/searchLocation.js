import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import './searchLocation.css'
import SearchHotel from '../searchHotel/searchHotel'

let autoComplete;

const loadCustomScript = (url, callbackFunc) => {
    let scriptTag = document.createElement("script");
    scriptTag.type = "text/javascript";
  
    if (scriptTag.readyState) {
      scriptTag.onReadyStateChange = function() {
        if (scriptTag.readyState === "loaded" || scriptTag.readyState === "complete") {
          scriptTag.onReadyStateChange = null;
          callbackFunc();
        }
      };
    } else {
      scriptTag.onload = () => callbackFunc();
    }
  
    scriptTag.src = url;
    document.getElementsByTagName("head")[0].appendChild(scriptTag);
  };
  
let handleScriptLoad=(updateQuery, autoCompleteRef,updateAddressObject) =>{
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "IN" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery,updateAddressObject)
  );
}

let handlePlaceSelect= async(updateQuery,updateAddressObject) =>{
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  updateAddressObject(addressObject.formatted_address);
  console.log(addressObject.formatted_address);
}

function SearchLocation(props) {
  const [query, setQuery] = useState("");
  const [addObj,setAddObj]=useState("");
  const autoCompleteRef = useRef(null);
  let history = useHistory();
  useEffect(() => {
    loadCustomScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACE_API_KEY}&sensor=false&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef,setAddObj)
    );
    
    if(addObj){
      history.push(`/listing/${addObj}`)
    }
  }, [addObj,history]);

  return (
    <>
    <div className="searchLocation">
      <input
      data-testid='input'
        ref={autoCompleteRef}
        onChange={event => {setQuery(event.target.value); if(!event.target.value)setAddObj('')}}
        placeholder="Enter a City"
        value={query}
        autoComplete="on"
      />
    </div>
    {(query.length!==0&&!addObj)&&
     <SearchHotel searchQuery={query} />}
    </>
  );
}

export default SearchLocation;