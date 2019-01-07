// router on here.
import routehtml from './routehtml';
import users from './users';
import apis from './apis';


export default app => {
    app.use('/user', users);
    app.use('/api', apis);
    app.use('/', routehtml); // got html
};
