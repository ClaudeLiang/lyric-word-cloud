var router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = [
    {'name': '帅', 'value': '756'},
    {'name': '太帅了', 'value': '701'},
    {'name': '超级帅', 'value': '622'},
    {'name': '波霸奶茶少冰七分糖', 'value': '188'},
    {'name': 'Nginx', 'value': '178'},
    {'name': '可口可乐', 'value': '171'},
    {'name': '哈哈哈哈哈', 'value': '136'},
    {'name': 'taishuaile', 'value': '114'},
    {'name': '请叫我算术嘉', 'value': '98'},
    {'name': '清风抽纸', 'value': '75'},
    {'name': 'python', 'value': '46'}
  ]
});

module.exports = router;
