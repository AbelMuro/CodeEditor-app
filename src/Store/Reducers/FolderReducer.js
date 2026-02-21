import {createReducer, createAction} from '@reduxjs/toolkit';

const initialState = {
    currentDirectory: ['root'],
    allFolders: {
        name: 'root',
        directory: ['root'],
        folders: [],
        files: [],
    }
}
const addFolder = createAction('ADD_FOLDER');
const addFile = createAction('ADD_FILE');
const changeDirectory = createAction('CHANGE_DIRECTORY');

const traverseFolders = (currFolder, currDirectory, folderToAdd) => {
    if(currFolder.directory.join('/') === currDirectory.join('/'))
        return currFolder.folders.push(folderToAdd)
    
    currFolder.folders.forEach((folder) => {
        traverseFolders(folder, currDirectory, folderToAdd);
    })
}

const folderReducer = createReducer(initialState, builder => {
    builder 
        .addCase(addFolder, (state, action) => {
            const folderName = action.payload.name;
            const folderDirectory = [...new Set([...state.currentDirectory, folderName])];
            const newFolder = {
                name: folderName,
                directory: folderDirectory,
                folders: [],
                files: []
            };
            traverseFolders(state.allFolders, state.currentDirectory, newFolder);
            state.currentDirectory = folderDirectory;
        })
        .addCase(addFile, (state, action) => {
            const fileName = action.payload.name;
            state[fileName] = {
                type: 'file',
                content: '',
            }
        })
        .addCase(changeDirectory, (state, action) => {
            const directory = action.payload.directory;
            const name = action.payload.name;
            state.currentDirectory = [...new Set([...directory, name])];
        })
});

export default folderReducer;