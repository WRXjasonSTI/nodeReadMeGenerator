const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

//CLI Questions stored here in Inquirer NPM format
function infoGather() {
  return inquirer.prompt([
    {
      type: "input",
      name: "project",
      message: "What is the name of your project?"
    },
    {
      type: "input",
      name: "description",
      message: "What is a brief description of your project?"
    },
    // {
    //   type: "input",
    //   name: "contents",
    //   message: "Enter a table of contents."
    // },
    {
      type: "input",
      name: "installation",
      message: "What are the installation steps of your project?"
    },
    {
      type: "input",
      name: "usage",
      message: "Enter Usage information for your project."
    },
    {
      type: "list",
      message: "Which license would you like to use for your project?",
      name: "license",
      choices: [
        "Apache License 2.0",
        "GNU General Public License v3.0",
        "MIT License",
        "BSD 2-Clause License",
        "BSD 3-Clause License",
        "Boosy Software License 1.0",
        "Creative Commons Zero v1.0 Universal",
        "Eclipse Public License 2.0",
        "GNU Affero General Public License v3.0",
        "GNU Affero Public License v2.0",
        "GNU Lesser General Public License v2.1",
        "Mozilla Public License 2.0",
        "The Unilicense"
     ]
    },
    {
      type: "input",
      name: "contributing",
      message: "Enter contribution information for your project."
    },
    {
      type: "input",
      name: "testing",
      message: "Enter testing information for your project."  
    },
    {
      type: "input",
      name: "github",
      message: "Enter your Github username."  
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email address."  
    },
  ])
};

//Converting User answers to final format before document creation
function creatMDFile(answers) {
  return `
# ${answers.project}

${answers.description}  

## License
![GitHub](https://img.shields.io/github/license/${answers.github}/${answers.project})  
${answers.license} 

## Table of Contents

* [Installation](#Installation)  
* [Usage](#Usage)  
* [License](#License)  
* [Contributing](#Contributing)  
* [Tests](#Contributing)  
* [Questions and Contact](#Questions and Contact)  

## Installation
\`\`\`bash
${answers.installation} 
\`\`\`
## Usage
\`\`\`bash
${answers.usage} 
\`\`\`
## Contributing

${answers.contributing} 

## Tests

${answers.testing} 

## Questions and Contact
For any questions and suggestions, please feel free to contact me at the following platforms:
* GitHub: ${answers.github} 
* Email: ${answers.email} 

##
${answers.license} 
Copyright ${answers.github}
    `;
}

//Function Call with promise/document creation via util
infoGather()
  .then(function(answers) {
    const readMeGen = creatMDFile(answers);
    return writeFileAsync(`${answers.project}.md`, readMeGen);
  })
  .then(function() {
    console.log("Your Markdown file has been generated. Please review and rename. Thank you!");
  })
  .catch(function(error) {
    console.log(error);
  });
