import Home from './views/Home';
import View from './views/View';
import Master from './views/Master';

export default () => ({
    path: '/',
    component: Master,
    indexRoute: { component: Home },
    childRoutes: [
        {
            path: 'home',
            component: Home,
        },
        {
            path: 'view/:id',
            component: View,
        },
    ],
});
