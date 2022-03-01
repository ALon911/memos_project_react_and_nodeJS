const express = require('express');
const mfController = require('../controllers/mfController');

const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
router.post('/allMemos',auth, mfController.hello_world);
router.post('/main',auth, mfController.postHello);
router.put('/edit',auth, mfController.editMemo);
router.delete('/delete',auth, mfController.deleteMemos);
// ...

router.post("/register1", mfController.register);
router.post("/login", mfController.login);
  
  // ...


router.get("/users", isAdmin, mfController.getUsers );
router.delete("/user", isAdmin, mfController.deleteUser );
router.put("/user", isAdmin, mfController.toggleUser );
module.exports = router;