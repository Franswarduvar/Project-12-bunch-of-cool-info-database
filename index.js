const db = require('./db/connection');
const inquirer = require('inquirer');
const utils = require('util');
db.query = utils.promisify(db.query);



function selection () {

inquirer.prompt([
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
letsSeeTheRoles();
} else if(end.choice === 'view all emplopyies'){
letsSeeTheEmployees();
} else if(end.choice === 'add a department'){
enterANewDept();
} else if(end.choice === 'add a role'){
createANewRole();
} else if(end.choice === 'add an emplpoies'){
createANewEmploppie();
} else if(end.choice === 'update an emplopie role'){
updateANewEmployyyeee();
} else{
    process.exit();
}

})
};

selection();

const letsSeeTheDepartments  = () => {
 const sql = `SELECT department.id AS ID, department.name AS Department FROM department`
 db.query(sql, (err, res) => {
    if (err) throw err;
    console.log("")
    console.log("----------------  All Departments  ----------------");
    console.log("")
    console.table(res);
    console.log("---------------------------------------------------");
    selection();
  });
};

const letsSeeTheRoles = () => { 
    const sql = `SELECT role.id AS ID,
                 role.title AS Title, 
                 role.salary AS Salary,
                 department.name AS Department
                 FROM role
                 LEFT JOIN department ON role.department_id = department.id`
                 db.query(sql, (err, res) => {
      if (err) throw err;
      console.log("")
      console.log("-------------------  All Roles  -------------------");
      console.log("")
      console.table(res);
      console.log("---------------------------------------------------");
      selection();
    });
  };
  
  const letsSeeTheEmployees = () => { 
    const sql = `SELECT employee.id AS ID,
                 employee.first_name AS First_Name,
                 employee.last_name AS Last_Name,
                 department.name AS Department,
                 role.title AS Title,
                 role.salary AS Salary,
                 CONCAT(manager.first_name, " ", manager.last_name) AS Manager
                 FROM employee
                 LEFT JOIN role ON employee.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 LEFT JOIN employee manager on employee.manager_id = manager.id;`;
                db.query(sql, (err, res) => {
      if (err) throw err;
      console.log("")
      console.log("-----------------  All Employees  -----------------");
      console.log("")
      console.table(res);
      console.log("---------------------------------------------------");
      selection();
    });
  };
  const enterANewDept = () => {
    inquirer.prompt([
      {
        type:"input",
        name:'addDept',
        message: "What new dept are you adding?",
        validate: addDept => {
          if (addDept) {
            return true;
          } else {
            console.log("What are you naming it?");
            return false;
          }
        }
      }
    ])
    .then(answer => {
      const sql = `INSERT INTO department (name) VALUES (?)`;db.query(sql, answer.addDept, (err, res) => {
        if (err) throw err;
        console.log(answer.addDept + " has been added to Department.");
        letsSeeTheDepartments();
      });
    });
  };
  

  const createANewRole = () => {
    inquirer.prompt([
      {
        type:"input",
        name:'role',
        message: "What woulf you like to call this new role?",
        validate: roleName => {
          if (roleName) {
            return true;
          } else {
            console.log("What would you like to call this role?");
            return false;
          }
        }
      },
      {
        type:"input",
        name:'salary',
        message: "How much do they make?",
        validate: roleSalary => {
          if (roleSalary) {
            return true;
          } else {
            console.log("Please enter the salery amount :)");
            return false;
          }
        }
      }
    ])
    .then(answer => {
      const params = [answer.role, answer.salary];
      const sqlDept = `SELECT department.name, department.id FROM department;`;db.query(sqlDept, (err, data) => {
        if (err) throw err;
        const pickDept = data.map(({ name, id }) => ({ name: name, value: id }));
  
        inquirer.prompt([
          {
            type:"list",
            name:'pickDept',
            message: "What Department is this role in?",
            choices: pickDept
          }
        ])
        .then(chooseDept => {
          params.push(chooseDept.pickDept);
  
          const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?,?,?);`;
  
db.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log("The new role, "+ answer.role + ", has been added");
            letsSeeTheRoles();
          })
        })
      });
    });
  };

  const createANewEmploppie = () => {
    inquirer.prompt([
      {
        type:"input",
        name:'firstname',
        message: "What the first name?",
        validate: employeeFirstName => {
          if (employeeFirstName) {
            return true;
          } else {
            console.log("Please enter the first name of the employee.");
            return false;
          }
        }
      },
      {
        type:"input",
        name:'lastname',
        message: "What is the last name?",
        validate: employeeLastName => {
          if (employeeLastName) {
            return true;
          } else {
            console.log("Please enter the last name of the employee.");
            return false;
          }
        }
      }
    ])
    .then(answer => {
      const params = [answer.firstname, answer.lastname];
      const sqlRole = `SELECT role.title, role.id FROM role`;db.query(sqlRole, (err, data) => {
        if (err) throw err;
        const pickRole = data.map(({ title, id }) => ({ name: title, value: id }));
  
        inquirer.prompt([
          {
            type:"list",
            name:'pickRole',
            message: "What is the employee's role?",
            choices: pickRole
          }
        ])
        .then(chooseRole => {
          params.push(chooseRole.pickRole);
  
          const sqlManager = `SELECT * FROM employee`;
  
db.query(sqlManager, (err, data) => {
            if (err) throw err;
            const pickManager = data.map(({ id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id }));
          
            inquirer.prompt([
              {
                type:"list",
                name:'pickManager',
                message: "Who is the employee's manager?",
                choices: pickManager
              }
            ])
            .then(chooseManager => {
              params.push(chooseManager.pickManager);
  
              const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?,?,?,?);`;
  
    db.query(sql, params, (err, res) => {
                if (err) throw err;
                console.log("The new employee has been added.");
                letsSeeTheEmployees();
              })
            })
          });   
        });
      });
    });
  };
  
  const updateANewEmployyyeee = () => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, data) => {
        if(err){
            console.log(err);
        } 
        const employyee = data.map(({id, first_name, last_name}) => (
            {
               value: id,
               name: `${first_name} ${last_name}` 
            }
        ))
        inquirer.prompt([
        {
          type:"list",
          name:'employyee_id',
          message: "Who do you wanna get?",
          choices: employyee
        }
    ]).then(answer =>{
        let employyee_id = answer.employyee_id
        const sql = `SELECT role.id, role.title FROM role`
        db.query(sql, (err, data) =>{
            let roleChoices = data.map(({id, title}) => ({
                value: id,
                name: title
            }))
            updateRole(employyee_id, roleChoices);
        })
    })
    });
    

};  

function updateRole (employyee_id, roleChoices){
inquirer.prompt([
    {
        type:"list",
        name: "role",
        message: "what is the updated silly bussiness?",
        choices: roleChoices
    }
]) .then(answer =>{
    const sql = `UPDATE employee SET role_id = ? WHERE ID = ?`
    const params = [answer.role, employyee_id]
    selection();
})

};