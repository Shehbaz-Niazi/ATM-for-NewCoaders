#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = () => {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
};

async function welcome() {
  let first_Animation = chalkAnimation.rainbow(
    " <<<====>>> Lets Get Started <<====>>>"
  );
  await sleep();
  first_Animation.stop();
}

await welcome();

let balance: number = Math.floor(Math.random() * 10000000);

async function mainPart() {
  let answers = await inquirer.prompt([
    {
      name: "userId",
      type: "input",
      message: chalk.blue.bold(`Enter Your ID`),
    },
    {
        name: "userPin",
        type: "number",
        message: chalk.blue.bold(`Enter Your PASSWORD`),
        when(answers) {
          return answers.userId;
        },
        validate: function(input) {
          const pin = Number(input); 
          if (isNaN(pin)) {
            return "Invalid input. Please enter a valid number."; 
          } else {
            return true; 
          }
        }
    },
      
    {
      name: "account_Type",
      type: "list",
      message: chalk.redBright.bold(`Please Select Account Type ==>>`),
      choices: ["Current Account", "Saving Account"],
      when(answers) {
        return answers.userPin;
      },
    },
    {
      name: "transiction_Type",
      type: "list",
      choices: ["Fast Cash", "Cash Withdrawl"],
      message: chalk.blueBright.bold.underline(
        `Select Your Transiction Type ==>>`
      ),
      when(answers) {
        return answers.account_Type;
      },
    },
    {
      name: "amount",
      type: "list",
      choices: ["1000", "5000", "10000", "15000", "20000"],
      message: chalk.blueBright.green(
        `Select Your Amount \tYour Current Balance Is: (${balance})\n `
      ),
      when(answers) {
        return answers.transiction_Type === "Fast Cash";
      },
    },
    {
      name: "amount",
      type: "number",
      message: chalk.blueBright.green(
        `Enter Your Amount \tYour Current Balance Is: (${balance})\n `
      ),
      when(answers) {
        return answers.transiction_Type === "Cash Withdrawl";
      },
    },
  ]);

  if (answers.userId && answers.userPin) {
    if (balance >= answers.amount) {
      let remaining_balance = balance - answers.amount;
      console.log(
        chalk.yellowBright.underline.bold(
          `Transiction Successfully Your Remaning Balance is `,
          remaining_balance
        )
      );
    } else {
      console.log(chalk.bgRed.white.bold(`Insufficient Balance !!`));
    }
  }
}

async function loop (){
    do{
        await mainPart()
        var loop_start = await inquirer .prompt(
            {
                name:  "restart",
                type : "list",
                message :"Do You Want To Continue",
                choices : ["Yes", "No"]
            }
        );
    }while(loop_start.restart == "Yes")
};
await loop()