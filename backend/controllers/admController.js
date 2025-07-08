const db= require('../models');
const bcrypt = require('bcryptjs');

exports.createAdm= async(req, res) => {
    try{
        const {Nome_admin, Email_Admin, Hash_senha_Admin} = req.body
    }
}