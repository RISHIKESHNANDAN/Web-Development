const Joi = require('joi');


module.exports.listingSchema = Joi.object({
  Listing: Joi.object({
    title: Joi.string().required(),  
    description: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().uri().allow("",null),
  }).required(),
});