import csv from 'csvtojson';
import fs from 'fs';

const readStream = fs.createReadStream('./csv/nodejs-hw1-ex1.csv');

csv()
  .on('error',(error)=>{
        console.log(error);
   })
  .fromStream(readStream)
  .subscribe(function(json){ 
    const result = formatJson(json);
    delete result.amount;
    try {
        fs.appendFileSync('output.txt', `${JSON.stringify(result)}\n`);
    } catch (err) {
        console.log(err);
    }
  })


const formatJson = (obj) => {
    let ar = Object.keys(obj);
    for(let i = 0; i < ar.length; i++){
        let upperCasePropertyName = ar[i];
        ar[i] = ar[i].toLowerCase();
        obj[ar[i]] = obj[upperCasePropertyName];
        delete obj[upperCasePropertyName];
    }
    return obj;
}