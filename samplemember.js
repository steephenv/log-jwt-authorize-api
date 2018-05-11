const lme = require("lme");


module.exports = (req,res) => {
    lme.i('successfully accessed samplemember page');
    return res.status(200).send({
        status: 'Success',
        msg : 'successfully accessed'
    });

}