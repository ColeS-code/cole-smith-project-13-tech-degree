import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

export default function Courses() {
    //sets state using hooks
    const [data, setData] = useState([]);

    //allow the use of history
    let navigate = useNavigate();

    //grab the data from the api
    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
            .then(response => {
                setData(response.data);
            })
            .catch( error => {
                console.log('Error fetching and parsing data', error)
                if (error.response){
                    if (error.response.status===401){
                        navigate('/forbidden');
                    } else if (error.response.status===500){
                        navigate('/error');
                    }
                }
            })


    }, [navigate])

    return (
        <main>
            <div className="wrap main--grid">
                {data.map((course) => (
                    <Link className="course--module course--link" to={"/courses/" + course.id} key={course.id}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </Link>
                ))}
                <Link className="course--module course--add--module" to="/courses/create">
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                 viewBox="0 0 13 13" className="add"><polygon
                                points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "/></svg>
                            New Course
                        </span>
                </Link>
            </div>
        </main>
    )
}