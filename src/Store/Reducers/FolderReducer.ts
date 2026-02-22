import {createReducer, createAction} from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit'

type File = {
    name: string,
    extension: string,
    content: string,
}

type Folder = {
    name: string,
    directory: Array<string>,
    folders: Array<Folder>,
    files: Array<File>
}

type InitialState = {
    currentDirectory: Array<string>,
    currentFile: File | {},
    creatingFolder: boolean,
    allFolders: Folder
}

const initialState : InitialState = {
    currentDirectory: ['root'],
    currentFile: {},
    creatingFolder: false,
    allFolders: {
        name: 'root',
        directory: ['root'],
        folders: [],
        files: [],
    }
}
const addFolder = createAction('ADD_FOLDER');
const addFile = createAction('ADD_FILE');
const createFolder = createAction('CREATE_FOLDER');
const changeDirectory = createAction('CHANGE_DIRECTORY');

const folderAlreadyExists = (folders: Array<Folder>, folder: Folder) => {
    return folders.some((currFolder) => {
        return currFolder.name === folder.name;
    })
}

const fileAlreadyExists = (files : Array<File>, file : File) => {
    return files.some((currFile) => {
        return currFile.name === file.name;
    })
}

const traverseFolders = (currFolder : Folder, currDirectory : Array<string>) => {
    if(currFolder.directory.join('/') === currDirectory.join('/'))
        return currFolder
    
    for(let i = 0; i < currFolder.folders.length; i++){
        const folder = currFolder.folders[i];
        return traverseFolders(folder, currDirectory);
    }
}


const folderReducer = createReducer(initialState, builder => {
    builder 
        .addCase(addFolder, (state, action: PayloadAction<{name: string}>) => {
            const folderName = action.payload.name;
            const folderDirectory = [...state.currentDirectory, folderName];
            const newFolder : Folder = {
                name: folderName,
                directory: folderDirectory,
                folders: [],
                files: []
            };
            const folder = traverseFolders(state.allFolders, state.currentDirectory);
            if(folder && !folderAlreadyExists(folder.folders, newFolder)){
                folder.folders.push(newFolder)
                state.currentDirectory = folderDirectory;
            }

        })
        .addCase(addFile, (state, action: PayloadAction<{name: string, extension: string}>) => {
            const fileName = action.payload.name;
            const extension = action.payload.extension;
            const newFile : File = {
                name: fileName,
                extension,
                content: ''
            }
            const folder = traverseFolders(state.allFolders, state.currentDirectory);
            if(folder && !fileAlreadyExists(folder.files, newFile)){
                folder.files.push(newFile);
                state.currentFile = newFile;
            }
        })
        .addCase(createFolder, (state, action : PayloadAction<boolean>) => {
            state.creatingFolder = action.payload;
        })
        .addCase(changeDirectory, (state, action: PayloadAction<{directory: Array<string>}>) => {
            const directory = action.payload.directory;
            state.currentDirectory = directory;
        })
});

export default folderReducer;