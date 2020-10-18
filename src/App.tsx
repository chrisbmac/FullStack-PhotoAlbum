import React from 'react';
import logo from './logo.svg';
import './App.scss';
import './Buttons.scss';
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import { getJSONData } from "./tools/Toolkit";
import {PhotosData, Photo} from "./tools/Samples.model";
import CommentView from "./CommentView/CommentView";
import FocusView from './FocusView/FocusView';
const SUBMIT_COMMENT:string = "https://www.seanmorrow.ca/_lessons/albumAddComment.php?id=w0436519";
const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/albumRetrieve.php?id=w0436519&count=11";

const App = ():JSX.Element => {

  const onResponse = (result:PhotosData):void => {
    setPhotos(result.photos);
    console.log(result);
    //console.log(photos);
    setLoading(false);
    
  }
  const onError = (message:string):void => console.log("*** Error has occured during AJAX data transmission: " + message);

  const [loading, setLoading] = React.useState<boolean>(true);
  const [photos, setPhotos] = React.useState<Photo[]>([]);

  React.useEffect(():void => {
    // component mounted - loading JSON data when root component mounts
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }, []);
  console.log(photos);


  return (
    <div className="App">
      <LoadingOverlay bgColor="#035074" spinnerColor="#FFFFFF" enabled={loading} />
        <div className="main"></div>
        <div id="photoCounter" className="main__counter"></div>
        
        <div className="buttons">    
            <button id="open" className="buttons__openAlbum">Open Album</button>
            <button id="btnNext" className="buttons__scroll">Next</button>
            <button id="btnPrevious" className="buttons__scroll">Previous</button>
            <button id="btnFocus" className="buttons__focus">Focus</button>
            <button id ="openCommentSection" className="buttons__comment">Comment</button>
        </div>

        <div className="seperator"></div>
        <div id="showImages" className="focusImages"></div>
        <FocusView photos={photos}></FocusView>
        <CommentView></CommentView>
        <div id="nextPrev_Images" className="main__NextPrevImgDis">
            <div id="scrollImages" className="main__oneImage">
            
                <img src="" id="imgscrollTesting" className="main__image"></img>
                <p id="imgTitle" className="main__imgTitle"></p>
                <p id="imgDescription" className="main__imgDesc"></p>
                <div className="seperator"></div>
                <div id="commentDisplay" className="main__comments">Comment gets Displayed here</div>
                
            </div>
        </div>
    </div>
  );
}

export default App;
