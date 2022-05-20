const { Router } = require('express');
const { 
getGames, 
createGame, 
getGame, 
deleteGame, 
updateGame 
} = require('../controller/games.controller');
const { catcher } = require('../utils/catcher');


const router = Router();

router.get('/', catcher(getGames));
router.get('/:gameId', catcher(getGame));
router.post('/', catcher(createGame));
router.delete('/:gameId', catcher(deleteGame));
router.put('/:gameId', catcher(updateGame));


module.exports = router;