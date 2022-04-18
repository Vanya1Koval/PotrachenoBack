const jwt = require('jsonwebtoken');
const fs = require('fs')
const pathToStorage = require('path').resolve(__dirname, '../storage.json');

const a = require('crypto').randomBytes(64).toString('hex');

console.log(a)
