import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import NavigationBar from './Common/Components/NavigationBar';
import './global.css';

/* 
    this is where i left off, i am currently in the header component
    i want to add different text color for different keywords in the code string
*/

function App(){
    return(
        <BrowserRouter>
            <NavigationBar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;