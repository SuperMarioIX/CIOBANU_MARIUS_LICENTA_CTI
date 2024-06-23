import express from 'express';

import upload from './config/storageConfig.js';
import { postCreateValidation, registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import { register, login, getToken } from './controllers/UserController.js';
import { connectDB } from './config/db.js';
import { create, getAll, getOne, remove, update, getLastTags } from './controllers/PostController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
import cors from 'cors'

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.post('/auth/login', handleValidationErrors, login);
app.get('/auth/me', checkAuth, getToken);
app.post('/auth/register', registerValidation, handleValidationErrors, register);

app.post('/posts', checkAuth, postCreateValidation, create);
app.get('/tags', getLastTags);
app.get('/posts/tags', getLastTags);
app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.delete('/posts/:id', checkAuth, remove);
app.patch('/posts/:id', checkAuth, update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
