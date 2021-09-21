const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const htmlGenerator = path.resolve(__dirname, 'htmlGenerator', 'teamSummaryPage.html');
const htmlTemplate = require('./dist/htmlTemplate.js');

// Class Objects
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// Card Templates
const employeeCard = require('./dist/employeeCardTemplate');
const engineerCard = require('./dist/engineerCardTemplate');
const managerCard = require('./dist/managerCardTemplate');
const internCard = require('./dist/internCardTemplate');

// Array containing team member info in html card form
const teamArray = [];

// Main menu & subit to generate page
const promptUser = () => {
    console.log('Build your team! Choose a role to add a new member. When finished, choose SUBMIT to see your progress.');
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Choose action:",
            choices: ["Add an Employee", "Add an Engineer", "Add an Intern", "Add a Manager", "SUBMIT/Update Team"],
        },
    ]).then(data => {
            switch (data.role) {
                case 'Add an Employee': {
                    employeePrompt();
                    break;
                }
                case 'Add an Engineer': {
                    engineerPrompt();
                    break;
                }
                case 'Add an Intern': {
                    internPrompt();
                    break;
                }
                case 'Add a Manager': {
                    managerPrompt();
                    break;
                }
                case 'SUBMIT/Update Team': {
                    generateTeamProfile();
                    break;
                }
            }
        });
};

// EMPLOYEE
const employeePrompt = () => {
    inquirer.prompt([
        {
            name: "name",
            message: "Enter employee's name:",
            type: "input"

        },
        {
            name: "id",
            message: "Enter employee's id number:",
            type: "input"
        },
        {
            name: "email",
            message: "Enter employee's email:",
            type: "input"
        }
    ]).then(data => {
        const employeeProfile = new Employee(
            data.name,
            data.id,
            data.email
        );
        const cardify = employeeCard(employeeProfile)
        teamArray.push(cardify);
			promptUser();
    })
};

// MANAGER
const managerPrompt = () => {
    inquirer.prompt([
        {
            name: "name",
            message: "Enter manager's name:",
            type: "input"
        },
        {
            name: "id",
            message: "Enter manager's id number:",
            type: "input"
        },
        {
            name: "email",
            type: "input",
            message: "Enter manager's email:"
        },
        {
            name: "officeNumber",
            type: "input",
            message: "Enter manager's office number:"
        }
    ]).then(data => {
        const managerProfile = new Manager(
            data.name,
            data.id,
            data.email,
            data.officeNumber
        );
        const cardify = managerCard(managerProfile)
        teamArray.push(cardify);
			promptUser();
    });
};

// ENGINEER
const engineerPrompt = () => {
    inquirer.prompt([
        {
            name: "name",
            message: "Enter engineer's name:",
            type: "input"
        },
        {
            name: "id",
            message: "Enter engineer's id number:",
            type: "input"
        },
        {
            name: "email",
            type: "input",
            message: "Enter engineer's email:"
        },
        {
            name: "github",
            type: "input",
            message: "Enter engineer's GitHub username:",
        }
    ]).then(data => {
        const engineerProfile = new Engineer(
            data.name,
            data.id,
            data.email,
            data.github
        );
        const cardify = engineerCard(engineerProfile)
        teamArray.push(cardify);
			promptUser();
    });
};

// INTERN
const internPrompt = () => {
    inquirer.prompt([
        {
            name: "name",
            message: "Enter intern's name:",
            type: "input"
        },
        {
            name: "id",
            message: "Enter intern's id number:",
            type: "input"
        },
        {
            name: "email",
            type: "input",
            message: "Enter intern's email:"
        },
        {
            type: "input",
            name: "school",
            message: "Enter intern's school:",
        }
    ]).then(data => {
        const internProfile = new Intern(
            data.name,
            data.id,
            data.email,
            data.school
        );
        const cardify = internCard(internProfile)
        teamArray.push(cardify);
			promptUser();
    })
};

// Init
promptUser()

// Write file
function generateTeamProfile() {
    const teamProfileCards = teamArray.join('');
    fs.writeFileSync(htmlGenerator, htmlTemplate(teamProfileCards), 'utf-8');
  };
