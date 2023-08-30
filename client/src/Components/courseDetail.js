import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import ReactMarkdown from "react-markdown";

import Loading from './loading';

export default function CourseDetail({context}){

    //allow the use of history
    let navigate = useNavigate();

    //grab the ID from URL params
    let {id} = useParams();

    //set state using hook
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUser, setIsUser] = useState(false);

    //this will handle deleting a course
    function handleDelete(e){
        setIsLoading(true);
        e.preventDefault();const token = Buffer.from(`${context.authenticatedUser.emailAddress}:${context.password}`, 'utf8').toString('base64')

        //makes the call with basic auth
        axios.delete(`http://localhost:5000/api/courses/${id}`,{
            headers: {
                'Authorization': `Basic ${token}`
            }})
            .then( () => {
                setIsLoading(false)
                navigate('/');
                //redirects to main page
            } )
            .catch(error => {
                console.log('Error fetching and parsing data', error);
                if (error.response){
                    if (error.response.status===401){
                        navigate('/forbidden');
                    } else if (error.response.status===500){
                        navigate('/error');
                    }
                }

            })

    }

    //this happens at least once after load, when the dependencies change
    useEffect(()=>{
        //get the course details from the api
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                if (response.data == null){
                    //if nothing is found, redirect to 404
                    navigate('/notfound');
                } else {
                    setData(response.data);
                    //if logged in
                    if (context.authenticatedUser !== null){
                        //if the current user doesn't match the course creator, set the state
                        setIsUser(response.data.userId === context.authenticatedUser.id)
                    }
                    setIsLoading(false);
                }

            })
            .catch(error => {
                setIsLoading(false);
                console.log('Error fetching and parsing data', error)
                if (error.response){
                    if (error.response.status===401){
                        navigate('/forbidden');
                    } else if (error.response.status===500){
                        navigate('/error');
                    }
                }
            })
    }, [id, navigate, context.authenticatedUser])

    if (isLoading){
        return (
            <Loading/>
        )
    } else {
        return (
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        {isUser ? (
                            <>
                                <Link className="button" to={"/courses/"+data.id+"/update"}>Update Course</Link>
                                <button className="button" onClick={handleDelete}>Delete Course</button>
                            </>
                            ) : ""}
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>

                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{data.title}</h4>
                                <p>By {data.teacher.firstName} {data.teacher.lastName}</p>

                                <ReactMarkdown>{data.description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{data.estimatedTime || "No estimated time"}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    <ReactMarkdown>{data.materialsNeeded}</ReactMarkdown>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}

