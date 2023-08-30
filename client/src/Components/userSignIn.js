import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function UserSignIn(props) {

    let context = props.context;
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    //runs when the form is submitted
    function handleSubmit(e){
        e.preventDefault();
        //reaches into the context to sign in
        context.actions.signIn(email, password)
            .then(()=>{
                if (props.location.state){
                    navigate(props.location.state.from.pathname);
                } else {
                    navigate('/');
                }
            })
            .catch(() => {
                setErrors('Sign-in unsuccessful. Check your credentials.');
            })
    }

    useEffect(()=>{
        if (context.authenticatedUser){
            if (props.location.state){
                navigate(props.location.state.from.pathname);
            } else {
                navigate('/');
            }
        }
    },[navigate, props.location.state, context.authenticatedUser])

    return(
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                {errors.length > 0 ? (
                    <div className="validation--errors">
                        <h3>{errors}</h3>
                    </div>
                ) : ""}
                <form>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress"
                           name="emailAddress"
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input id="password"
                           name="password"
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit" onClick={handleSubmit}>Sign In</button>
                    <Link className="button button-secondary" to="/">Cancel</Link>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>

            </div>
        </main>
    )
}
