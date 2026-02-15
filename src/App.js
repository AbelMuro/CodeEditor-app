import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import NavigationBar from './Common/Components/NavigationBar';
import './global.css';

/* 
    this is where i left off, i am almost done designing the header component of the landing page
    i just want to add a shooting star effect and then i can work on the responsiveness
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