

import React, { useState, useEffect } from 'react';

const CourseDetail = ({ courseId }) => {
    const [course, setCourse] = useState(null);

    // Fetch course details based on the provided courseId
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`/api/courses/${courseId}`); // Adjust the API endpoint
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, [courseId]);

    const handleDeleteCourse = async () => {
        try {
            await fetch(`/api/courses/${courseId}`, {
                method: 'DELETE',
                // Add any necessary headers or authentication tokens
            });
            // Handle success (e.g., show a confirmation message)
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div>
            {course ? (
                <div>
                    <h1>{course.name}</h1>
                    <p>{course.description}</p>
                    {/* Render other course details as needed */}
                    <button onClick={handleDeleteCourse}>Delete Course</button>
                    <button onClick={() => navigateToUpdateCourse(courseId)}>Update Course</button>
                </div>
            ) : (
                <p>Loading course details...</p>
            )}
        </div>
    );
};

export default CourseDetail;

