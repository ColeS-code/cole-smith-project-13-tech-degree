import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from "axios";
import Loading from './loading';

export default function UpdateCourse({context}) {

    //grab ID from parameters
    let {id} = useParams();

    //enable use of history
    let navigate = useNavigate();

    //set state using hooks
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [materials, setMaterials] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    //runs when the form is submitted
    function handleUpdate(e){
        setIsLoading(true);
        e.preventDefault();
        const token = Buffer.from(`${context.authenticatedUser.emailAddress}:${context.password}`, 'utf8').toString('base64')
        //makes request to api with user auth and form datas
        axios.put(`http://localhost:5000/api/courses/${id}`,{
            title: title,
            description: description,
            time: time,
            materials: materials,
            userId: context.authenticatedUser.id,
        }, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then(()=>{
                navigate('/courses/'+id)
            })
            .catch((error) => {
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


    //makes call to api to retrieve course details so it can be edited
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                if (response.data == null){
                    navigate('/notfound');
                }
                if(response.data.userId !== context.authenticatedUser.id){
                    navigate('/forbidden');
                }
                setTitle(response.data.title);
                setDescription(response.data.description);
                setTime(response.data.estimatedTime || "");
                setMaterials(response.data.materialsNeeded || "");
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error)
                if (error.response.status===401){
                    navigate('/forbidden');
                } else if (error.response.status===500){
                    navigate('/error');
                }
            })
            .finally(()=>setIsLoading(false));
    }, [id, navigate, context.authenticatedUser.id])

    if (isLoading){
        return (<Loading/>)
    } else {
        return(
            <main>
                <div className="wrap">
                    <h2>Update Course</h2>
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
                    <form>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle"
                                       name="courseTitle"
                                       type="text"
                                       value={title}
                                       onChange={(e) => setTitle(e.target.value)}
                                />

                                <p>By Joe Smith</p>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription"
                                          name="courseDescription"
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime"
                                       name="estimatedTime"
                                       type="text"
                                       value={time}
                                       onChange={(e) => setTime(e.target.value)}
                                />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea
                                    id="materialsNeeded"
                                    name="materialsNeeded"
                                    value={materials}
                                    onChange={(e) => setMaterials(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="button" type="submit" onClick={handleUpdate}>Update Course</button>
                        <Link className="button button-secondary" to={"/courses/"+id}>Cancel</Link>
                    </form>
                </div>
            </main>
        )
    }
}
