import * as types from "./actionTypes";
import * as coursesApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course: course };
}

export function loadCourseSuccess(courses) {
    return { type: types.LOAD_COURSE_SUCCESS, courses };
}

export function updateCourseSuccess(savedCourse) {
    return { type: types.UPDATE_COURSE_SUCCESS, course: savedCourse };
}

export function saveCourseSuccess(savedCourse) {
    return { type: types.CREATE_COURSE_SUCCESS, course: savedCourse };
}

export function deleteCourseOptimistic(course) {
    return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return coursesApi
            .getCourses()
            .then(courses => {
                dispatch(loadCourseSuccess(courses));
            })
            .catch(error => {
                dispatch(apiCallError());
                throw error;
            });
    };
}

export function saveCourse(course) {
    /*eslint-disable-next-line no-unused-vars */
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return coursesApi
            .saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(saveCourseSuccess(savedCourse));
            })
            .catch(error => {
                dispatch(apiCallError());
                throw error;
            });
    };
}

export function deleteCourse(course) {
    return function (dispatch) {
        dispatch(deleteCourseOptimistic(course));
        return coursesApi.deleteCourse(course.id);
    };
}
