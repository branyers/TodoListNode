const {users}  = require('../models')

const newUser = async({firstname, lastname, email, password}) => {
    try {
       let user = await users.create({firstname, lastname, email, password});
       return user;

    } catch (error) {
        throw new Error("No se pudo crear el nuevo usuario")
    }
}

module.exports = {
    newUser,
}