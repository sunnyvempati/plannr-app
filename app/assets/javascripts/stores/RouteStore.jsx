const Router = require('react-router');
const routes = require('../routes.jsx');

const router = Router.create({
  routes: routes,
  location: null
});

const RouteStore = {
  getRouter() {
    return router;
  }
};

export default RouteStore;
