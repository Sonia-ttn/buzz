import React from 'react'
import Header from '../header/Header';
import styles from "./style.module.css";
import pic from './user.png'

function UserProfile() {
  return (
    <div>
        <Header/>
        <div className="card container  rounded bg-white mt-5 mb-5">
    <div className="row ">
        <div className="ms-5 col-md-3 border-right">

            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className=" mt-5"  width="150px" style={{border:'none'}} src={pic}/><span className="font-weight-bold">Abhishek Tripathi</span><span className="text-black-50">edogaru@mail.com.my</span><span> </span></div>
        </div>
        <div className=" ms-5 col-md-7 border-right">
          
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Edit Profile</h4>
                </div>
                <div className="row mt-1">
                    <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value=""/></div>
                    <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" value="" placeholder="surname"/></div>
                </div>
                <div className="row mt-3">
                <div className="col-md-6"><label className="labels">Designation</label><input type="text" className="form-control" placeholder="Designation" value=""/></div>
                    <div className="col-md-6"><label className="labels">My Website</label><input type="text" className="form-control" value="" placeholder="My Website"/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6"><label className="labels">Gender</label><input type="text" className="form-control" placeholder="country" value=""/></div>
                    <div className="col-md-6"><label className="labels">Birthday</label><input type="text" className="form-control" value="" placeholder="state"/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6"><label className="labels">City</label><input type="text" className="form-control" placeholder="country" value=""/></div>
                    <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value="" placeholder="state"/></div>
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