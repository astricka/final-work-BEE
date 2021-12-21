const userDb = require('../schemas/userSchema');

module.exports = {
    create: (req, res) => {
        if (!req.body) {
            res.status(400).send({msg: 'Cannot be empty'});
            return;
        }

        const user = new userDb({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
        });

        user.save().then(() => {
            console.log('user created');
            res.send({message: 'Added user'});
        }).catch(e => {
            console.log(e);
            console.log('Error creating user');
            res.send({error: 'Error creating user'});
        });
    },
    find: (req, res) => {
        if (req.query.id) {
            const id = req.query.id;
            userDb.findById(id)
                .then(data => {
                    if (!data) {
                        res.status(404).send({message: 'User not found'});
                    } else {
                        res.send(data);
                    }
                })
                .catch(err => {
                    res.status(500).send({message: 'Error getting  user'});
                });

        } else {
            userDb.find()
                .then(user => {
                    res.send(user);
                })
                .catch(err => {
                    res.status(500).send({err, message: 'Error on on finding users'});
                });
        }
    },
    update: (req, res) => {
        if (!req.body) {
            return res
                .status(400)
                .send({message: 'Data cannot be empty'});
        }

        const id = req.params.id;
        userDb.password = req.body.newPassword;
        console.log(req.body);
        userDb.findByIdAndUpdate(id, req.body)
            .then(data => {
                if (!data) {
                    res.status(400).send({message: 'Cannot update user'});
                } else {
                    console.log(req.body);
                    res.send({data, message: 'Success'});
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).send({error, message: 'Error updating user'});
            });
    },
    delete: (req, res) => {
        const id = req.params.id;
        userDb.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({message: `Cannot delete with ${id}`});
                } else {
                    res.send({
                        message: 'User was deleted successfully!'
                    });
                }
            })
            .catch(error => {
                res.status(500).send({
                    message: 'Could not delete user with id' + id
                });
            });
    }
};
