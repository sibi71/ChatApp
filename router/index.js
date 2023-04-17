const router = require("express").Router()
const RoomsRoute = require("./Rooms")

router.use("/rooms", RoomsRoute)

module.exports = router