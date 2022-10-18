import React from "react";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import PropTypes from "prop-types";
// import { connect } from "react-redux"
// import * as courseActions from "../../redux/actions/courseActions";
// import { deleteCourse } from "../../api/courseApi";
// import { bindActionCreators } from "redux";

const CourseList = ({ courses, onDeleteClick }) => (
    <table className="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Course</th>
                <th scope="col">Author</th>
                <th scope="col">Category</th>
            </tr>
        </thead>
        <tbody>
            {courses.map(course => (
                <tr key={course.title}>
                    <th scope="row">
                        <TiDelete
                            className="icon-delete"
                            onClick={() => onDeleteClick(course)}
                        />
                    </th>
                    <td>
                        <Link to={"/course/" + course.slug}>
                            {course.title}
                        </Link>
                    </td>
                    <td>{course.authorName}</td>
                    <td>{course.category}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

CourseList.propTypes = {
    courses: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
