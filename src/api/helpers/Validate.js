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

}

module.exports = new Validate();