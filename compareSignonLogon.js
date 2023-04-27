const fs = require('fs');

function readJSONFromFile(filePath) {
  try {
    const jsonString = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(`Error reading JSON from file ${filePath}: ${error}`);
    return null;
  }
}

function compareJSONFiles(file1, file2) {
  const obj1 = readJSONFromFile(file1);
  const obj2 = readJSONFromFile(file2);
  if (!obj1 || !obj2) {
    return null;
  }
  return compareObjects(obj1, obj2);
}

function compareObjects(obj1, obj2) {
  let delta = {};
  for (let key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      delta[key] = obj1[key];
    } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        delta[key] = compareObjects(obj1[key], obj2[key]);
      } else {
        delta[key] = obj1[key];
      }
    }
  }
  for (let key in obj2) {
    if (!obj1.hasOwnProperty(key)) {
      delta[key] = obj2[key];
    }
  }
  return delta;
}

const file1 = 'file1.json';
const file2 = 'file2.json';

const delta = compareJSONFiles(file1, file2);

console.log(delta);
