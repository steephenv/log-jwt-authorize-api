const lme = require("lme");

module.exports = (req,res) => {
    lme.i('successfully accessed sampleoperator page');
    return res.status(200).send({
        status: 'Success',
        msg : 'successfully accessed'
    });

}