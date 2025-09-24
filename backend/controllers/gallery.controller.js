const {Gallery} =require('../models/index');

const fs=require('fs');

// print all gallery
async function listGallery(req, res, next) {
    try {
        res.json(await Gallery.findAll({ order: [['id', 'DESC']] }));
    } catch (err) {
        next(err);
    }
}

// add new image to gallery
 async function addGallery(req, res, next) {
    try {
        const record = await Gallery.create({ image_path: req.file.path, about: req.body.about });
        res.status(201).json(record);
    } catch (err) { next(err); }
}

// delete image from gallery
async function deleteGallery(req, res, next) {
    try {
        const img = await Gallery.findByPk(req.params.id);
        if (img) fs.unlinkSync(img.image_path);
        await img.destroy();
        res.json({ message: 'Deleted' });
    } catch (err)
     { next(err); }
}

module.exports={listGallery,addGallery,deleteGallery};

