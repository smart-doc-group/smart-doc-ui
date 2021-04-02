import Layout from 'src/pages/layout';
import RequestInterface from 'src/pages/request-interface';

export interface IRouterItem {
  name: string;
  path: string;
  component: (props: { router: IRouterItem[] }) => JSX.Element;
  children?: IRouterItem[];
}

const router: IRouterItem[] = [
  {
    component: Layout,
    path: '/',
    name: 'basicLayout',
    children: [{ path: '/', name: 'api', component: RequestInterface }],
  },
];

export default router;
