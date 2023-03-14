const express = require('express');
const { session } = require('passport');
const router = express.Router();
const passport = require('passport');


router.post('/login', passport.authenticate('local', {session: false}), async (req, res) => {
    try {
        console.log(req.user);
        res.json(req.user);
    }catch (error) {
        done(error);
    }
})

router.post('/logout', )


module.exports = router; 