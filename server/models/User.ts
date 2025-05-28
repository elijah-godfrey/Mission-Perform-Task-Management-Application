import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// User interface
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isValidPassword(candidatePassword: string): Promise<boolean>;
}

// User schema
const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {    
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
}, {
    timestamps: true
});

// Hashes the password before saving the user
UserSchema.pre<IUser>('save', async function () {
    try {
        // Checks if password has been modified
        if (!this.isModified('password')) return;

        // Generates a salt and hashes the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw err;
    }
});

// Compares the candidate password with the hashed password and returns true
// if they match
UserSchema.methods.isValidPassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);