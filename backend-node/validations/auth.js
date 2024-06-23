import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('fullName', 'Please provide a name').isLength({ min: 3 }),
    body('avatarUrl', 'Invalid avatar URL').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Invalid title format').isString().isLength({ min: 1 }),
    body('text', 'Text must be at least 5 characters').isString().isLength({ min: 5 }),
    body('tags', 'Wrong Tags format').optional().isString(),
    body('imageUrl', 'Invalid image URL').optional().isString(),
];