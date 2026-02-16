const express = require('express');
const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const envVariable = require('../config/envVariable');


const getMe = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await userModel.findById(id).select("-password");

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error" });
    }
};

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, adminKey } = req.body;

        if (!adminKey || adminKey !== envVariable.ADMIN_SECRET_KEY) {
            return res.status(403).json({ message: "Invalid Admin Key!" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Password Hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const adminUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role: "admin",
        });


        res.status(201).json({
            success: true,
            message: "Admin registered successfully!",
            data: adminUser
        });

    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

const createUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        // empty field check
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields required!"
            })
        }

        //existing user
        const findExistingUser = await userModel.findOne({ email });

        if (findExistingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exist!'
            })
        }

        // Password Hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        // Create user
        const createdUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        //Token generation
        const token = jwt.sign({ id: createdUser._id }, envVariable.ACCESS_TOKEN, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24,
        })


        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            data: createdUser,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields required to be filled!"
            })
        }

        //check user exist or not
        const ExistingUser = await userModel.findOne({ email })

        if (!ExistingUser) {
            return res.status(404).json({
                success: false,
                message: "User with email not found!"
            })
        }

        // checking password is correct or not
        const checkPassword = await bcrypt.compare(password, ExistingUser.password)
        if (!checkPassword) {
            return res.status(404).json({
                success: false,
                message: "Password is incorrect"
            })
        }

        //Token generate
        const token = jwt.sign({ id: ExistingUser._id, role: ExistingUser.role }, envVariable.ACCESS_TOKEN, { expiresIn: '1d' })


        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "Login succesfully!",
            token,
            role: ExistingUser.role,
            data: ExistingUser
        })


    } catch (error) {
        res.status(509).json({
            success: false,
            message: "Somthing went wrong!"
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data provided to update",
            });
        }

        // Checking user exists or not
        const findUser = await userModel.findById(id);
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Email duplicate check
        if (data.email && data.email !== findUser.email) {
            const emailExists = await userModel.findOne({ email: data.email });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                });
            }
        }

        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }

        // Updating user
        const updatedUser = await userModel
            .findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .select("-password");

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { id } = req.user;
        const token = req.cookies.token;
        const findUser = await userModel.findById(id);

        if (!findUser) {
            res.status(400).json({
                success: false,
                message: 'No user found',
            })
        }
        res.clearCookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            message: "Logout successfully"
        });



    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}




module.exports = { createUser, loginUser, logoutUser, updateUser, registerAdmin, getMe }