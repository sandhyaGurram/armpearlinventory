import React from 'react'
import { NavLink } from 'react-router-dom'
import headerstyles from './header.module.css'


const Header = () => {
    return (
        <header className={headerstyles.headertop}>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">ARM Pearl Beauty</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link text-white active" aria-current="page" to="/">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link text-white" to="/deleteproduct">Delete Product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white " to='/armproduct'>ARM</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white " to='/hamsa'>Hamsa</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white " to='/signup'>SignUp</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white " to='/admindashboard'>Admin</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white " to='/upload'>Excel Upload</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white " to='/allupload'>All Excel Upload</NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header >
    )
}

export default Header