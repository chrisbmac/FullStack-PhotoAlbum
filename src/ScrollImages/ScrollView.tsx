import React from 'react';
import "./ScrollView.scss";
import {PhotosData, Photo, Comments} from "../tools/Samples.model";
import Image from 'react-bootstrap/Image';

const ScrollView = ({caption, comments, id, source, title }:Photo):JSX.Element => {
// This component is the main display for images, handles which is image and data
// is displayed from next prev and focus on click buttons  
    return (
      <div>
      <div id="nextPrev_Images" className="main__NextPrevImgDis">
      <div id="scrollImages" className="main__oneImage">

        <img src={"./Images/"+source }  alt="sf" className="main__image"/>
        <p id="imgTitle" className="main__imgTitle">{title}</p>
        <p id="imgDescription" className="main__imgDesc">{caption}</p>
            
        <div id="commentDisplay" className="main__comments">
          {comments.map((data:Comments,n:number):JSX.Element =>{
            return (
              <div key={n}>
                <div className="seperator"></div>
                <p>{n + 1}</p>
                <br></br> 
                <div>Author: {data.author}</div>
                <p>Comment:<br></br><br></br>  {data.comment}</p>
              </div>
            );
            })}
        </div>
      </div>  
    </div>
  </div>
    );
  }
  
  export default ScrollView;