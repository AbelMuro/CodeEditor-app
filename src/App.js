import React from 'react';
import Toast from '~/Common/Components/Toast';
import {Provider} from 'react-redux';
import Store from './Store';
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import Home from './Pages/Home';
import Editor from './Pages/Editor';
import NavigationBar from './Common/Components/NavigationBar';
import {DndProvider} from 'react-dnd';
import {HTML5Backend}from 'react-dnd-html5-backend';
import './global.css';

/* 
    this is where i left off, i need to delete the id reference to the deleted file in the openFiles property of the global state
*/

function App(){

    const AppWrapper = () => {
        return(
            <>
                <NavigationBar/>
                    <DndProvider backend={HTML5Backend}>
                        <Outlet/>
                    </DndProvider>
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