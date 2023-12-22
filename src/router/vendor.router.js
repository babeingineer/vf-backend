import { Router } from "express"
import vendorModel from "../model/vendor.model"
import { hash, compare } from "bcrypt"

const router = Router();

//signup
router.post("/register", async (req, res) => {
  try {
    req.body.password = await hash(req.body.password, 10);
    res.send({
      message: "created",
      data: await vendorModel.create({ ...req.body, signup_at: new Date() }),
    });
  } catch (error) {
    res.send({ message: "Error", data: error.message });
  }
});
router.put("/:id", async (req, res) => {
  let data = await vendorModel.findById(req.params.id);
  data = {
    ...data,
    ...req.body
  };
  res.send(await vendorModel.findByIdAndUpdate(req.params.id, data));
})
router.get("/", async (req, res) => {
  if (req.query.communityId) {
    res.send(await vendorModel.find({ communityId: req.query.communityId }));
    return;
  }
  try {
    res.send(await vendorModel.find((() => {
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
})

router.get("/:communityId", async (req, res) => {
  res.send(await vendorModel.findOne({ communityId: req.params.communityId }));
})
//signin
router.post("/signin", async (req, res) => {
  try {
    const user = await vendorModel.findOne({ email: req.body.email });
    if (user && await compare(req.body.password, user.password)) {
      res.send({ message: "Success" });
    }
    else res.send({ message: "Failed" });
  } catch (error) {
    res.send({ message: "Error", data: error.message });
  }
});

export default router;