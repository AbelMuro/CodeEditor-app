import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import NavigationBar from './Common/Components/NavigationBar';
import Editor from './Pages/Editor';
import './global.css';

/* 
    this is where i left off, i am desiging how the folders and files are to be organized
    in the file manager, i am planning on using recursion to traverse through complex folder structures

    for now, i want to design the add folder component and add file component
*/

function App(){
    return(
        <BrowserRouter>
            <NavigationBar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/editor' element={<Editor/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;