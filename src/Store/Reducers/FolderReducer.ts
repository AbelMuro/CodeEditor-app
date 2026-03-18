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
    files: Array<File>
}

type InitialState = {
    selected: string,
    changesSaved: boolean,
    currentFolder: string,
    currentFile: File | null,
    openFiles: Array<File>
    displayFolderInput: boolean,
    displayFileInput: boolean,
    allFolders: Folder
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
    currentFile: null,
    openFiles: [],
    displayFolderInput: false,
    displayFileInput: false,
    allFolders: {
        name: 'root',
        id: 'root',
        folders: [],
        files: [],
    }
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

const fileAlreadyExists = (files : Array<File>, file : File) => {
    return files.some((currFile) => {
        return currFile.name === file.name;
    });
}

const traverseFolders = (currFolder : Folder, id: string) => {
    if(currFolder.id === id)
        return currFolder
    
    for(let i = 0; i < currFolder.folders.length; i++){
        const folder = currFolder.folders[i];
        return traverseFolders(folder, id);
    }
}

const traverseFiles = (currFolder: Folder, id: string) => {
    const files : Array<File> = currFolder.files;
    const folders : Array<Folder> = currFolder.folders;

    for(let i = 0; i < files.length; i++){
        if(files[i].id === id)
            return files[i];
    }

    for(let i = 0; i < folders.length; i++){
        return traverseFiles(folders[i], id)
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
            if(folder && !fileAlreadyExists(folder.files, newFile)){
                folder.files.push(newFile);
                state.currentFile = newFile;
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
            const file = traverseFiles(state.allFolders, fileId);
            state.currentFile = file;
        })
        .addCase(updateFileContent, (state, action: PayloadAction<{content: string}>) => {
            state.currentFile.content = action.payload.content
        })
        .addCase(saveFile, (state) => {
            const fileId = state.currentFile.id;
            const content = state.currentFile.content;
            const name = state.currentFile.name;
            const file = traverseFiles(state.allFolders, fileId);
            file.content = content;
            file.name = name;
            localStorage.setItem('editor_state', JSON.stringify(state))
        })
        .addCase(changesSaved, (state, action: PayloadAction<{saved: boolean}>) => {
            state.changesSaved = action.payload.saved;
        })
        .addCase(addFileToOpenFiles, (state, action: PayloadAction<{file: File}>) => {
            const file = action.payload.file;
            state.openFiles.push(file);
        })
});

export default folderReducer;