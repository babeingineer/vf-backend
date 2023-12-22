import { Router } from "express";
import communityModel from "../model/community.model";
const router = Router();

router.post("/", async (req, res) => {
    res.send(await communityModel.create({ ...req.body, signup_at: new Date() }));
});
router.put("/:id", async (req, res) => {
    res.send(await communityModel.findByIdAndUpdate(req.params.id, { ...req.body }));
});
router.get("/", async (req, res) => {
    try {
        res.send(await communityModel.find((() => {
            let obj = {};
            if (req.query.name)
                obj.name = new RegExp(req.query.name, "g");
            if (req.query.status)
                obj.status = req.query.status;
            obj.signup_at = {}
            if (req.query.from)
                obj.signup_at.$gte = req.query.from;
            if (req.query.to)
                obj.signup_at.$lte = req.query.to;

            if (JSON.stringify(obj.signup_at) == "{}") delete obj.signup_at;

            return obj;
        })()));
    }
    catch (err) {
        res.send(err);
    }
});
router.get("/:id", async (req, res) => {
    res.send(await communityModel.findById(req.params.id));
})
router.delete("/:id", async (req, res) => {
    res.send(await communityModel.findByIdAndDelete(req.params.id));
})


export default router;