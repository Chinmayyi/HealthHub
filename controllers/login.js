import db from '../models/index.js';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Query the database to find the user by username
        const user = await db.models.User.findOne({ where: { username } });

        if (!user || user.password !== password) {
            // User not found or password doesn't match
            return res.redirect('/login');
        } else {
            res.redirect('/home');
        } 
    } catch (err) {
        console.log(err);
        res.redirect('/home');
    }
    
};
