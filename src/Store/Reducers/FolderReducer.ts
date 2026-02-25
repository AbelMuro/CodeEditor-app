import {createReducer, createAction} from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit'

type File = {
    name: string,
    extension: string,
    content: string,
}

type Folder = {
    name: string,
    id: string,
    folders: Array<Folder>,
    files: Array<File>
}

type InitialState = {
    currentFolder: string,
    currentFile: File | {},
    creatingFolder: boolean,
    allFolders: Folder
}

const initialState : InitialState = {
    currentFolder: 'root',
    currentFile: {},
    creatingFolder: false,
    allFolders: {
        name: 'root',
        id: 'root',
        folders: [],
        files: [],
    }
}
const addFolder = createAction('ADD_FOLDER');
const addFile = createAction('ADD_FILE');
const createFolder = createAction('CREATE_FOLDER');
const changeCurrentFolder = createAction('CHANGE_CURRENT_FOLDER');

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

const traverseFolders = (currFolder : Folder, id: string) => {
    if(currFolder.id === id)
        return currFolder
    
    for(let i = 0; i < currFolder.folders.length; i++){
        const folder = currFolder.folders[i];
        return traverseFolders(folder, id);
    }
}


const folderReducer = createReducer(initialState, builder => {
    builder 
        .addCase(addFolder, (state, action: PayloadAction<{name: string, id: string}>) => {
            const folderName = action.payload.name;
            const folderId = action.payload.id;
            const currentOpenFolder = state.currentFolder;
            const newFolder : Folder = {
                name: folderName,
                id: folderId,
                folders: [],
                files: []
            };
            const folder = traverseFolders(state.allFolders, currentOpenFolder);
            console.log(folder.id);
            if(folder && !folderAlreadyExists(folder.folders, newFolder)){
                folder.folders.push(newFolder)
                state.currentFolder = newFolder.id;
            }
        })
        .addCase(addFile, (state, action: PayloadAction<{name: string, extension: string}>) => {
            const fileName = action.payload.name;
            const extension = action.payload.extension;
            const currentFolder = state.currentFolder;
            const newFile : File = {
                name: fileName,
                extension,
                content: ''
            }
            const folder = traverseFolders(state.allFolders, currentFolder);
            if(folder && !fileAlreadyExists(folder.files, newFile)){
                folder.files.push(newFile);
                state.currentFile = newFile;
            }
        })
        .addCase(createFolder, (state, action : PayloadAction<boolean>) => {
            state.creatingFolder = action.payload;
        })
        .addCase(changeCurrentFolder, (state, action: PayloadAction<{folderId: string}>) => {
            const folderId = action.payload.folderId;
            state.currentFolder = folderId;
        })
});

export default folderReducer;