import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
// import { newCourse } from "../../../tools/mockData";
import Spinner from "../commons/Spinner";
import { toast } from "react-toastify";

// eslint-disable-next-line no-unused-vars
const print = console.log.bind(console, "ManageCoursePage >");

function ManageCoursePage({
    courses,
    authors,
    loadAuthors,
    loadCourses,
    saveCourse,
    history,
    ...props
}) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        // if (courses && courses.length === 0) {
        //     console.log("getting courses mcpg");
        //     loadCourses().catch(error => {
        //         alert("Load Courses failed " + error);
        //     });
        // }
        // else {
        //     setCourse({ ...props.course });
        // }

        if (authors && authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Load Author failed " + error);
            });
        }
    }, [authors, loadAuthors]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value,
        }));
    }

    function formIsValid() {
        const { title, authorId, category } = course;
        const errors = {};

        if (!title) errors.title = "Title is required.";
        if (!authorId) errors.author = "Author is required";
        if (!category) errors.category = "Category is required";

        setErrors(errors);
        // Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveCourse(course)
            .then(() => {
                toast.success("Course Saved");
                history.push("/courses");
            })
            .catch(error => {
                setSaving(false);
                setErrors({ onSave: error.message });
            });
    }

    return authors.length === 0 ? (
        <Spinner />
    ) : (
        <>
            <CourseForm
                course={course}
                authors={authors}
                errors={errors}
                onChange={handleChange}
                onSave={handleSave}
                saving={saving}
            />
            {course.id > 10 && (
                <p style={{ maxWidth: "450px" }}>
                    Using JSON Server from{" "}
                    <code style={{ display: "block" }}>
                        https://my-json-server.typicode.com/.
                    </code>
                    Changes aren't persisted between calls. This will create
                    error when updating newly added course.
                </p>
            )}
        </>
    );
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    authors: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

const mapStateToProps = (state, ownProps) => {
    const newCourse = {
        id: null,
        title: "",
        authorId: null,
        category: "",
    };
    const slug = ownProps.match.params.slug;
    const course =
        slug && state.courses.length > 0
            ? getCourseBySlug(state.courses, slug)
            : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors,
    };
};

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
