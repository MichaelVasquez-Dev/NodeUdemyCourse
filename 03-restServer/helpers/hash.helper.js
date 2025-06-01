const bcryptjs = require('bcryptjs');

const createHash = (password) => bcryptjs.hashSync(password, 10);
const compareHash = (password, user) => bcryptjs.compareSync(password, user.password);

module.exports = {
    createHash,
    compareHash
}