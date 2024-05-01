import { MdNotificationAdd } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

import './index.css'


function Header() {
  return (
    <div className='heading-container'>
         <Link to='/'>
    <div className='website-logo-container'>
       
        <img className="webiste-image" 
        src='https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/512/Task_Manager.png' 
        alt='website-logo' />
        <h1 className='website-heading'>Task <span className='manager'>Manager</span></h1>
        
    </div>
    </Link>
    <div className='notification-panel'>
        <CgProfile size={25} color='#ffffff'/>
        <MdNotificationAdd size={25} color='#44CCFF'/>
        <div className='logout-container'>
            <AiOutlineLogout size={23} color='#ffffff'/>
            <button className='logout-button'>Logout</button>
        </div>
    </div>
</div>
  )
}

export default Header