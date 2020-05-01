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
        if (err) return res.status(400).json({ success: false, message: 'error in update', err });
        else if (updated.n > 0 && updated.nModified > 0) {
            return res.status(200).json({ success: true, message: 'scuccessfully', });
        }
        return res.status(201).json({
            success: false, message: 'already updated',
        });
    })

}
    
module.exports = [userData, updateUser]
   