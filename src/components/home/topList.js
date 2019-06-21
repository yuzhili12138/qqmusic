import React, { Component } from 'react'
import './topList.css'
import { Icon } from 'antd';
import API from '../../common/API'
class TopList extends Component {
    constructor(props) {
        super()
        this.state = {
            top: [],
            isload: false,
            startX: 0,
            endX: 0,
            startY: 0,
            endY: 0,
        }
        this.cancelToken = this.$http.CancelToken;
        this.source = this.cancelToken.source();
    }
    componentDidMount() {
        this.setState({
            isload: true
        })
        this.$http({
            url: API.top,
            cancelToken: this.source.token
        }).then(e => {
            // console.log(e)
            this.setState({
                top: e.data.data,
                isload: false
            })
        })
    }
    componentWillUnmount() {
        this.source.cancel()
    }

    // bofang(id, pic) {
    // }
    componentDidUpdate(){
    }

    start(event) {
        
        // console.log(event.changedTouches[0].clientX)
        // console.log(event.changedTouches[0].clientY)
        this.setState({
            startX: event.changedTouches[0].clientX,
            startY: event.changedTouches[0].clientY,
            endX: 0,
            endY: 0
        })
    }
    move(e) {
        // console.log(event.changedTouches[0].clientX)
        // console.log(event.changedTouches[0].clientY)
        this.setState({
            endX: event.changedTouches[0].clientX,
            endY: event.changedTouches[0].clientY
        })
    }

    end(id,pic) {
        if (this.state.endY===0) {
            this.props.history.push('/play/'+id+'/'+pic)
            return
        } else {
            if (this.state.startY > this.state.endY+30) {
                console.log('上划')
            }
            if (this.state.startY+30 < this.state.endY) {
                console.log('下划')
            }
            if (this.state.startX+30 < this.state.endX) {
                console.log('右划')
            }
            if (this.state.startX > this.state.endX+30) {
                console.log('左滑')
            }
        }
    }

    render() {
        var el = this.state.top.map(item => {
            var ll = item.songList.map((item, index) => {
                return (<p key={index} className='huanhao'><span className='xuhao'>{index + 1}</span> {item.songName}<span className='xuhao'>{'-' + item.singerName}</span>
                </p>)
            })
            var count = (item.listenCount / 10000).toFixed(1) + '万'

            return (<li className='wer' onTouchEnd={()=>{this.end(item.id, item.picUrl)}} key={item.id}
            >
                <div className='listImg'>
                    <img src={item.picUrl} alt="" />
                    <div className='erji'>
                        <Icon type="customer-service" theme="filled" /> <span>
                            {count}
                        </span>
                    </div>
                </div>
                <div className='detial'>
                    <div className='detilanei'>
                        <h2>{item.title}</h2>
                        {ll}
                    </div>
                </div>
                <Icon type="right" className='jiantou' />
            </li>)
        })
        return (
            <div className='beijing'
                onTouchStart={(event) => this.start(event)}
                onTouchMove={(event) => { this.move(event) }}
                // onTouchEnd={(event) => { this.end(event) }}
            >
                <ul className='ulul'>
                    {el}
                </ul>
            </div>
        )
    }
}

export default TopList