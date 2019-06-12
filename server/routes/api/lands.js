const express = require("express");
const router = express.Router();
const Land = require("../../models/Land");

router.post("/createland", (req, res) => {
    Land.find({}).then((lends)=>{
      const newLand = new Land({
        landName: req.body.landName,
        currentOwner: req.body.currentOwner,
        landId:lends.length,
        history: [{ OwnerAddress: req.body.OwnerAddress,
                    username: req.body.username,
                    reciept: req.body.reciept }]
    });

    newLand
    .save()
    .then(land => res.json(land))
    .catch(err => console.log(err));
    }).catch((err)=> console.log(err));

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

router.post("/transfer-land", (req, res) => {
  var data = {
    "reciept":req.body.reciept,
    "ownerAddress":req.body.ownerAddress,
    "username": req.body.username
  }
  Land.update(
    { landId: req.body.landId },
    { $push: { history: data } }
    ).then((data)=>{

      Land.findOneAndUpdate({ landId: req.body.landId },
           { currentOwner: req. body.username })
          .then((data)=>{
            res.status(200).json({ success:true });
          })
          .catch((err)=>{console.log(err)})
    })
    .catch((err)=> { console.log(err)});


});
module.exports = router;
