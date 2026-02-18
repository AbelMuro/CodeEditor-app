import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import NavigationBar from './Common/Components/NavigationBar';
import Editor from './Pages/Editor';
import './global.css';

/* 
    this is where i left off, i am designing the FileManager component

    i want to create a file manager system
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