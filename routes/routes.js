// const express = require('express');
// const router = express('router');
// const User = require('../models/user');
// const multer = require('multer');
// const fs = require('fs');

// //image upload
// var storage = multer.diskStorage({
//     destination:function(req, file, cb){
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb){
//         cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);

//     },
// });

// var upload = multer({
//     storage: storage,
// }).single('image');

// //insert an user into database route
// router.post("/add", upload, (req, res) => {
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         image: req.file.filename,
//     });

//     user.save()
//         .then(() => {
//             req.session.message = {
//                 type: "success",
//                 message: "User Added Successfully !"
//             };
//             res.redirect("/");
//         })
//         .catch((err) => {
//             res.json({ message: err.message, type: "danger" });
//         });
// });
// //get all users route

// router.get("/", (req, res) => {
//     User.find()
//         .exec()
//         .then((users) => {
//             res.render('index', {
//                 title: 'Home Page',
//                 users: users,
//             });
//         })
//         .catch((err) => {
//             res.json({ message: err.message });
//         });
// });


// router.get("/add", (req, res) =>{
//     res.render('add_users', { title: 'Add Users'});
// });


// // edit an user route
// router.get('/edit/:id', async (req, res) => {
//     try {
//         let id = req.params.id;
//         const user = await User.findById(id).exec();

//         if (!user) {
//             res.redirect("/");
//         } else {
//             res.render("edit_users", {
//                 title: "Edit User",
//                 user: user,
//             });
//         }
//     } catch (err) {
//         console.error(err);
//         res.redirect("/");
//     }
// });


// // update user route
// router.post('/update/:id', upload, async (req, res) => {
//     try {
//         let id = req.params.id;
//         let new_image = '';

//         if (req.file) {
//             new_image = req.file.filename;
//             try {
//                 fs.unlinkSync('./uploads/' + req.body.old_image);
//             } catch (err) {
//                 console.log(err);
//             }
//         } else {
//             new_image = req.body.old_image;
//         }

//         const updatedUser = await User.findByIdAndUpdate(id, {
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             image: new_image,
//         }, { new: true }); // Add { new: true } to get the updated user

//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found", type: "danger" });
//         }

//         req.session.message = {
//             type: "success",
//             message: "User Updated Successfully!",
//         };

//         // Redirect to the index page after successful update
//         res.redirect("/");
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: err.message, type: "danger" });
//     }
// });

// //delete user
// router.get('/delete/:id', (req, res) => {

//     let id = req.params.id;
//     User.findByIdAndDelete(id, (err, result) =>{
//         if(result.image != ''){
//             try{
//                 fs.unlinkSync('./uploads/' + result.image);
//             }catch(err){
//                 console.log(err);
//             }
//         }
//         if(err){
//             res.json({ message: err.message});
//         } else{
//             req.session.message = {
//                 type: 'info',
//                 message: 'User deleted successfully!'
//             };
//             res.redirect("/");
//         }
//     }); 
// });




// module.exports = router;





const express = require('express');
const router = express('router');
const User = require('../models/user');
const multer = require('multer');
const fs = require('fs');

//image upload
var storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+""+Date.now()+""+file.originalname);

    },
});

var upload = multer({
    storage: storage,
}).single('image');

//insert an user into database route
router.post("/add", upload, (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });

    user.save()
        .then(() => {
            req.session.message = {
                type: "success",
                message: "User Added Successfully !"
            };
            res.redirect("/");
        })
        .catch((err) => {
            res.json({ message: err.message, type: "danger" });
        });
});
//get all users route

router.get("/", (req, res) => {
    User.find()
        .exec()
        .then((users) => {
            res.render('index', {
                title: 'Home Page',
                users: users,
            });
        })
        .catch((err) => {
            res.json({ message: err.message });
        });
});


router.get("/add", (req, res) =>{
    res.render('add_users', { title: 'Add Users'});
});


// edit an user route
router.get('/edit/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const user = await User.findById(id).exec();

        if (!user) {
            res.redirect("/");
        } else {
            res.render("edit_users", {
                title: "Edit User",
                user: user,
            });
        }
    } catch (err) {
        console.error(err);
        res.redirect("/");
    }
});


// update user route
router.post('/update/:id', upload, async (req, res) => {
    try {
        let id = req.params.id;
        let new_image = '';

        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image,
        }, { new: true }); // Add { new: true } to get the updated user

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", type: "danger" });
        }

        req.session.message = {
            type: "success",
            message: "User Updated Successfully!",
        };

        // Redirect to the index page after successful update
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message, type: "danger" });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;

        // Find the user by ID
        const user = await User.findById(id).exec();

        if (!user) {
            // If the user is not found, redirect to the index page
            req.session.message = {
                type: "danger",
                message: "User not found for deletion",
            };
            res.redirect("/");
        } else {
            // Delete the user from the database using findByIdAndDelete
            await User.findByIdAndDelete(id).exec();

            // Delete the user's image file from the uploads folder
            try {
                fs.unlinkSync('./uploads/' + user.image);
            } catch (err) {
                console.log(err);
            }
            req.session.message = {
                type: "success",
                message: "User deleted successfully!",
            };
            
            res.redirect("/");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message, type: "danger" });
    }
});



module.exports = router;