import express from "express";

import {
saveFeedback,
getStats,
getAllFeedback
}
from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/",saveFeedback);

router.get("/stats",getStats);
router.get("/all",getAllFeedback);

export default router;