const { emotes } = require('./emoji')
const { color } = require('./color')


function content(client) {
  return module.exports.content = {
  emotes,
  color
 };
}

module.exports.content = content