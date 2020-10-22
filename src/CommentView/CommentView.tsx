import React from 'react';
import "./CommentView.scss";
import {Photo, SendComments, PhotosData} from "./../tools/Samples.model";
import {sendJSONData} from "./../tools/Toolkit";
import LoadingOverlay from "./../LoadingOverlay/LoadingOverlay";
import ScrollView from '../ScrollImages/ScrollView';

const SUBMIT_COMMENT = "https://www.seanmorrow.ca/_lessons/albumAddComment.php?id=w0436519";
const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/albumRetrieve.php?id=w0436519&count=11";
const CommentView = ({photos,visible, count, comments, getJSONData, setPhotos, history, route}:SendComments):JSX.Element => {

let sendString: any;
const commentSubmit = ():void => {
  setPanelState(false);
  sendString = {
      "photoId": photos[count].id,
      "author": stateAuthor,
      "comment": stateComment
  }
  let sendIT:string = JSON.stringify(sendString);
  sendJSONData(SUBMIT_COMMENT, sendIT, fillComments, onError);
}

const [loadComment, setCommentLoading] = React.useState<boolean>(true);
const [stateAuthor, setStateAuthor] = React.useState<string>("");
  const userAuthor = (e:any):void => {setStateAuthor(e.target.value);}
const [stateComment, setStateComment] = React.useState<string>("");
  const userComment = (e:any):void => {setStateComment(e.target.value);}
const [panelState, setPanelState] = React.useState<boolean>(true);

const fillComments = ():void => {
  getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  comments.push(sendString);
}

React.useEffect(():void => {setPhotos(photos);})
React.useEffect(():void => {getJSONData(RETRIEVE_SCRIPT, onResponse, onError);}, []);

const onResponse = (result:PhotosData):void => {
  setCommentLoading(false);
  setPhotos(result.photos);
}

const onError = (message:string):void => {
    setCommentLoading(true);
    console.log("*** Error has occured during AJAX data transmission: " + message)};

const commentCancel = ():void => {
  setPanelState(false);

}
    return (
      <div>
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