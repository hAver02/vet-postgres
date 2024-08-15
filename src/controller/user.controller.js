const userModel = require("../model/user.model");
const bcript = require("bcryptjs");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if(!username || !password || !email) return res.status(400).json({ ok : false, message : "Bad Request"})

        const user = await userModel.findByEmail(email);
        if(user) return res.json({ok : false, message : "Email already exist"})

        const salt = await bcript.genSalt(10);
        const hashedPassword = await bcript.hash(password, salt);


        const data = await userModel.create({username, email, password : hashedPassword});
        delete data.password;
        const token = jwt.sign(data, 'SECRET-WORD', {expiresIn : '24h'});
        // console.log(token);
        res.cookie('token', token);

        return res.json({ok : true, message : data})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg : 'Error server'
        })
    }
}

const login = async (req, res) => {
    try {
        const {email ,password } = req.body;
        if(!email || !password)  return res.json({ok : false, msg : "Email and password are neccesary"});

        const user = await userModel.findByEmail(email);
        if(!user) return res.json({ ok : false, msg: 'Email does not exist'});

        const comparePass = await bcript.compare(password, user.password);
        if(!comparePass) return res.json({ ok : false , msg : "Password incorrect"})
        

        delete user.password;
        const token =  jwt.sign(user, 'SECRET-WORD', {expiresIn : '24h'});
        res.cookie('token', token);
        return res.json({ ok : true, msg : 'Login succesfully'})

    } catch (error) {
        console.log(error.message);
        res.json({ok : false, msg : 'error in the login'})
    }
}

const getAll = async (req,res) => {
    try {
       const users = await userModel.findAll();
       res.json({ok : true, users : users});
    } catch (error) {
        console.log(error);
        res.json({ok : false, msg : 'Error'})
    }
}

const getById = async (req, res) => {
    const {email} = req.params;
    // console.log('email', email);
    if(!email) return res.json({ ok : false, msg : 'Not email sent'});

    try {
        const user = await userModel.findByEmail(email);
        if(!user) return res.json({ ok : false, msg : 'Invalid email'})
        // console.log(user);
        delete user.password
        return res.json({ ok : true, user});
    } catch (error) {
        console.log(error);
        res.json({ok : false, msg : 'error gettin user'})
    }
}

const updateCtoV = async (req , res) => {
    const { id } = req.params;

    try {
        const data = await userModel.updateClientToVet(id);
        if(!data) return res.status(400).json({ ok : false,msg : 'Did not updated any row!' });
        
        res.json({ ok : true, msg : 'Updated succesfully!'})

    } catch (error) {
        console.log(error);
        res.status(400).json({ ok : false,msg : 'Error updating 2!' })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userModel.deleteClient(id)
    } catch (error) {
        console.log(error);
        res.json({ ok : false, msg : ' Error deleting user'})
    }
}
module.exports = {register, getAll, login, getById, updateCtoV, deleteUser}