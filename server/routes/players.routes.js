const { Router } = require('express');
const { 
getUsers, 
getUser, 
createUser, 
blockUser, 
updateUserStatus,
updateUserPassword,
} = require('../controller/players.controller');
const { catcher } = require('../utils/catcher');

const router = Router();

router.get('/', catcher(getUsers));
router.get('/:userId', catcher(getUser));
router.post('/', catcher(createUser));
router.put('/password', catcher(updateUserPassword));
router.put('/status', catcher(updateUserStatus));
router.delete('/delete', catcher(blockUser));

module.exports = router;