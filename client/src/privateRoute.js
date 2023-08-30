
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Consumer } from './Context';

export default function PrivateRoute ({ children }){
const authenticatedUser = useAuth();
return authenticatedUser ? <>{children}</> : <Navigate to ="/" />;
};

function App() {

    return (
        <Consumer>
            {context => (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<public />} />
                        <Route 
                            path="/private"
                            element={
                                <PrivateRoute>
                                    <context.Private/>
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            )}
        </Consumer>
    );
};
