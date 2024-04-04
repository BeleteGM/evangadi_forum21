const express = require("express");
const router = express.Router();

const {
  postQuestion,
  allQuestions,
  singleQuestion,
} = require("../controllers/questionCont");

router.get("/", allQuestions);
router.get("/:id", singleQuestion);
router.post("/", postQuestion);

module.exports = router;
