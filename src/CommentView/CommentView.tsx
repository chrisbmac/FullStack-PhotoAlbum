import React from 'react';
import "./CommentView.scss";
import {Photo, SendComments, PhotosData} from "./../tools/Samples.model";
import {sendJSONData} from "./../tools/Toolkit";
import LoadingOverlay from "./../LoadingOverlay/LoadingOverlay";
import ScrollView from '../ScrollImages/ScrollView';



const SUBMIT_COMMENT = "https://www.seanmorrow.ca/_lessons/albumAddComment.php?id=w0436519";
const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/albumRetrieve.php?id=w0436519&count=11";
const CommentView = ({photos,visible, count, comments, getJSONData, setPhotos}:SendComments):JSX.Element => {
let sendString: any;
const commentSubmit = (e:any):void => {
  sendString = {
      "photoId": photos[count].id,
      "author": "c",
      "comment": "c"
  }
  let sendIT:string = JSON.stringify(sendString);
  sendJSONData(SUBMIT_COMMENT, sendIT, fillComments, onError);
}



const fillComments = ():void => {
  getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  comments.push(sendString);
}

React.useEffect(():void => {
  setPhotos(photos);
})

React.useEffect(():void => {
  getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }, []);

const onResponse = (result:PhotosData):void => {
  setCommentLoading(false);
  setPhotos(result.photos);
}

const [loadComment, setCommentLoading] = React.useState<boolean>(true);

const onError = (message:string):void => {
    setCommentLoading(true);
    console.log("*** Error has occured during AJAX data transmission: " + message)};

const commentCancel = (e:any):void => {
  console.log("CANCEL BUTTON HAS BEEN CLICKed!!!");
}

/*{
  (newPhotos.length==0)
?
<ScrollView caption={photos[count].caption} comments={photos[count].comments} id={photos[count].id} title={photos[count].title} source={photos[count].source}></ScrollView>
  :
  
  <ScrollView caption={newPhotos[count].caption} comments={newPhotos[count].comments} id={newPhotos[count].id} title={newPhotos[count].title} source={newPhotos[count].source}></ScrollView>
  */
//}
    return (
      <div>
       

        <div id="commentSection" className="commentPan" style={{display: (visible ? 'flex' : 'none')}}>
            <p>From who: </p>
            <input id="commentAuthor" className="commentPan__Author" onChange={authorInput}></input>
            <p>Comment: </p>
            <textarea id="commentTxtArea" className="commentPan__Comment" onChange={commentArea}></textarea>
            <div className="commentPan__buttons">
                <button id="submitComment" className="buttons__sendComment" onClick = {commentSubmit}>Send Comment</button>
                <button id="btnCancelComment" className="buttons__cancelComment" onClick = {commentCancel}>Cancel</button>
            </div>
            <div className="hideElement">
            <div>
        
          </div>

         </div>
        </div>
        
    </div>
      
    );
  }
  
  export default CommentView;