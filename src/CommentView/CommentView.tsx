import React from 'react';
import "./CommentView.scss";
const CommentView = ():JSX.Element => {

  
    return (
      <div>
        
        <div id="commentSection" className="commentPan">
            <p>From who: </p>
            <input id="commentAuthor" className="commentPan__Author"></input>
            <p>Comment: </p>
            <textarea id="commentTxtArea" className="commentPan__Comment"></textarea>
            <div className="commentPan__buttons">
                <button id="submitComment" className="buttons__sendComment">Send Comment</button>
                <button id="btnCancelComment" className="buttons__cancelComment">Cancel</button>
            </div>
        </div>
      </div>
    );
  }
  
  export default CommentView;