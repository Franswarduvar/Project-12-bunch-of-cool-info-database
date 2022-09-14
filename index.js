const db = require('db/connection.js');
const inquirer = require('inquirer');
const utils = require('util');
db.query = utils.promisify(db.query);

function selection () {

inquirer.createPrompt()

};