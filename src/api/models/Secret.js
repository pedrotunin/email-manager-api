const connection = require('../database/config');

class Secret {

    async verifySecret() {

        const res = await connection.select('*').from('secret');


        if (res.length == 0) return false;
        return true;

    }

    async createSecret(secret) {

        const res = await connection.insert({ secret }).into('secret');

        return res;

    }

    async getSecret() {
        const res = await connection.select('*').from('secret');

        return res[0];
    }

}

module.exports = new Secret();