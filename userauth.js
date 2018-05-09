
const jwt = require('jsonwebtoken');
const User = require('./models/user.model');
const mongoose = require('mongoose');

module.exports = function(req, res, next) {
    let token = (req.get('Authorization') || '').split(' ');
    //console.log(token);


	if (token[1] === 'null' || token[1] === 'undefined' || token[1] === null) {	
		return res.status(401).send({
			status: 'Unauthorized',
			msg: 'No Token Present'
		});
    }
    


    // check for Bearer token
    

	if (!token[0]) {
		return res.status(401).send({
			status: 'Unauthorized',
			msg: 'No Token Present'
		});
	}
	if (token[0] != 'Bearer') {
		return res.status(401).send({
			status: 'Unauthorized',
			msg: 'No Token Present'
		});
    }
    

   
    

    let payload = jwt.decode(token[1]);
    jwt.verify(token[1],'secret', function(err, decoded) {
     //   console.log(decoded);
        if (err) {
            return res.status(401).send({
                status: 'Unauthorized',
                msg: 'Token Expired'
            });
        }

       // console.log(decoded._id)

        User.count(
            { _id: mongoose.Types.ObjectId(decoded._id) },
            (err, count) => {
            //    console.log(count);
                if (err) {
                    return res.status(500).send({
                        status: 'Failed',
                        msg: err
                    });
                }
                if (count < 1) {
                    return res.status(401).send({
                        status: 'Failed',
                        msg: 'No User Found'
                    });
                }
                else
                {
                    res.locals.userId = decoded._id;
                }
                next();
            }
        );
    });

	
};
