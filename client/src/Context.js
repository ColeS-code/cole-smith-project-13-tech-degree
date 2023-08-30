import React, {useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const UserContext = React.createContext();

//change up the Provider contents
export function Provider(props) {

    //state
    const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(Cookies.get('authenticatedUser') || null));
    const [password, setPassword] = useState(Cookies.get('password') || null);

    //stuff to include in any Components with Context
    const value = {
        authenticatedUser,
        password,
        actions: {
            signIn,
            signOut
        },
    };
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );

    //signs in the user
    //takes email address and password parameters
    async function signIn (emailAddress, password) {
        const token = Buffer.from(`${emailAddress}:${password}`, 'utf8').toString('base64')

        //makes the call to users endpoint based on the Basic Auth scheme
        axios.get("http://localhost:5000/api/users", {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then((response) => {
                //if it comes back fine, then set user details into state/context
                //also set user data into Cookies so it can persist through refreshes and tab closes
                setAuthenticatedUser(response.data);
                Cookies.set('authenticatedUser', JSON.stringify(response.data), {expires: 1, sameSite: 'strict'})

                setPassword(password);
                Cookies.set('password', JSON.stringify(password), {expires: 1, sameSite: 'strict'})
                return response.data;
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            })

    }

    //removes user info from state and cookies
    function signOut(history){
        setAuthenticatedUser(null);
        Cookies.remove('authenticatedUser', {sameSite: 'strict'});

        setPassword(null);
        Cookies.remove('password', {sameSite: 'strict'});

    }
}


export const Consumer = UserContext.Consumer;


export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Consumer>
                {context => <Component {...props} context={context} />}
            </Consumer>
        );
    }
}
