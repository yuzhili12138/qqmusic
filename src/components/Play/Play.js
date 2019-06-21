import React, { Component } from 'react'
import API from '../../common/API'
import './play.css'
import { Icon } from 'antd';
import '../../common/iconfit/font_98yaaz6tgsv/iconfont.css'

class Play extends Component {
    constructor(props) {
        super()
        this.state = {
            time: '',
            bigImg: '',
            name: '',
            top: []
        }
    }

    componentDidMount() {
        var id = this.props.match.params.id
        var tupian = this.props.location.pathname.split('/' + id + '/')[1]
        this.$http({
            url: API.songList + id
        }).then(d => {
            this.setState({
                time: d.data.data.updateTime,
                bigImg: tupian,
                name: d.data.data.topInfo.listName.split('·')[1],
                top: d.data.data.songList
            })
            console.log(d)
        })
    }
    bofang(id,geci,albumMid,singerMid,geming,geshou){
        // console.log(id)
        this.props.history.push('/geci/'+id+'/'+geci+'/'+albumMid+'/'+singerMid+'/'+geming+'/'+geshou)
        this.ev.emit('dd',{
        })
    }


    backbb() {
        this.props.history.go(-1)
    }

    render() {
        var el = this.state.top.map((item, index) => {
            var geshou = item.singer.map(item => {
                return item.singerName + '/'
            })
            if (index > 2) {
                return <li key={index}  onClick={()=>this.bofang(item.songMid,item.songId,item.albumMid,item.singer[0].singerMid,item.songName,geshou)}>
                    <div className='fengg'>
                        <div className='oneone'>
                            <p className='on-on3'>{index + 1}</p>
                            <p className='on-on'>-1</p>
                        </div>
                        <div className='middle'>
                            <p className='geming'>{item.songName}</p>
                            <p className='on-on'>{geshou}</p>
                        </div>
                        <div className='anniu'>
                            <span className="iconfont sdfsdf">&#xe639;</span>
                        </div>
                    </div>
                </li>
            } else {
                return <li key={index}  onClick={()=>this.bofang(item.songMid,item.songId,item.albumMid,item.singer[0].singerMid,item.songName,geshou)}>
                    <div className='fengg'>
                        <div className='oneone'>
                            <p className='on-on2'>{index + 1}</p>
                            <p className='on-on'>-1</p>
                        </div>
                        <div className='middle'>
                            <p className='geming'>{item.songName}</p>
                            <p className='on-on'>{geshou}</p>
                        </div>
                        <div className='anniu'>
                            <span className="iconfont sdfsdf">&#xe639;</span>
                        </div>
                    </div>
                </li>
            }
        })

        return (
            <div className='fdfgdfgdfg'>
                
                <div className='goback' onTouchStart={() => this.backbb()}>
                    <Icon type="arrow-left" className='houtui' />
                </div>

                <div className='box'>
                    <div className='guanlitupian'>
                        <img src={this.state.bigImg} alt="" />
                    </div>
                    <div>
                        <p className='first'>{this.state.name}榜</p>
                        <p className='two'>{this.state.name}榜 第170天</p>
                        <p className='time'>更新时间:{this.state.time}</p>
                    </div>
                    <div className="gr22">
                        <div className='greenbutton'>
                            <span className="huibianle iconfont">&#xe60e;</span>
                        </div>
                    </div>
                </div>
                <div className='gong'>
                    <p className='yigong'>排行榜 共100首</p>
                </div>

                <ul>
                    {el}
                </ul>
            </div>
        )
    }

}

export default Play