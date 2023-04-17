const router = require("express").Router()
const  {Rooms,Messages } = require("../models")


router.get("/",(req,res)=>{
    res.json({msg:"route is working on rooms"})
})

router.post("/messages/new",async (req,res)=>{
    const dbMessage = await req.body;
    Messages.create( dbMessage ).then((data,err)=>{
        if(data){
            return res.status(200).send(data)
        }
        else{
            return res.status(500).send(err)
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })

})

router.post("/group/create", async(req,res)=>{
    const name = await req.body.groupName
    const groupName = await Rooms.create({ name }).then((data,err)=>{
        if(data){
            return res.status(200).send(data)
        }
        else{
            return res.status(500).send(err)
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })

})

router.get("/all/rooms",(req,res)=>{
    Rooms.find({}).then((data,err)=>{
        if(data){
            return res.status(200).send(data)
        }
        else{
            return res.status(500).send(err)
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })
})
router.get("/:id",async(req,res)=>{
   await Rooms.find({_id:req.params.id}).then((data,err)=>{
        if(data){ 
            return res.status(200).send(data[0])
        }
        else{
            return res.status(500).send(err)
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

router.get("/msg/:id", async(req,res)=>{
   await Messages.find({roomId:req.params.id}).then((data,err)=>{
        if(data){ 
            return res.status(200).send(data)
        }
        else{
            return res.status(500).send(err)
        }
    }).catch((err)=>{
        res.status(500).send(err)
    })
})
module.exports=router;

  