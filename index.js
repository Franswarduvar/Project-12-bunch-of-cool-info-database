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

const letsSeeTheDepartments  = () => {
 const sql = `SELECT department.id AS ID, dapartments.name AS Department FROM departments`;
 connection.query(sql, (err, res) => {
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
    const sql = `SELECT roles.id AS ID,
                 roles.title AS Title, 
                 roles.salary AS Salary,
                 departments.name AS Department
                 FROM roles
                 LEFT JOIN departments ON roles.department_id = departments.id`;
    connection.query(sql, (err, res) => {
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
    const sql = `SELECT employees.id AS ID,
                 employees.first_name AS First_Name,
                 employees.last_name AS Last_Name,
                 departments.name AS Department,
                 roles.title AS Title,
                 roles.salary AS Salary,
                 CONCAT(manager.first_name, " ", manager.last_name) AS Manager
                 FROM employees
                 LEFT JOIN roles ON employees.role_id = roles.id
                 LEFT JOIN departments ON roles.department_id = departments.id
                 LEFT JOIN employees manager on employees.manager_id = manager.id;`;
                 
    connection.query(sql, (err, res) => {
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
      const sql = `INSERT INTO departments (name) VALUES (?)`;
      connection.query(sql, answer.addDept, (err, res) => {
        if (err) throw err;
        console.log(answer.addDept + " has been added to Departments.");
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
      const sqlDept = `SELECT departments.name, departments.id FROM departments;`;
      connection.query(sqlDept, (err, data) => {
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
  
          const sql = `INSERT INTO roles (title, salary, department_id)
                        VALUES (?,?,?);`;
  
          connection.query(sql, params, (err, res) => {
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
      const sqlRole = `SELECT roles.title, roles.id FROM roles`;
      connection.query(sqlRole, (err, data) => {
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
  
          const sqlManager = `SELECT * FROM employees`;
  
          connection.query(sqlManager, (err, data) => {
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
  
              const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                        VALUES (?,?,?,?);`;
  
              connection.query(sql, params, (err, res) => {
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
  