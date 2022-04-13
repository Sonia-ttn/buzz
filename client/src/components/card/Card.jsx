import React from 'react'
import './card.css'
import pic from './user.png'

function Card() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className='Card'>
        <div className='upper-container'>
            <div className='image-container'>
                <img src={pic} alt="" style={{boredr:'0'}} height="100px" width="100px"/>

            </div>
        </div>
        <div className='lower-container'>
            <h5>{`${user.firstname} ${user.lastname}`}</h5>
            <h6>Trainee</h6>
        </div>

        <div className="social-container">
            
				<div className="followers">
					<h5 className="bold-text">52</h5>
					<h5 className="smaller-text">Profile Vies</h5>
				</div>
				<div className="likes">
					<h5 className="bold-text">82</h5>
					<h5 className="smaller-text">Posts</h5>
				</div>
				
			</div>

        
    </div>
  )
}

export default Card