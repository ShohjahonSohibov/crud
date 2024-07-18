import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import sequelize from '../util/db.js';

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4, 100],  // Minimum length 4 characters
                msg: 'Password must be at least 4 characters long'
            }
        }
    },
}, {
    timestamps: true
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

export default User;
