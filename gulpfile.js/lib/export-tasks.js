'use strict'

module.exports = (...tasks) =>
  tasks.reduce((acc, task) => (acc[task.displayName || task.name] = task) && acc, { default: tasks.shift() })
