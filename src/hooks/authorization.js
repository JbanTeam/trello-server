const mongoose = require('mongoose')

const errors = require('@feathersjs/errors');

async function isBoardOwner(context) {
  const boards = mongoose.model('boards')
  let boardId = context.params.query.boardId || context.data.boardId
  const _id = context.params.user._id
  const board = await boards.findOne({
    _id: boardId
  })

  if (!boardId) {
    return context;
  }

  if (board) {
    if (board.ownerId.toString() == _id.toString()) {
      return context
    } else {
      return Promise.reject(new errors.NotAuthenticated('Un-Authorised'))
    }
  }

  return context
}

module.exports = {
  isBoardOwner
}
