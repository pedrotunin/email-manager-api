const { isEmail } = require('validator');

class Validate {

    async newEmail(email) {

        const {
            from,
            to,
            subject,
            text,
            html
        } = email;

        const errors = [];

        if (from == undefined || from == null || from.length == 0) {
            errors.push("The given 'from' is not valid.");
        }

        if (to == undefined || to == null || !isEmail(to)) {
            errors.push("The given 'to' email is not valid.");
        }

        if (subject == undefined || subject == null || subject.length == 0) {
            errors.push("The given 'subject' is not valid.");
        }

        return errors;

    }

    async validateEmail(email, errors) {

        var message = '';
        if (email == undefined) {
            message = 'No e-mail was given!';
            errors.push(new Error("name", message));
            return;
        }
        if (email == undefined || !isEmail(email)) {
            message = 'The given e-mail is invalid!';
            errors.push(new Error("email", message));
        }

    }
    
    async validatePassword(password, errors) {
    
        var error = undefined;

        if (password == undefined)
            error = new Error("password", "No password was given!")

        if (password != undefined && password.length < 6)
            error = new Error("password", "Password must be at least 6 characters long.")

        if (error != undefined) 
            errors.push(error);

    }

    async validateLogin(email, password) {
        var errors = [];

        this.validateEmail(email, errors);
        this.validatePassword(password, errors);

        return errors;
    }

}

module.exports = new Validate();