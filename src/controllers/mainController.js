const userDb = require('../schemas/userSchema');

module.exports = {
    create: (req, res) => {

        if (!req.body){
            res.status(400).send({ msg: "Cannot be empty"});
            return;
        }

        // new user
        const user = new userDb({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
        })

        user.save().then(() => {
            console.log("user created");
            res.send({message: "Added user"});
        }).catch(e => {
            console.log(e);
            console.log("Error creating user");
            res.send({message: "Error creating user"});
        });
    },
    find: (req, res) => {
        res.send('working api');
    },
    update: (req, res) => {
        res.send('working');
    },
    delete: (req, res) => {
        res.send('working');
    }
}
