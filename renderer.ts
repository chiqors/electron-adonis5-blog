require('dotenv').config();
//const remote = require('electron').remote;

// @ts-ignore
window.location.href = `http://${process.env.HOST}:${process.env.PORT}`;
