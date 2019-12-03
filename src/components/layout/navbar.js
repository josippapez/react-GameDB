import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
    return(
        <nav className="nav-wrapper black">
            <div className="container">
                <Link to='/' className='brand-logo center'>GameDB</Link>
            </div>
        </nav>
    )
}

export default Navbar;