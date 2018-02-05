const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


//Server logger
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  //logs date + http methods/url
  console.log(log);

  //appends the log to file server.log
  fs.appendFile('server.log', now + '\n' + log + '\n\n', (err) => {
    if (err) {
      throw err;
      console.log('Saved!');
    }
  });
  next();
});

//Maintainance

// app.use((req,res,next) => {
//   res.render('maintainance.hbs');
// });

//helper  function for handle bar template

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
  res.render('index.hbs', {
    navbarColor: 'transparent',
    pageTitle: 'Home'
  });
});


app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    navbarColor: 'transparent',
    pageTitle: 'Projects',
  });
});

app.get('/resume', (req, res) => {
  res.render('resume.hbs', {
    navbarColor: 'black',
    pageTitle: 'Home',
  });
});




app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
