import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import log4js from 'log4js';
import indexRouter from './routes/index';
// var logger = require('morgan');

const app = express();

//通过configure()配置log4js
log4js.configure({
    appenders: {
        out: { type: 'stdout', layout: { type: 'json', separator: ',' } },//设置是否在控制台打印日志
        info: { type: 'file', filename: './logs/info.log' }
    },
    categories: {
        default: { appenders: ['info'], level: 'info' }//去掉'out'。控制台不打印日志
    }
});

global.logger = log4js.getLogger('logFile');
// logger.setLevel('INFO');//设置输出级别，具体输出级别有6个，见下方说明

app.use(log4js.connectLogger(global.logger, { level: log4js.levels.INFO }));

app.all('*', (req, res, next) => {
    const { origin, Origin, referer, Referer } = req.headers;
    const allowOrigin = origin || Origin || referer || Referer || '*';
    res.header("Access-Control-Allow-Origin", allowOrigin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", 'Express');

    if (req.method == 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        next();
    }
});

app.use(session({//无论你是否使用session，都默认给你分配一把钥匙
    secret: 'passwd',
    resave: false,
    name: 'post_session',
    saveUninitialized: true, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 30,
    }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
app.set("view engine", "ejs");
app.set('view engine', 'html');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

indexRouter(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
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

// module.exports = app;
export default app;
