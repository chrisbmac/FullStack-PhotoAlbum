import React from 'react';
import "./FocusView.scss";
import {Photo, ViewProps} from "./../tools/Samples.model";
const FocusView = ({photos}:ViewProps):JSX.Element => {

  
    return (
      <div className="App">
        
        <div className="focusImages">
         {photos.map((data:Photo,n:number):JSX.Element =>{
           return (
           <div key={n}>
             
             <img src={"./Images/" + data.source} alt="asd" className="imageHover"/>
             
           </div>
           );
         })}
        </div>
      </div>
    );
  }
  
  export default FocusView;