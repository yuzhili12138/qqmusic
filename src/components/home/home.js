import React, { Component } from 'react'
import './home.css'
import Routes from '../../router/index'
import erji from '../../router/homerji'
import {NavLink} from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <div>
                <div className='header'>
                    <div className='logo'>
                        <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt="" />
                    </div>

                    <div className='he_right'>
                        <a href="">下载APP</a>
                    </div>
                </div>
                <div className='list'>
                    <NavLink activeClassName='select' to="/home/recommend">推荐</NavLink>
                    <NavLink activeClassName='select' to="/home/topList">排行榜</NavLink>
                    <NavLink activeClassName='select' to="/home/search">搜索</NavLink>
                </div>
                <div>
                    <Routes routes={erji}></Routes>
                </div>


                <div className='footer'>
                    <a className='footer-a'>安装QQ音乐 发现更多精彩</a>
                </div>


            </div>
        )
    }
}
export default Home