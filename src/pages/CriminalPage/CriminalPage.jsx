import React from 'react';

const CriminalPage = (props) => {
    return (
      <div className="CriminalPage">
      <div>{props.perp.name}</div>
      <div>{props.perp.type}</div>
      <div>{props.perp.born}</div>
      <div>{props.perp.death}</div>
      <div>{props.perp.content}</div>
      </div>
    );
  };
  
  export default CriminalPage;