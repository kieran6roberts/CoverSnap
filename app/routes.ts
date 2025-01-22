import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [index('./routes/index.tsx'), route('/create', './routes/create/route.tsx')] satisfies RouteConfig;
