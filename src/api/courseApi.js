import { handleResponse, handleError } from "./apiUtils";
// var slug = require("slug");
import slug from "slugify";
const baseUrl = process.env.REACT_APP_API_URL + "/courses/";

export async function getCourses() {
    try {
        const response = await fetch(baseUrl);
        // const courses = await response.json();
        // return courses;
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export function saveCourse(course) {
    course.slug = slug(course.title.toLowerCase());
    return fetch(baseUrl + (course.id || ""), {
        method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
        headers: { "content-type": "application/json" },
        body: JSON.stringify(course),
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteCourse(courseId) {
    return fetch(baseUrl + courseId, { method: "DELETE" })
        .then(handleResponse)
        .catch(handleError);
}
