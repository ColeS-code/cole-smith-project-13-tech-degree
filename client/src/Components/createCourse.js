import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import Loading from './loading';

export default function CreateCourse ({context}) {

    //allow use of history
    let navigate = useNavigate();

    //set state using hooks
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [materials, setMaterials] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    //when the form is submitted
    function handleSubmit(e){
        setIsLoading(true);
        e.preventDefault();
        const token = Buffer.from(`${context.authenticatedUser.emailAddress}:${context.password}`, 'utf8').toString('base64')
        //make request to api using basic auth and form data
        axios.post(`http://localhost:5000/api/courses`,{
            title: title,
            description: description,
            estimatedTime: time,
            materialsNeeded: materials,
            userId: context.authenticatedUser.id,
        }, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then((response) => {
                setIsLoading(false);
                //redirect to the course page
                navigate(response.headers.location);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('Error fetching and parsing data', error);
                if (error.response){
                    if (error.response.status===401){
                        navigate('/forbidden');
                    } else if (error.response.status===500){
                        navigate('/error');
                    }
                } else {
                    setErrors(error.response.data.errors);
                }
            })
    }

    if (isLoading){
        return (
            <Loading/>
        )
    } else {
        return (
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    {errors.length > 0 ? (
                        <div className="validation--errors">

                            <h3>Validation Errors</h3>
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    ) : ""}
                    <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle"
                                       name="courseTitle"
                                       type="text"
                                       onChange={(e) => setTitle(e.target.value)}
                                />

                                <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription"
                                          name="courseDescription"
                                          placeholder="Markdown is supported!"
                                          onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input
                                    id="estimatedTime"
                                    name="estimatedTime"
                                    type="text"
                                    onChange={(e) => setTime(e.target.value)}
                                />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    placeholder="Markdown is supported!"
                                    onChange={(e) => setMaterials(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="button" type="submit">Create Course</button>
                        <Link className="button button-secondary" to="/">Cancel</Link>
                    </form>
                </div>
            </main>
        )
    }
}
