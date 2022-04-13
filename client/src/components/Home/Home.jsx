import React from 'react'
import Feed from '../feed/Feed'
import Header from '../header/Header'
import Rightbar from '../rightbar/Rightbar'
import Sidebar from '../sidebar/Sidebar'
import './home.css'

function Home() {
  return (
    <>
        <Header />
        <div className='homeContainer'>

        <Sidebar/>
        <Feed/>
        
        <Rightbar/>

        </div>
        
        
    </>
  )
}

export default Home