const { Router } = require('express');
const { 
getUsers, 
getUser, 
createUser, 
deleteUser, 
updateUser, 
} = require('../controller/players.controller');
const { catcher } = require('../utils/catcher');

const router = Router();

router.get('/', catcher(getUsers));
router.get('/:userId', catcher(getUser));
router.post('/', catcher(createUser));
router.put('/:userId', catcher(updateUser));
router.delete('/:userId', catcher(deleteUser));

module.exports = router;