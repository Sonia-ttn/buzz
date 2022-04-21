import React from 'react'
import Header from '../header/Header';
import styles from "./style.module.css";
import pic from './user.png'

function UserProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
        <Header/>
        <div className="card container  rounded bg-white mt-5 mb-5">
    <div className="row ">
        <div className="ms-5 col-md-3 border-right">

            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className=" mt-5"  width="150px" style={{border:'none'}} src={pic}/><span className="font-weight-bold">{localStorage.getItem('user') &&`${user.firstname} ${user.lastname}`}</span><span className="text-black-50">{`${user.email}`}</span><span> </span></div>
        </div>
        <div className=" ms-5 col-md-7 border-right">
          
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Edit Profile</h4>
                </div>
                <div className="row mt-1">
                    <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value={`${user.firstname}`}/></div>
                    <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" value="" placeholder={`${user.lastname}`}/></div>
                </div>
                <div className="row mt-3">
                <div className="col-md-6"><label className="labels">Designation</label><input type="text"  className="form-control" placeholder="Designation" value="Trainee"/></div>
                    <div className="col-md-6"><label className="labels">My Website</label><input type="text" className="form-control" value="" placeholder="My Website"/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6"><label className="labels">Gender</label><input type="text" className="form-control" placeholder="country" value="Male"/></div>
                    <div className="col-md-6"><label className="labels">Birthday</label><input type="text" className="form-control" value="" placeholder="state"/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6"><label className="labels">City</label><input type="text" className="form-control" placeholder="country" value="Noida"/></div>
                    <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value="Uttar Pradesh" placeholder="state"/></div>
                </div>
                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Edit Profile</button></div>
            </div>
        </div>
       
        </div>
        </div>
    </div>
  )
}

export default UserProfile