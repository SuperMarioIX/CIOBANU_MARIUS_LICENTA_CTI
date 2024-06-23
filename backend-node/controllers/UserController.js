import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';

function generateToken(user) {
    return jwt.sign(
        { _id: user._id },
        'secret123',
        { expiresIn: '30d' }
    );
}

function sanitizeUser(user) {
    const { passwordHash, ...userData } = user._doc;
    return userData;
}

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();
        const token = generateToken(user);

        const userData = sanitizeUser(user);
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: "User is not found!",
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(400).json({
                message: 'Password is incorrect!',
            });
        }

        const token = generateToken(user);

        const userData = sanitizeUser(user);
        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export const getToken = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User Not Found',
            });
        }

        const userData = sanitizeUser(user);
        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
