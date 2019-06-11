const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");


const Land = require("../../models/Land");

router.post("/createland", (req, res) => {
    
    const newLand = new Land({
        landName: req.body.landName,
        currentOwner: req.body.currentOwner,
        history: [{ OwnerAddress: req.body.OwnerAddress, 
                    username: req.body.username }]
    });
  
    newLand
    .save()
    .then(land => res.json(land))
    .catch(err => console.log(err));
});
      

module.exports = router;
