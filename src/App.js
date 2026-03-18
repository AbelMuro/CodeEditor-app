import React from 'react';
import Toast from '~/Common/Components/Toast';
import {Provider} from 'react-redux';
import Store from './Store';
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import Home from './Pages/Home';
import NavigationBar from './Common/Components/NavigationBar';
import Editor from './Pages/Editor';
import './global.css';

/* 
    this is where i left off, i need to find a way to intercept the action of navigate and check the changesSaved property
    of the global state
*/

function App(){

    const AppWrapper = () => {
        return(
            <>
                <NavigationBar/>
                <Outlet/>
                <Toast/>
            </>
        )
    }

    const router = createBrowserRouter([
        {
            element: <AppWrapper/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/editor',
                    element: <Editor/>
                }
            ]
        }
    ]);
    
    return(
        <Provider store={Store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}

export default App;