import express from "express";

const router = express.Router();

router.get("/usertest", (req, res) => {
  res.send("user test in successful");
});

router.post("/userposttest", (req, res) => {
  const username = req.body.username;
  res.send("user post is successful " + username);
});
export default router;
