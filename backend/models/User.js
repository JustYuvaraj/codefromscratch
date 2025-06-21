// backend/models/User.js
// This file defines the Mongoose schema for the User model.

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows null values, but ensures uniqueness for non-null values
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true // Allows null values, but ensures uniqueness for non-null values
    },
    username: {
        type: String,
        required: true,
        unique: true // Ensure usernames are unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        // Basic email validation regex
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        // Not required because OAuth users won't have passwords
    },
    name: {
        type: String,
        // Not required because some OAuth providers might not provide name
    },
    leetcodeUsername: {
        type: String,
        required: true,
        unique: true // Ensure LeetCode usernames are unique
    },
    // Profile image fields
    profileImage: {
        type: String,
        default: null
    },
    profileImageSource: {
        type: String,
        enum: ['google', 'github', 'leetcode', 'custom', 'upload'],
        default: null
    },
    // OAuth profile data
    googleProfile: {
        picture: String,
        given_name: String,
        family_name: String
    },
    githubProfile: {
        avatar_url: String,
        login: String,
        name: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a virtual field for user ID that uses leetcodeUsername
UserSchema.virtual('userId').get(function() {
    return this.leetcodeUsername;
});

// Ensure virtual fields are serialized
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);

