const path = require('node:path');
const fs = require('node:fs');
const { uploadFileHelper } = require('../helpers/uploadFile.helper');
const { UserModel, ProductModel } = require('../models/modelsDB');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// cloudinary.config( process.env.CLOUDINARY_URL ); // tambien se puede usar esta forma si tienes la URL completa

const uploadFile = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0, !req.files.fileA) {
            res.status(400).json({ error: 'No files were uploaded.' });
            return;
        }
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'docx', 'txt', 'md'];
        const uploadPath = await uploadFileHelper( req.files, allowedExtensions, '' )
        res.status(200).json({ message: 'File uploaded successfully!', uploadPath });
    } catch (error) {
        console.error('Error in uploadFile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const uploadFileToCollection = async (req, res) => {
    try {
        const { collection, id } = req.params;
        if (!req.files || Object.keys(req.files).length === 0, !req.files.fileA) {
            res.status(400).json({ error: 'No files were uploaded.' });
            return;
        }
        let model;
        switch (collection) {
            case 'users':
                model = await UserModel.findById(id)
                if (!model) return res.status(404).json({ error: 'User not found' });
                
                break;
            case 'products':
                model = await ProductModel.findById(id);
                if (!model) return res.status(404).json({ error: 'Product not found' });
                break;
            default:
                return res.status(500).json({ error: 'Invalid collection type' });
        }
        if(model.img) {
            // Delete the old image if it exists
            const oldImagePath = path.join(__dirname, '../uploads/', collection, model.img);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        model.img = await uploadFileHelper( req.files, allowedExtensions, collection );
        await model.save();
        res.json({
            message: 'File uploaded successfully!',
            model
        });        
    } catch (error) {
        console.error('Error in uploadFileToCollection:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


const uploadFileToCollectionWithCloudinary = async (req, res) => {
    try {
        const { collection, id } = req.params;
        if (!req.files || Object.keys(req.files).length === 0, !req.files.fileA) {
            res.status(400).json({ error: 'No files were uploaded.' });
            return;
        }
        let model;
        switch (collection) {
            case 'users':
                model = await UserModel.findById(id)
                if (!model) return res.status(404).json({ error: 'User not found' });
                
                break;
            case 'products':
                model = await ProductModel.findById(id);
                if (!model) return res.status(404).json({ error: 'Product not found' });
                break;
            default:
                return res.status(500).json({ error: 'Invalid collection type' });
        }
        if(model.img && model.img.includes('cloudinary')) {
            //borrar la imagen anterior de cloudinary
            const [name] = model.img.split('/').pop().split('.');
            cloudinary.uploader.destroy(name);
        }

        const {secure_url} = await cloudinary.uploader.upload( req.files.fileA.tempFilePath )

        model.img = secure_url;
        await model.save();
        res.json({
            message: 'File uploaded successfully!',
            model
        });        
    } catch (error) {
        console.error('Error in uploadFileToCollection:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const showImage = async (req, res) => {
    try {
        const { collection, id } = req.params;
        let model;
        switch (collection) {
            case 'users':
                model = await UserModel.findById(id)
                if (!model) return res.status(404).json({ error: 'User not found' });
                
                break;
            case 'products':
                model = await ProductModel.findById(id);
                if (!model) return res.status(404).json({ error: 'Product not found' });
                break;
            default:
                return res.status(500).json({ error: 'Invalid collection type' });
        }
        if(model.img) {
            const oldImagePath = path.join(__dirname, '../uploads/', collection, model.img);
            if (fs.existsSync(oldImagePath)) {
                return res.sendFile(oldImagePath);
            }
        }
        const defaultImagePath = path.join(__dirname, '../assets/no-image.jpg');
        return res.status(404).sendFile(defaultImagePath)
    } catch (error) {
        console.error('Error in showImage:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    uploadFile,
    uploadFileToCollection,
    showImage,
    uploadFileToCollectionWithCloudinary
};