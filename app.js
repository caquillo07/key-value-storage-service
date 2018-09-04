// import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
// Routes
import routes from './routes';

// Create app
const app = express();

// Install middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add routers
app.use('/', routes);

// catch 404 and forward to error handler
// app.use((req, res, next) => next(createError(404)));

// error handling
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    next();
});

export default app;