import {Router} from "express"
import couponModel from "../model/coupon.model"

const router = Router();

router.get("/", async (req, res) => {
    res.send(await couponModel.find({}));
});

router.post("/", async(req, res) => {
    res.send({message: "created", data: await couponModel.create(req.body)});
});

router.put("/", async(req, res) => {
    res.send({message: "updated", data: await couponModel.findByIdAndUpdate(req.query.id, req.body)});
});

router.delete("/", async(req, res) => {
    res.send({message: "deleted", data: await couponModel.findByIdAndDelete(req.query.id)});
});

export default router;