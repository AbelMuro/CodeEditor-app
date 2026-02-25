import React from 'react';
import {Provider} from 'react-redux';
import Store from './Store';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import NavigationBar from './Common/Components/NavigationBar';
import Editor from './Pages/Editor';
import './global.css';

/* 
    this is where i left off, i finished the folder features for the app

    now i need to start the file feature
*/

function App(){
    return(
        <Provider store={Store}>
            <BrowserRouter>
                <NavigationBar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/editor' element={<Editor/>}/>
                </Routes>
            </BrowserRouter>            
        </Provider>

    )
}

export default App;