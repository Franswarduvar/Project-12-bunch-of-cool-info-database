const db = require('db/connection.js');
const inquirer = require('inquirer');
const utils = require('util');
db.query = utils.promisify(db.query);

function selection () {

inquirer.createPrompt([
    {
        type: 'list', 
        name: 'choice',
        message: 'What would you like to choose?',
        choices: [
            'view all departments',
            'view all roles',
            'view all emplopyies',
            'add a department',
            'add a role',
            'add an emplpoies',
            'update an emplopie role',
            'quit'
        ]

    }
]).then(end => {

if(end.choice === 'view all departments'){
 letsSeeTheDepartments();
} else if(end.choice === 'view all roles'){

} else if(end.choice === 'view all emplopyies'){

} else if(end.choice === 'add a department'){

} else if(end.choice === 'add a role'){

} else if(end.choice === 'add an emplpoies'){

} else if(end.choice === 'update an emplopie role'){

} else{
    process.exit();
}

})
};
function letsSeeTheDepartments(){

}