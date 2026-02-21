import React, {useState, useEffect} from 'react';
import {LayoutGroup} from 'framer-motion';
import Folder from './Folder';
import AddFile from './AddFile';
import AddFolder from './AddFolder';
import * as styles from './styles.module.css';

/* 
    {
        folderNameOne: {
            type: 'folder'
            fileName: {
                type: 'file'
                name: ''
                extension: '',
                content: ''
            },
            folderNameTwo: {
                type: 'folder'
                fileName: {
                    type: 'file'
                    name: '',
                    extension: '',
                    content: ''
                    
            }
        }
    }
*/

function FileManager() {
    const [folders, setFolders] = useState({
            folder: {
                name: 'public',
                folder: {
                    name: 'fonts',
                    file: {
                        name: 'myFont',
                        extension: 'ttf',
                        content: ''
                    }
                },
                file: {
                    name: 'example',
                    extension: 'js',
                    content: '',
                }
            },
            folder: {
                name: 'node_modules',
                file: {
                    name: 'anotherExample',
                    extension: 'js',
                    content: '',
                }
            }
    });

    useEffect(() => {

    }, [])

    return (
        <aside className={styles.files}>
            <div className={styles.files_commands}>
                <AddFile/>
                <AddFolder/>
            </div> 
            <div className={styles.folders}> 
                <LayoutGroup>
                    <Folder name={'public'}/>    
                </LayoutGroup>          
            </div>
        </aside>
    )
}

export default FileManager;