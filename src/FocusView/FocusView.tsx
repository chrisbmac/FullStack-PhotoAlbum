
import "./FocusView.scss";
import {Photo, ViewProps} from "./../tools/Samples.model";
import React, {useState} from 'react';
import ScrollView from "../ScrollImages/ScrollView";

const FocusView = ({photos, visible, setCount}:ViewProps):JSX.Element => {
// This component handles focus button, hides/ shows component
// handles on click of image

//which image is clicked
const imageClick = (n:number) => (e:any):void => {
  setCount(n);
  setPhotoClk(n);
}

const mouseEnter = (e:any):void => {
  console.log("MOUSE HAS ENETERED");
  
}
// which photo was clicked, pass it into scroll view component to change to that photo
const [photoClicked, setPhotoClk] = useState<number>(0);

    return (
      
        <div className="focusImages" style={{display: (visible ? 'flex' : 'none')}}>
         {photos.map((data:Photo,n:number):JSX.Element =>{
           return (

             <button key={n} style={{background:'none', border:'none'}} 
              onMouseEnter={mouseEnter} onClick={imageClick(n)} value={n}>
              <img src={"./Images/" + data.source} alt="asd" className="imageHovers"/>
             </button>

           );
         })}
          <div className="hideElement">
            <ScrollView caption={photos[photoClicked].caption} comments={photos[photoClicked].comments} id={photos[photoClicked].id} title={photos[photoClicked].title} source={photos[photoClicked].source}></ScrollView>
          </div>
        </div>

    );
    
  }
  
  export default FocusView;