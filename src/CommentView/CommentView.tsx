import React from 'react';
import "./CommentView.scss";
import {Photo, SendComments, PhotosData} from "./../tools/Samples.model";
import {sendJSONData} from "./../tools/Toolkit";
import LoadingOverlay from "./../LoadingOverlay/LoadingOverlay";
import ScrollView from '../ScrollImages/ScrollView';

//const SUBMIT_COMMENT:string = "https://www.seanmorrow.ca/_lessons/albumAddComment.php?id=w0436519";
const SUBMIT_COMMENT:string = "http://localhost:8080/addComment/?id=&author=&limit=";
//const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/albumRetrieve.php?id=w0436519&count=11";
const CommentView = ({photos,visible, count, comments, getJSONData, setPhotos, history, route, RETRIEVE_SCRIPT}:SendComments):JSX.Element => {
let sendString: any;
// This components handles the comment submit.
// On submittion of comment it will send to the url and receive and update the photos/comments

//Send the comment to data base, enable loading overlay while updating comment section
const commentSubmit = ():void => {
  setCommentLoading(true);
  setPanelState(false);
  sendString = {
      "photoId": photos[count]._id,
      "author": stateAuthor,
      "comment": stateComment
  }
  console.log(sendString);
  console.log(photos[count]._id);
  let sendIT:string = JSON.stringify(sendString);
  sendJSONData(SUBMIT_COMMENT, sendIT, fillComments, onError);
}

// States for loading overlay, authorSTR, commentSTR, panel state
const [loadComment, setCommentLoading] = React.useState<boolean>(false);
const [stateAuthor, setStateAuthor] = React.useState<string>("");
  const userAuthor = (e:any):void => {setStateAuthor(e.target.value);}
const [stateComment, setStateComment] = React.useState<string>("");
  const userComment = (e:any):void => {setStateComment(e.target.value);}
const [panelState, setPanelState] = React.useState<boolean>(true);

// Get the new json data and push the string to comments array, Once finished stop loading overlay
const fillComments = ():void => {
  getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  comments.push(sendString);
  setCommentLoading(false);
}

// use effects for photos and getJSON function to check for changes
React.useEffect(():void => {setPhotos(photos);})
React.useEffect(():void => {getJSONData(RETRIEVE_SCRIPT, onResponse, onError);}, []);

// Data recieved set the photos in setPhotos Func from App.tsx
const onResponse = (result:PhotosData):void => {
  setPhotos(result.photos);
}

//Error
const onError = (message:string):void => {
    setCommentLoading(true);
    console.log("*** Error has occured during AJAX data transmission: " + message)};

//Cancel your comment set panel to false
const commentCancel = ():void => {
  setPanelState(false);

}
    return (
      <div>
        <LoadingOverlay bgColor="#035074" spinnerColor="#FFFFFF" enabled={loadComment} />
        {
          (panelState == true)?
        
        <div id="commentSection" className="commentPan" style={{display: (visible ? 'flex' : 'none')}}>
            <p>From who: </p>
            <input id="commentAuthor" className="commentPan__Author" onChange={userAuthor}></input>
            <p>Comment: </p>
            <textarea id="commentTxtArea" className="commentPan__Comment" onChange={userComment}></textarea>
          <div className="commentPan__buttons">
                <button disabled ={(stateAuthor === "") || (stateComment === "")}id="submitComment" className="buttons__sendComment" 
                  onClick={ () => {history.push("/"); commentSubmit();}}>Send Comment</button>
                <button id="btnCancelComment" className="buttons__cancelComment"
                  onClick={ () => {history.push("/"); commentCancel();}}>Cancel</button>
          </div>
        </div>
        
        :
        <div></div>  
      }
    </div>
    );
  }
  
  export default CommentView;