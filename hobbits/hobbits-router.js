const express = require("express")
const Hobbits = require("./hobbits-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.status(200).json(await Hobbits.find())
	} catch(err) {
		next(err)
	}
})
router.get("/:id", async (req, res, next) => {
	try{
		const hobbit = await Hobbits.findById(req.params.id)
		if(!hobbit) {
			return res.status(404).json({
				message: "hobbit not found"
			})
		}else{
			res.status(200).json(hobbit)}
	}catch(err){
		next(err)
	}
})
router.post("/", async (req, res, next) => {
	try{
const newHobbit = await Hobbits.create({
	name: req.body.name
})
res.status(201).json(newHobbit)
	}catch(err){
		next(err)
	}
})

module.exports = router