var level = require('level')
var db = level('posts.db', { valueEncoding: 'json' })
var to = require('to2')

var opts = {
  gt: 'post-time!',
  lt: 'post-time!~'
}
db.createReadStream(opts)
  .pipe(to.obj(function (row, enc, next) {
    var id = row.key.split('!').slice(-1)[0]
    db.get('post!' + id, function (err, doc) {
      var name = doc.name
      var time = doc.time
      var body = doc.body
      console.log(time + ' <' + name + '> ' + body)
      next()
    })
  }))
