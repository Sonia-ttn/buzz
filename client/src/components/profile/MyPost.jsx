import React from 'react'
import pic from "./user.png";
import {Link} from 'react-router-dom'

function MyPost({datas}) {

  


  return (
    <div>{datas.firstname}
    {console.log(datas)}
    
    
    <div className="feed" >
         <div
           className="feedWrapper"
           style={{
             display: "flex",
             justifyContent: "space-around",
             alignContent: "space-around",
             flexDirection:'row',
             flexWrap: "wrap",
            // flexGrow: "1",
            
           }}
         >
           <div
             className="card shadow p-3 mb-5 bg-body rounded"
             style={{ width: "50%" }}
           >
             <div className="card-banner">
               <h6 className="category-tag technology">
                 
 
                 <span>
                   <Link
                     to="/profile"
                     style={{
                       textDecoration: "none",
                       color: "black",
                       fontSize: "20px",
                       margin: "15px",
                     }}
                   >
                    
                   </Link>
                 </span>
               </h6>
               <img
                 className="banner-img img1"
                 style={{ border: "none" }}
                 src={datas.image}
                 alt=""
                 height="400px"
                 width="90%"
               />
             </div>
 
             <div
               style={{ marginLeft: "40px", marginTop: "1px", fontSize: "20px" }}
             >
               {/*datas.likes.includes(user._id) ? (
               <i
                 className="fa fa-thumbs-down fa-lg"
                 style={{ marginLeft: "px" }}
                 onClick={() => {
                   unLikePost(datas._id);
                 }}
               ></i>
             ) : (
               <i
                 className="fa fa-thumbs-up fa-lg"
                 onClick={() => {
                   likePost(datas._id);
                 }}
               ></i>
             )*/}
 
               <h6 style={{ marginLeft: "-5px", marginTop: "8px" }}>
                 {datas.likes.length} likes
               </h6>
             </div>
 
             <div className="card-body">
               <h4
                 className="blog-hashtag"
                 style={{ marginLeft: "15px", fontSize: "20px" }}
               >
                 {datas.title}
               </h4>
 
               <p
                 className="blog-description"
                 style={{ marginLeft: "15px", fontSize: "18px" }}
               >
                 {datas.description}
               </p>
 
               {datas.comments.map((item) => {
                 return (
                   <h6 key={item._id}>
                     <span style={{ marginLeft: "15px", fontSize: "15px" }}>
                       {item.postedBy.firstname}
                     </span>
                     <span style={{ marginLeft: "15px", fontWeight: "normal" }}>
                       {item.text}
                     </span>
                   </h6>
                 );
               })}
             </div>
           </div>
         </div>
       </div>
      




    
    </div>
  )
}

export default MyPost