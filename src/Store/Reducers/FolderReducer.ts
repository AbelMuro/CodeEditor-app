import {createReducer, createAction} from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit'

type File = {
    name: string,
    extension: string,
    content: string,
    id: string
}

type Folder = {
    open: boolean,
    name: string,
    id: string,
    folders: Array<string>,
    files: Array<string>
}

type AllFiles = {
    [key: string]: File
}

type AllFolders = {
    [key: string]: Folder
}

type InitialState = {
    selected: string,
    changesSaved: boolean,

    currentFolder: string,
    currentFile: string | null,
    openFiles: Array<string>,

    displayFolderInput: boolean,
    displayFileInput: boolean,

    allFolders: AllFolders,
    allFiles: AllFiles
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

    allFiles: {},
    allFolders: {
        'root': {
            name: 'root',
            id: 'root',
            folders: [],
            files: [],
        }},
}
const addFolder = createAction('ADD_FOLDER');
const addFile = createAction('ADD_FILE');
const deleteFolder = createAction('DELETE_FOLDER')
const displayFolderInput = createAction('DISPLAY_FOLDER_INPUT');
const displayFileInput = createAction('DISPLAY_FILE_INPUT');
const updateFileContent = createAction('UPDATE_FILE_CONTENT');
const changeCurrentFolder = createAction('CHANGE_CURRENT_FOLDER');
const changeSelected = createAction('CHANGE_SELECTED');
const changeCurrentFile = createAction('CHANGE_CURRENT_FILE');
const addFileToOpenFiles = createAction('ADD_FILE_TO_OPEN_FILES');
const saveFile = createAction('SAVE_FILE');
const changesSaved = createAction('CHANGES_SAVED');
const openFolder = createAction('OPEN_FOLDER');

const folderAlreadyExists = (foldersId: Array<string>, folder: Folder, allFolders: AllFolders) => {
    return foldersId.some((currFolderId) => {
        return allFolders[currFolderId].name === folder.name;
    });
};

const fileAlreadyExists = (allFiles : Array<File>, fileToAdd : string) => {
    return allFiles.some((file) => {
        return file.id === fileToAdd;
    })
}

const traverseFolders = (currFolder : Folder, id: string, allFolders: AllFolders) => {
    if(currFolder.id === id)
        return currFolder
    
    for(let i = 0; i < currFolder.folders.length; i++){
        const folderId = currFolder.folders[i];
        return traverseFolders(allFolders[folderId], id, allFolders);
    }
}


const folderReducer = createReducer(initialState, builder => {
    builder 
        .addCase(addFolder, (state, action: PayloadAction<{name: string, id: string}>) => {
            const folderName = action.payload.name;
            const folderId = action.payload.id;
            const currentOpenFolder = state.currentFolder;
            const allFolders = state.allFolders;
            const rootFolder = state.allFolders.root;
            const newFolder : Folder = {
                open: false,
                name: folderName,
                id: folderId,
                folders: [],
                files: []
            };
            const folder = traverseFolders(rootFolder, currentOpenFolder, allFolders);
            if(folder && !folderAlreadyExists(folder.folders, newFolder, allFolders)){
                folder.folders.push(newFolder.id);
                state.currentFolder = newFolder.id;
                state.allFolders[newFolder.id] = newFolder;
            }
        })
        .addCase(addFile, (state, action: PayloadAction<{name: string, id: string}>) => {
            const allFolders = state.allFolders;
            const rootFolder = state.allFolders.root;
            const temp = action.payload.name.split('.');
            const fileName = temp[0];
            const extension = temp[1] || 'txt';
            if(extension !== 'js' && extension !== 'txt')
                return;

            const id = action.payload.id;
            const currentOpenFolder = state.currentFolder;
            const newFile : File = {
                name: fileName,
                extension,
                id,
                content: ''
            }
            const folder = traverseFolders(rootFolder, currentOpenFolder, allFolders);
            if(folder && !fileAlreadyExists(Object.values(state.allFiles), newFile.id)){
                folder.files.push(newFile.id);
                state.currentFile = newFile.id;
                state.openFiles.push(newFile.id);
                state.allFiles[newFile.id] = newFile;
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
            const fileIdToUpdate = action.payload.id;
            const content = action.payload.content;
            state.allFiles[fileIdToUpdate].content = content;
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
        .addCase(openFolder, (state, action: PayloadAction<{id: string}>) => {
            const id = action.payload.id;
            state.allFolders[id].open = !state.allFolders[id].open
        })
        .addCase(deleteFolder, (state, action: PayloadAction<{id: string}>) => {
            const folderId = action.payload.id;
            const folderToBeDeleted = state.allFolders[folderId]
            const allFolders = state.allFolders;
            const allFiles = state.allFiles;            
            const subFoldersToBeDeleted = folderToBeDeleted.folders;
            const subFilesToBeDeleted = folderToBeDeleted.files;
            const allFoldersArray = Object.entries(allFolders);

            for(let i = 0; i < allFoldersArray.length; i++)
                for(let j = 0; j < allFoldersArray[i][1].folders.length; j++)
                    if(allFoldersArray[i][1].folders[j] === folderId)
                        allFoldersArray[i][1].folders.splice(j, j + 1);
            
            for(let i = 0; i < subFoldersToBeDeleted.length; i++)
                delete allFolders[subFoldersToBeDeleted[i]];                
            
            for(let i = 0; i < subFilesToBeDeleted.length; i++)
                delete allFiles[subFilesToBeDeleted[i]];
                
            delete state.allFolders[folderId]
        })
});

export default folderReducer;