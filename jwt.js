const jwt = require('jsonwebtoken')
// Oque é um payload?
const token = jwt.sign({
    email: 'ale@hotmail.com'
}, 'levy')

const auth = jwt.decode(token)
// console.log(auth);

const authToken = jwt.verify(token,'levy');

console.log(authToken);
console.log(token);

