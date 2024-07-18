import User from '../models/user.js'; 

const createUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user with the same username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create the new user
        const newUser = await User.create({
            username,
            password
        });

        res.status(200).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    createUser
}