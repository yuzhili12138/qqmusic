import Recommend from '../components/home/Recommend'
import topList from '../components/home/topList'
import search from '../components/home/search'

const routes = [
    {
        path: '/home/recommend',
        component: Recommend
    }, {
        path: '/home/topList',
        component: topList
    }, {
        path: '/home/search',
        component: search
    }, {
        path: '*',
        redirect:'/home/recommend'
    }
]

export default routes
