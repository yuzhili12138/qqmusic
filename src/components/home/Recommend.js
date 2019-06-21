import React, { Component } from 'react'
import API from '../../common/API'
import { Carousel,Icon } from 'antd';
import './home.css'

class Recommend extends Component {
    constructor() {
        super()
        this.state = {
            bannerImg: [],
            diantai: []
        }
        this.cancelToken=this.$http.CancelToken;
        this.source=this.cancelToken.source();
    }
    componentDidMount() {
        this.$http({
            url: API.index,
            cancelToken:this.source.token
        }).then(e => {
            console.log(e.data.data)
            this.setState({
                bannerImg: e.data.data.slider,
                diantai: e.data.data.radioList
            })
        })
    }
    componentWillUnmount(){
        this.source.cancel()
    }




    render() {
        var banner = this.state.bannerImg.map((item, index) => {
            return <div className='lunbotu' key={index}>
                <img src={item} alt="" />
            </div>
        })

        var dianai = this.state.diantai.map(item => {
            return <li key={item.id}>
                <img src={item.picUrl} alt="" />
                <p className='liname'>{item.title}</p>
                <Icon type="play-circle" theme="filled" className='play'/>
            </li>
        })

        return (
            <div className='quanbu'>
                {/* 轮播图 */}
                <Carousel autoplay>
                    {banner}
                </Carousel>
                <div>
                    <p className='title'>电台</p>
                    <div className='piantou'>
                        <ul>
                            {dianai}
                        </ul>
                    </div>
                </div>
                {/* 尾部垃圾广告 */}
                <div className='rubbish'>
                    <a className='toComputer'>查看电脑版网页</a>
                    <div className='woshidf'><img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt=""/></div>
                    <p className='sdfsdfsfsd'> Copyright © 1998 - <span>2019</span> Tencent. All Rights Reserved.</p>
                </div>




            </div>
        )
    }
}

export default Recommend