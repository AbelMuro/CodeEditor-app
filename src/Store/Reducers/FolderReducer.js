import {createReducer, createAction} from '@reduxjs/toolkit';

const initialState = {
    currentDirectory: []
}
const addFolder = createAction('ADD_FOLDER');
const addFile = createAction('ADD_FILE');

const traverseFolders = (currFolder, folderToAdd) => {
    const allFolders = Object.entries(currFolder);
    if(!allFolders.length)
        return currFolder;
    if(currFolder.directory.join('') === folderToAdd.directory.join(''))
        return currFolder;    

    allFolders.entries((folder, content) => {

    })
}

const folderReducer = createReducer(initialState, builder => {
    builder 
        .addCase(addFolder, (state, action) => {
            const folderName = action.name;
            const folderDirectory = [...state.currentDirectory, folderName];
            state.currentDirectory.push(folderName);
            traverseFolders(state, {
                type: 'folder',
                directory: folderDirectory
            });
        })
        .addCase(addFile, (state, action) => {
            const fileName = action.name;
            state[fileName] = {
                type: 'file',
                content: '',
            }
        })
});

export default folderReducer;