const express = require("express");
const router = express.Router();
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
      

router.post("/getland", (req, res) => {
    Land.find({ _id : req.body.id,currentOwner:req.body.currentOwner }).then(land => {
       if (land) {
        return res.status(200).json({ land:land });
      } else {
        return res.status(400).json({ response:"No land found" });
      }
    });
});


router.get("/getallland", (req, res) => {
    
    Land.find().then(land => {
       if (land) {
        return res.status(200).json({ land:land });
      } else {
        return res.status(400).json({ response:"No land found" });
      }
    });
});


router.post("/get-land-by-owner", (req, res) => {
    Land.find({currentOwner:req.body.currentOwner}).then(land => {
       if (land) {
        return res.status(200).json({ land:land });
      } else {
        return res.status(400).json({ response:"No land found" });
      }
    });
});


module.exports = router;
