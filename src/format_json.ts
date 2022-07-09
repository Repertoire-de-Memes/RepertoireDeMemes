import _keywords from '../server/data/keywords.json';
import _filenames from '../server/data/filenames.json';

let keywords = _keywords;
let filenames = _filenames;
console.log(_keywords);


// @ts-ignore
keywords = [keywords].sort((a, b, c) => {
  var a1 = a.first_name.toLowerCase();
  var b1 = b.first_name.toLowerCase();
  console.log(a,b,c);
  
  return a1<b1 ?-1:a1> b1? 1 :0;
})
console.log(keywords);