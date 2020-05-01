const schema = require('../../schema/users');
const crud = require('../../schema/crud');

let userData = (req, res) => {
  
    let address = {
        city: req.body.address.city,
        phoneNo: req.body.address.phoneNo
    }
    let data = {};
    data.name = req.body.name;
    data.address = address;
  
    crud.create(data, schema, (err, created) => {
        if (err)
        return res.status(400).json({
            success: false, message: 'Unable to create user',
        })
        else
        return res.status(200).json({
            success: true, message: 'user created successfully',
        })
      
    })
}
    
module.exports = [userData]
   