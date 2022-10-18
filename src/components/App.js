import React from "react"
import { Route, Switch } from "react-router-dom"
import PageNotFound from "./404/PageNotFound"
import AboutPage from "./about/AboutPage"
import AuthorsPage from "./authors/AuthorsPage"
import Header from "./commons/Header"
import CoursesPage from "./courses/CoursesPage"
import ManageCoursePage from "./courses/ManageCoursePage"
import HomePage from "./home/HomePage"

function App() {
    return (
        <div className="container-fluid mx-0 px-0">
            <Header />
            <div className="container">
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/courses" exact component={CoursesPage} />
                    <Route path="/authors" component={AuthorsPage} />
                    <Route path="/course/:slug" component={ManageCoursePage} />
                    <Route path="/course" component={ManageCoursePage} />
                    <Route exact component={PageNotFound} />
                </Switch>
            </div>
        </div>
    )
}

export default App
