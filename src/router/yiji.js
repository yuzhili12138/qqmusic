import Home from '../components/home/home'
import Play from  '../components/Play/Play'
import Geci from '../components/geci/geci'


const yiji=[
    {
        path:'/home',
        component:Home
    },
    {
        path:'/play/:id/:pic',
        component:Play
    },
    {
        path:'/geci/:id/:geci/:albumMid/:singerMid/:geming/:geshou',
        component:Geci
    },
    {
        path:'*',
        redirect:'/home'
    }
]

export default yiji