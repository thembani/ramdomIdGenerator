var fs = require("fs");
var readlineSync = require('readline-sync');

var numberOfIds = 999;
var numberOfDigits = 3;
var fileName;

var currentId = 0;
var usedIds = [];

var dir = "./files";

numberOfIds = parseInt(readlineSync.question('How many Ids do you want to generate?: '));
numberOfDigits = parseInt(readlineSync.question('Enter the number of digits each Id should contain (eg: 00 or 000): '));
fileName = readlineSync.question('Enter the file name: ');

var getRandomNumber = function(){
    return Math.floor(Math.random()*10);
};

var getBuildId = function(){
    var ids = "";
    for(var i =0;i<numberOfDigits;i++){
        ids += `${getRandomNumber()}`;
    }
    return ids;
}

console.log("Genarating Ids...");

for(var i = 0; i < numberOfIds; i ++){
    
    currentId = getBuildId();
    if(usedIds.indexOf(currentId)){
        while(usedIds.indexOf(currentId) !== -1){
            currentId = getBuildId();
        }
    }
    usedIds.push(currentId);

};   

console.log(`${usedIds.length} Ids generated!`);
console.log(`Saving to file...`);

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

fs.writeFile(`${dir}/${fileName}.txt`, usedIds.join(", "), function(err){
    if(err){
        return console.log(err);
    }
    console.log(`The file was successfully saved. FileName: ${fileName}.txt!`);
})                 