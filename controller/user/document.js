const crud = require('../../schema/crud')
const docSchema = require('../../schema/documents');
const userSchema = require('../../schema/users');

let userData = (req, res, next) => {
  
   let data = req.body;
  
    crud.create(data, docSchema, (err, created) => {
        if (err)
        return res.status(400).json({
            success: false, message: 'Unable to create user',
        })
        else
        req.docId = created.id;
        next(); 
      
    })
}

let updateUser = (req, res) => {
    let condition = {
        id: req.body.userId
    }


    userSchema.updateOne(condition, {
        $push: {
            documents: req.docId
        }
        }, (err, updated) => {
        if (err) return res.status(400).json({ success: false, message: 'error occured in update bank details', err });
        else if (updated.n > 0 && updated.nModified > 0) {
            return res.status(200).json({ success: true, message: 'bank details updated scuccessfully', });
        }
        return res.status(201).json({
            success: false, message: 'bank details already updated',
        });
    })

}
    
module.exports = [userData, updateUser]
   