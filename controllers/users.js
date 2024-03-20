// const { models: {User}} = require('../models');

// module.exports = {
//     create : async (req,res) => {
//         if (req.body.username && req.body.password) {
//             const {username, password} = req.body;

//             await User.create({
//                 username,
//                 password
//             });

//             res.render('home.ejs');
//         } else {
//             res.render('register.ejs');
//         }
//     }
// }

import db from '../models/index.js';

export const create = async (req, res) => {
    try {
        if (req.body.username && req.body.password) {
            const { username, password } = req.body;
            await db.models.User.create({
                username,
                password
            });
    
            res.redirect('/home');
        } else {
            res.redirect('/register');
        }
    } catch (err) {
        console.log(err);
        res.redirect('/register');
    }
    
};
