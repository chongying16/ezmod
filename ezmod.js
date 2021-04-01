
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function snake_case_string(str) {
  return str && str.match(
/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(s => s.toLowerCase())
      .join('_');
}

function _snake2Pascal( str ){
  str +='';
  str = str.split('_');
  for(var i=0;i<str.length;i++){ 
      str[i] = str[i].slice(0,1).toUpperCase() + str[i].slice(1,str[i].length);
  }
  return str.join('');
}

function toPascalCase(string) {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), s => s.toUpperCase());
}

function sentenceCase (str) {
  if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();
  
 return str.replace(/\w\S*/g, 
function(txt){return txt.charAt(0).toUpperCase() +
       txt.substr(1).toLowerCase();});
}

function space_replace(string)
{
  return string.replace(/_/g, ' ');
}

// 
const inquirer = require("inquirer");
inquirer.prompt([
      {
        name: "folder_name",
        message: "Select folder name",
       type: "list",
       choices: ["module", "shipping", "total", "payment"]
    },
    {
        name: "new_module_name",
        message: "Input new module name",
        type: "input",
      },
      {
        name: "title",
        message: "Input new title name",
        type: "input",
      }
])
    .then(function (answer) {
        //  console.log(answer.folder_name);
         //console.log(answer.new_module_name);
        //  console.log(answer.title);
        
var fs = require('fs')  
const path = require('path');

  fs.readFile(`controller.php`, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var class_folder_replace = data.replace(/{class_folder_replace}/g, (toPascalCase(`${answer.folder_name}`)));
    var class_replace = class_folder_replace.replace(/{class_replace}/g, (toPascalCase(`${answer.new_module_name}`)));
    var folder_replace = class_replace.replace(/{folder_replace}/g, (snake_case_string(`${answer.folder_name}`))); 
    var result = folder_replace.replace(/{replace}/g, (snake_case_string(`${answer.new_module_name}`))); 
    var savePath = __dirname + `/admin/controller/extension/${answer.folder_name}/`;

    fs.writeFile(savePath+snake_case_string(`${answer.new_module_name}`)+".php", result, 'utf8', function (err) {
      
       if (err) return console.log(err);
       
    })
    
    console.log(snake_case_string(`${answer.new_module_name}`)+".php is created")

  })

  fs.readFile(`view.twig`, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var folder_replace = data.replace(/{folder_replace}/g, (snake_case_string(`${answer.folder_name}`)));
    var class_replace = folder_replace.replace(/{class_replace}/g, (toPascalCase(`${answer.new_module_name}`)));
    var result = class_replace.replace(/{replace}/g, (snake_case_string(`${answer.new_module_name}`))); 
    var savePath = __dirname + `/admin/view/template/extension/${answer.folder_name}/`;

    fs.writeFile(savePath+snake_case_string(`${answer.new_module_name}`)+".twig", result, 'utf8', function (err) {
      
       if (err) return console.log(err);
       
    })
    
    console.log(snake_case_string(`${answer.new_module_name}`)+".twig is created")

  })
  fs.readFile(`language.php`, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    var folder_replace = data.replace(/{folder_replace}/g, (snake_case_string(`${answer.folder_name}`)));
    var uppercase_title = folder_replace.replace(/{uppercase_title}/g, (sentenceCase(`${answer.title}`)));
    var result = uppercase_title.replace(/{title}/g, space_replace(`${answer.title}`).toLowerCase()); 
    var savePath = __dirname + `/admin/language/en-gb/extension/${answer.folder_name}/`;
  
    fs.writeFile(savePath+snake_case_string(`${answer.new_module_name}`)+".php", result, 'utf8', function (err) {
      
       if (err) return console.log(err);
       
    })
    console.log(snake_case_string(`${answer.new_module_name}`)+".php is created")
    })
 
if (answer.folder_name == "module" || answer.folder_name == "payment")  
    {
        fs.readFile(`model.php`, 'utf8', function (err,data) {
            if (err) {
            return console.log(err);
            }
            var class_folder_replace = data.replace(/{class_folder_replace}/g, (toPascalCase(`${answer.folder_name}`)));
            var class_replace = class_folder_replace.replace(/{class_replace}/g, (toPascalCase(`${answer.new_module_name}`)));
            var result = class_replace.replace(/{replace}/g, (snake_case_string(`${answer.new_module_name}`))); 
            var savePath = __dirname + `/admin/model/extension/${answer.folder_name}/`;
        
            fs.writeFile(savePath+snake_case_string(`${answer.new_module_name}`)+".php", result, 'utf8', function (err) {
            
            if (err) return console.log(err);
            
            })
            console.log(snake_case_string(`${answer.new_module_name}`)+"2.php is created")
        })
    }
    else
    {
        console.log("")
    }
});




