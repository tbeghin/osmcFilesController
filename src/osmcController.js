const fs = require('fs');
const q = require('q');
const testFolder = './tests/';

function getFilesInFolder() {
    let defer = q.defer();
    fs.readdir(testFolder, (err, files) => {
        let fileTree = {
            file: [],
            directory: []
        };
        files.forEach(file => {
            if (fs.lstatSync(`${testFolder}${file}`).isDirectory()) {
                fileTree.directory.push(file)
            }
            else {
                fileTree.file.push(file)
            }
        });

        defer.resolve(fileTree);
    });

    return defer.promise;
}

function updateNameFile(before, after) {
    let defer = q.defer();
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
                    defer.reject({status: 500, message: err});
                }
                else {
                    defer.resolve();
                }
            }
        );
    }
    return defer.promise;
}

module.exports = {
    getFilesInFolder: getFilesInFolder,
    updateNameFile: updateNameFile
};