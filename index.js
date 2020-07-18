const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of your project?"
    },
    {
      type: "input",
      name: "location",
      message: "What is a brief description of your project?"
    },
    {
      type: "input",
      name: "hobby",
      message: "Enter a CSV table of contents."
    },
    {
      type: "input",
      name: "food",
      message: "What are the installation steps of your project?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter Usage information for your project."
    },
    {
      type: "list",
      message: "Which license would you like to use for your project?",
      name: "license",
      choices: [
        "MIT License",
        "Code Project Open License (CPOL)",
        "Common Development and Distribution License (CDDL)",
        "Microsoft Public License (Ms-PL)",
        "Mozilla Public License 1.1 (MPL 1.1)",
        "Common Public License Version 1.0 (CPL)",
        "Eclipse Public License 1.0",
        "Apache License, Version 2.0"    }
  ]);
}

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });