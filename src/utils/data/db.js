const traces = require('./measurements.json');
const points = require('./points.json');
const posts = require('./post.json');
const comments = require('./comments.json');

module.exports = () => {
  const data = {traces, posts, comments, points}
  return data
}