import React from 'react';
import "./FavPerp.css"

const FavPerp = ({perp}) => {
    return (
      <div className="FavPerp">
      <h6>My Favorite Crime:</h6>
      <img className="FavoriteCrimeImg" src={perp.img} alt="MyFavCrime"/>
      <h4>{perp.name}</h4>
      <p>{perp.type}</p>
      <p>{perp.content}</p>
      </div>
    );
  };
  
  export default FavPerp;