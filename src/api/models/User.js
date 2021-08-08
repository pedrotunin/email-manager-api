const connection = require('../database/config');

class User {

    async create(user) {

        try {

            const newUser = await connection.insert({
                email: user.email,
                pwd: user.pwd
            }).into('users');

            if (newUser) return newUser;
            else return undefined;
            
        } catch (error) {
            console.log(error);
            return undefined;
        }

    }

    async findByEmail(email) {

        try {
            
            const fields = ['id', 'email', 'pwd'];
            const user = await connection.select(fields).from('users').where( { email: email } );

            if (user == undefined || user == null || user.length == 0)
                return undefined;

            return user[0];

        } catch (error) {
            //TODO: handle error
            return undefined;
        };

    }


}

module.exports = new User();