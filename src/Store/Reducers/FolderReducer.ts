import {createReducer, createAction} from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit'

type File = {
    name: string,
    extension: string,
    content: string,
    id: string
}

type Folder = {
    name: string,
    id: string,
    folders: Array<Folder>,
    files: Array<string>
}

type InitialState = {
    selected: string,
    changesSaved: boolean,

    currentFolder: string,
    currentFile: string | null,
    openFiles: Array<string>,

    displayFolderInput: boolean,
    displayFileInput: boolean,

    allFolders: Folder,
    allFiles: Array<File>
}

let prevState = JSON.parse(localStorage.getItem('editor_state'));


const initialState : InitialState = prevState ? 
{
    ...prevState,
    changesSaved: true,
} : {
    selected: '',
    changesSaved: true,
    
    currentFolder: 'root',
    currentFile: '',
    openFiles: [],

    displayFolderInput: false,
    displayFileInput: false,

    allFolders: {
        name: 'root',
        id: 'root',
        folders: [],
        files: [],
    },
    allFiles: []
}
const addFolder = createAction('ADD_FOLDER');
const addFile = createAction('ADD_FILE');
const displayFolderInput = createAction('DISPLAY_FOLDER_INPUT');
const displayFileInput = createAction('DISPLAY_FILE_INPUT');
const updateFileContent = createAction('UPDATE_FILE_CONTENT');
const changeCurrentFolder = createAction('CHANGE_CURRENT_FOLDER');
const changeSelected = createAction('CHANGE_SELECTED');
const changeCurrentFile = createAction('CHANGE_CURRENT_FILE');
const addFileToOpenFiles = createAction('ADD_FILE_TO_OPEN_FILES');
const saveFile = createAction('SAVE_FILE');
const changesSaved = createAction('CHANGES_SAVED');

const folderAlreadyExists = (folders: Array<Folder>, folder: Folder) => {
    return folders.some((currFolder) => {
        return currFolder.name === folder.name;
    });
};

const fileAlreadyExists = (allFiles : Array<File>, fileToAdd : string) => {
    return allFiles.some((file) => {
        return file.id === fileToAdd;
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
            if(folder && !folderAlreadyExists(folder.folders, newFolder)){
                folder.folders.push(newFolder)
                state.currentFolder = newFolder.id;
            }
        })
        .addCase(addFile, (state, action: PayloadAction<{name: string, id: string}>) => {
            const temp = action.payload.name.split('.');
            const fileName = temp[0];
            const extension = temp[1] || 'txt';
            if(extension !== 'js' && extension !== 'txt')
                return;

            const id = action.payload.id;
            const currentFolder = state.currentFolder;
            const newFile : File = {
                name: fileName,
                extension,
                id,
                content: ''
            }
            const folder = traverseFolders(state.allFolders, currentFolder);
            if(folder && !fileAlreadyExists(state.allFiles, newFile.id)){
                folder.files.push(newFile.id);
                state.currentFile = newFile.id;
                state.openFiles.push(newFile.id);
                state.allFiles.push(newFile);
            }
        })
        .addCase(displayFileInput, (state, action: PayloadAction<boolean>) => {
            state.displayFileInput = action.payload;
        })
        .addCase(displayFolderInput, (state, action : PayloadAction<boolean>) => {
            state.displayFolderInput = action.payload;
        })
        .addCase(changeCurrentFolder, (state, action: PayloadAction<{folderId: string}>) => {
            const folderId = action.payload.folderId;
            state.currentFolder = folderId;
        })
        .addCase(changeSelected, (state, action: PayloadAction<{id: string}>) => {
            state.selected = action.payload.id
        })
        .addCase(changeCurrentFile, (state, action: PayloadAction<{id: string}>) => {
            const fileId = action.payload.id;
            state.currentFile = fileId;
        })
        .addCase(updateFileContent, (state, action: PayloadAction<{id: string, content: string}>) => {
            const fileToUpdate = action.payload.id;
            const content = action.payload.content;

            for(let i = 0; i < state.allFiles.length; i++){
                if(state.allFiles[i].id === fileToUpdate){
                    state.allFiles[i].content = content;
                    return;
                }  
            }
        })
        .addCase(saveFile, (state) => {
            localStorage.setItem('editor_state', JSON.stringify(state))
        })
        .addCase(changesSaved, (state, action: PayloadAction<{saved: boolean}>) => {
            state.changesSaved = action.payload.saved;
        })
        .addCase(addFileToOpenFiles, (state, action: PayloadAction<{id: string}>) => {
            const fileToAdd = action.payload.id;
            const alreadyExists = state.openFiles.some((fileId) => {
                return fileToAdd === fileId;
            });
            if(!alreadyExists) 
                state.openFiles.push(fileToAdd);
        })
});

export default folderReducer;