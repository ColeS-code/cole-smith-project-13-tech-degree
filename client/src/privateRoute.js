
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '/user-auth';
import withContext, { Consumer } from './Context';

export default function PrivateRoute ({ children }){
const authenticatedUser = useAuth();
return authenticatedUser ? <>{children}</> : <Navigate to ="/" />;
};

function App() {

    return (
        <Consumer>
            {withContext => (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<public />} />
                        <Route 
                            path="/private"
                            element={withContext(<PrivateRoute/>)}
                        />
                    </Routes>
                </BrowserRouter>
            )}
        </Consumer>
    );
};

App()
