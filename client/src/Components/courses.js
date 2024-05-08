import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    // Fetch the list of courses from your API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);



    return (
        <div>
            <h1>Courses</h1>
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <Link to={`/courses/${course.id}`}>{course.name}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/create-course">Create Course</Link>
        </div>
    );
};
export default Courses;