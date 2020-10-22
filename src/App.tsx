import React from 'react';

import './App.scss';
import './Buttons.scss';
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import { getJSONData } from "./tools/Toolkit";
import { PhotosData, Photo, ImageClicked } from './tools/Samples.model';
import CommentView from "./CommentView/CommentView";
import FocusView from './FocusView/FocusView';
import ScrollView from './ScrollImages/ScrollView';
import { Route, Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

const SUBMIT_COMMENT:string = "https://www.seanmorrow.ca/_lessons/albumAddComment.php?id=w0436519";
const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/albumRetrieve.php?id=w0436519&count=11";

const App = ():JSX.Element => {
  
  const onResponse = (result:PhotosData):void => {
    setPhotos(result.photos);
    console.log(result);
    console.log(photos);
    console.log("FROM APP VIEW");
    setLoading(false);
    
  }
  const onError = (message:string):void => {
    setLoading(true);
    console.log("*** Error has occured during AJAX data transmission: " + message)};

  const [loading, setLoading] = React.useState<boolean>(true);
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [count, setCount] = React.useState<number>(0);
  //console.log("DEFAULT COUNT" + count);
  React.useEffect(():void => {
    
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }, []);
  //console.log(photos);

  /*const nextBtn = (e:any):void => {
    let x:number = 0;
    x = count;
    ++x;
    console.log("***********   NEXT BUTTON WAS CLICKED" + " " + count);
    setCount(x);
  }*/

  /*const prevBtn = (e:any):void => {
    let n:number = 0;
    n = count;
    --n;
    console.log("***********   PREVIOUS BUTTON WAS CLICKED" + " " + count);
    setCount(n);
  }*/

  function nextBtn(){
    let x:number = 0;
    x = count;
    ++x;
    console.log("***********   NEXT BUTTON WAS CLICKED" + " " + count);
    setCount(x);
  }

  function prevBtn() {
    let n:number = 0;
    n = count;
    --n;
    console.log("***********   PREVIOUS BUTTON WAS CLICKED" + " " + count);
    setCount(n);
  }

  const focusBtn = (e:any):void => {

  }

  const history:any = useHistory();
  const route:string = useLocation().pathname;

  return (
    
    <div>
      <LoadingOverlay bgColor="#035074" spinnerColor="#FFFFFF" enabled={loading} />
      {photos.length===0
        ? <span>No orders retrieved...</span>
          
        :

        <div>
      
        <div className="main"></div>
        <div id="photoCounter" className="main__counter">Photos: {count + 1} of {photos.length}</div>
        
        <div className="buttons">
              
            <button id="open" className="buttons__openAlbum">Open Album</button>

            <button disabled={(count + 1) == photos.length}id="btnNext" className="buttons__scrollNext" 
              onClick={() => { history.push("/");
                nextBtn();}}>Next</button>
          
            <button disabled={count==0} id="btnPrevious" className="buttons__scrollPrev"
              onClick={() => { history.push("/");
                prevBtn();}}>Previous</button>
            
            <button id="btnFocus" className="buttons__focus" 
              onClick={ () => history.push("/FocusView")}>Focus</button>

            <button id ="openCommentSection" className="buttons__comment"
              onClick={ () => history.push("/CommentView")}>Comment</button>
        </div>

        <div className="seperator"></div>
        <Switch>
          
          <Route path="/"exact render={():JSX.Element =>
            <React.Fragment>
              <FocusView photos={photos} visible={false} setCount={setCount}></FocusView>
              <CommentView photos ={photos} visible={false} count={count}
                comments={photos[count].comments} setPhotos={setPhotos}
                  getJSONData={getJSONData} history={history} route={route}></CommentView>
              
            </React.Fragment>
          } />
            
            <Route path="/FocusView" render={():JSX.Element =>
            <React.Fragment>
              
              <FocusView photos={photos} visible={true} setCount={setCount}></FocusView>
              <CommentView photos ={photos} visible={false} count={count}
                comments={photos[count].comments} setPhotos={setPhotos}
                  getJSONData={getJSONData} history={history} route={route} ></CommentView>
            </React.Fragment>
          } />

            <Route path="/CommentView" render={():JSX.Element =>
              <React.Fragment>
              <CommentView photos ={photos} visible={true} count={count}
                comments={photos[count].comments} setPhotos={setPhotos}
                  getJSONData={getJSONData} history={history} route={route}></CommentView>
              <FocusView photos={photos} visible={false} setCount={setCount} ></FocusView>
            </React.Fragment>
          } />

        </Switch>
        
        <ScrollView caption={photos[count].caption} comments={photos[count].comments} id={photos[count].id} title={photos[count].title} source={photos[count].source}></ScrollView>
       




    </div>
}</div>
  );
}

export default App;
