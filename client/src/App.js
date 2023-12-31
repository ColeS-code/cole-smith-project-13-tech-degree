
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';

import Header from './Components/header';
import Courses from './Components/courses';
import CreateCourse from "./Components/createCourse";
import UpdateCourse from "./Components/updateCourse";
import CourseDetail from './Components/courseDetail';
import UserSignIn from './Components/userSignIn';
import UserSignUp from './Components/userSignUp';
import UserSignOut from "./Components/userSignOut";
import NotFound from "./Components/notFound";
import Forbidden from "./Components/forbidden";
import UnhandledError from "./Components/unhandledError";

import withContext from './Context';
import PrivateRoute from './privateRoute';

// This gives the Header context, giving it access to the user auth methods and state
const HeaderWithContext = withContext(Header);
// withContext gives enclosing components access to the Context, including user auth methods and state

function App() {

    return (
        <div id="root">
            <Router>
                <HeaderWithContext/>
                <Routes>
                    <Route exact path="/" component={withContext(Courses)} />
                    {/* Private routes are protected by User Auth, so it will redirect unless authenticated */}
                    <PrivateRoute exact path="/courses/create" component={withContext(CreateCourse)} />
                    <PrivateRoute exact path="/courses/:id/update" component={withContext(UpdateCourse)} />
                    <Route exact path="/courses/:id" component={withContext(CourseDetail)} />
                    <Route exact path="/signin" component={withContext(UserSignIn)} />
                    <Route exact path="/signup" component={withContext(UserSignUp)} />
                    <Route exact path="/signout" component={withContext(UserSignOut)} />

                    <Route exact path="/notfound" component={withContext(NotFound)} />
                    <Route exact path="/forbidden" component={withContext(Forbidden)} />
                    <Route exact path="/error" component={withContext(UnhandledError)} />
                    <Route component={withContext(NotFound)}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

























