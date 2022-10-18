import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import Spinner from "../commons/Spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
    componentDidMount() {
        const { courses, authors, actions } = this.props;

        if (courses.length === 0)
            actions.loadCourses().catch(error => {
                alert("Load Courses failed " + error);
            });

        if (authors.length === 0)
            actions.loadAuthors().catch(error => {
                alert("Load Author failed " + error);
            });
    }

    handleDeleteCourse = course => {
        toast.success("course deleted");
        this.props.actions.deleteCourse(course);
    };

    render() {
        return (
            <div className="m-4 p-1">
                <h2>Courses</h2>
                {this.props.loading ? (
                    <Spinner />
                ) : (
                    <>
                        <Link
                            to="/course"
                            className="btn btn-primary px-5 my-2"
                        >
                            Add New Course
                        </Link>
                        <CourseList
                            onDeleteClick={this.handleDeleteCourse}
                            courses={this.props.courses}
                        />
                    </>
                )}
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
        courses:
            state.authors.length > 0
                ? state.courses.map(course => {
                      return {
                          ...course,
                          authorName: state.authors.find(
                              a => a.id === course.authorId
                          ).name,
                      };
                  })
                : [],
        authors: state.authors,
        loading: state.apiCallsInProgress > 0,
    };
};

/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-enable no-mixed-spaces-and-tabs */

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(
                courseActions.loadCourses,
                dispatch
            ),
            loadAuthors: bindActionCreators(
                authorActions.loadAuthors,
                dispatch
            ),
            deleteCourse: bindActionCreators(
                courseActions.deleteCourse,
                dispatch
            ),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
