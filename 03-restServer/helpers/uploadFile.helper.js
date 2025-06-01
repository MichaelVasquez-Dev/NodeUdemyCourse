const { v4: uuid  } = require('uuid');
const path = require('node:path');

const uploadFileHelper = async (files, exts, folder = '') => {

    return new Promise(( rsv, rej )=>{
        const { fileA } = files;
        const ext = fileA.name.split('.').pop();
    
        // const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'docx', 'txt'];
        if (!exts.includes(ext)) return rej({ error: 'Invalid file type. Allowed types are: ' + exts.join(', ') });
    
        const nameTemp = uuid() + '.' + ext;
        const uploadPath =  path.join( __dirname, '../uploads/', folder, nameTemp);
    
        fileA.mv(uploadPath, (err) => {
            if (err) return rej({ error: 'File upload failed.', details: err });
            rsv(nameTemp);
        });
    })
}

module.exports = {
    uploadFileHelper
}