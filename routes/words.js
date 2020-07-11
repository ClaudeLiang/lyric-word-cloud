var router = require('koa-router')()
const store = require('../store/words')

router.get('/', async (ctx, next) => {
  ctx.body = await store.getWords()
})

module.exports = router
