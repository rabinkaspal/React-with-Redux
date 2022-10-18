import React from "react"
import { NavLink } from "react-router-dom"

function Header() {
    const activeStyle = {
        color: "#f9445c",
    }
    return (
        <header>
            <nav className="navbar navbar-expand navbar-light bg-light px-4">
                <NavLink className="navbar-brand" to="/" exact>
                    <img
                        src="../../favicon.ico"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="logo"
                    />
                </NavLink>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink
                                className="nav-link"
                                to="/"
                                exact
                                activeStyle={activeStyle}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/about"
                                activeStyle={activeStyle}
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/courses"
                                activeStyle={activeStyle}
                            >
                                Courses
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/authors"
                                activeStyle={activeStyle}
                            >
                                Authors
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header
