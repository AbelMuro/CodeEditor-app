import React from 'react';
import Toast from '~/Common/Components/Toast';
import {Provider} from 'react-redux';
import Store from './Store';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import NavigationBar from './Common/Components/NavigationBar';
import Editor from './Pages/Editor';
import './global.css';

/* 
    this is where i left off, i am currentl fixing a bug with changing the selected file,

    i am in the FolderReducer creating a recursive function that will traverse through the
    folderManagement state to find a specific file
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
            <Toast/>
        </Provider>

    )
}

export default App;