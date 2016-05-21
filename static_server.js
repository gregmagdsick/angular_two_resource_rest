const express = require('express');
const server = express().use(express.static(__dirname + '/build'));
module.exports = exports = server.listen(8080, () => console.log('Static server up on 8080'));
