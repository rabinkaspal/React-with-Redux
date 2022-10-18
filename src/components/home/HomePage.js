import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="jumbotron bg-light rounded-3 m-5 p-5">
            <h1 className="display-5 fw-bold">MVP Course Management</h1>
            <p className="col-md-8 fs-4">
                React, Redux and React Router for ultra-responsive web apps.
                Using a series of utilities, you can create this jumbotron, just
                like the one in previous versions of Bootstrap.
            </p>
            <Link to="courses" className="btn btn-primary btn-lg">
                Go to Courses{" "}
                <span style={{ fontWeight: "bolder", marginBottom: "300px" }}>
                    &#10230;
                </span>
            </Link>
        </div>
    );
};

export default HomePage;
