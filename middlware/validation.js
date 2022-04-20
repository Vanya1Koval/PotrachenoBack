const joi = require('joi'); 

const userSchema = joi.object({ 
    _id: joi.string().optional(),
    name: joi.string().min(2).max(15).required(), 
    login: joi.string().min(5).max(15).required(), 
    password: joi.string().min(8).max(16).required()
});
    
const validation = () => async (req, res, next) => {
    try {
        await userSchema.validateAsync(req.body);
        next();
    } catch (err){
        res.status(400).send(err.details);
    }
}

module.exports = validation;
