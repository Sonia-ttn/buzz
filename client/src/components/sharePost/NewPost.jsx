import "./NewPost.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import pic from './user.png'

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={pic} alt="" />
          <input
            placeholder="share a Post..."
            className="shareInput"
          />
          <div className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo/Video</span>
                </div>
        </div>
      
                
              
                
           
      </div>
    </div>
  );
}