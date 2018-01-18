const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const _ = require('lodash');
const index = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// let array = [true, 0, 1, 2, 3, 4, 5, false, 'test', '', null, 7, 8, 9];
// let users = [{
//     'user': 'barney',
//     'active': true
//   },
//   {
//     'user': 'fred',
//     'active': false
//   },
//   {
//     'user': 'pebbles',
//     'active': false
//   }
// ];


// let a = _.clone(users);

// let b = _.toPairs(users);

// a.push({
//   user: 'john',
//   active: true
// });

// console.log(a);
// console.log(users);



// let a = _.join(array, '\n');
// let a = _.nth(array, -4);
// let a = _.pull(array, 5, 4);
// let a = _.union(array, users);
// let dat = _.chunk(array, 2);
// let dat = _.compact(array);
// let arr = _.partition([1, 2, 3, 4, 5, 6, 7, 8, 9], n => n % 5);
// let dat = _.concat(array, 'hello', [true, 1851], {admin:true});
// let a =_.flatten([1,[5], [2, [3, [4]], 5]]);
// let a =_.flattenDeep([1, [2, [3, [[[[[[[[[4]]]]]]]]]], 5]]); // Flattens array a single level deep.
// let a =_.flattenDepth([1, [2, [3, [[[[[[[[[4]]]]]]]]]], 5]], 2);
// let a = _.fromPairs([['a', 1], ['b', 2], ['c', 2]]);
// let a = _.intersection(array, [5,7,true,"safafs", "safasf", 8]);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;