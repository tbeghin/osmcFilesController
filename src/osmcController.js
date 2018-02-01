const fs = require('fs');
const path = require('path');
// const Observable = require('rxjs/Observable');

const targetDir = path.resolve(__dirname, '../testFolder/');

const mode = '0777'; // Authorisation sur le dossier.

getFilesInFolder = (sourceDir) => {
    sourceDir = sourceDir || '';
    let newPath = path.join(targetDir, sourceDir);
    return new Promise((resolve, reject) => {
        fs.readdir(newPath, (err, files) => {
            if (err) {
                reject({status: 500, message: err});
            }
            else {
                let result = [];
                files.forEach(file => {
                    if (fs.statSync(path.join(newPath, file)).isDirectory()) {
                        result.push({name: file, isFolder: true});
                    }
                    else {
                        result.push({name: file, isFolder: false});
                    }
                });
                resolve({path: path.relative(targetDir, newPath), files: result});
            }
        });
    })
};

addFolder = (sourceDir, folderName) => {
    let newPath = path.join(targetDir, sourceDir, folderName);
    return new Promise((resolve, reject) => {
        fs.mkdir(newPath, mode,
            function (err) {
                if (err) {
                    reject({status: 500, message: err});
                }
                else {
                    let relativePath = path.relative(targetDir, newPath);
                    resolve(relativePath);
                }
            })
    });
};

updateNameFile = (before, after) => {
    return new Promise((resolve, reject) => {
        if (!before) {
            defer.reject({status: 412, message: 'Paramètre "before" non trouvé'});
        }
        if (!after) {
            defer.reject({status: 412, message: 'Paramètre "after" non trouvé'});
        }
        else {
            console.log(`${before} -> ${after}`);
            let pathNameBefore = `${testFolder}${before}`;
            let pathNameAfter = `${testFolder}${after}`;
            fs.rename(pathNameBefore, pathNameAfter,
                function (err) {
                    if (err) {
                        reject({status: 500, message: err});
                    }
                    else {
                        resolve();
                    }
                }
            );
        }
    });
};

module.exports = {
    getFilesInFolder: getFilesInFolder,
    updateNameFile: updateNameFile,
    addFolder: addFolder
};