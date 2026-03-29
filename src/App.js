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
    this is where i left off, there is a bug with react-dnd where if i drag an item too quickly, the component (folder) will unmount

    i need to find a way to keep the component mounted
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