import React, { Component } from 'react'
import API from '../../common/API'
import './geci.css'
import { Icon } from 'antd';
import '../../common/iconfit/font_oez7zn1ycid/iconfont.css'
import { number } from 'prop-types';
class Geci extends Component {
    constructor(props) {
        super(),
            this.state = {
                play: '',
                backroundimg: '',
                geming: '',
                geshou: '',
                geci: [],
                bofang: true,
                suoyou: [],
                timerr: '',
                list: '',
                zhuanquanquan: ''
            }
        this.ev.on('dd', d => {
        })
    }
    componentDidMount() {
        var id = this.props.match.params.id
        this.$http({
            url: API.songUrllist + id
        }).then(d => {
            this.setState({
                play: d.data.data[0]
            })
        })
        var geci = this.props.match.params.geci
        this.$http({
            url: API.lrc + geci
        }).then(d => {
            //歌歌词
            var gege = d.data.data.lyric
            // console.log(gege)
            // let json=gege.replace(/([换行])/g,' \n')
            let json = gege.split('[换行]')
            // console.log(json)

            json.map((item, index, arr) => {
                let a = item.split(']')[1]
                let b = this.state.suoyou + '  '

                // 下面是算秒数的
                let c = String(item.split(']')[0].split('[')[1].split('.')[0].split(':')[0] * 60 + Number(item.split(']')[0].split('[')[1].split('.')[0].split(':')[1])) + '  '
                let d = this.state.timerr
                // console.log(c)
                // console.log(d)

                if (index < arr.length) {
                    return this.state.suoyou = b + a, this.state.timerr = d + c

                } else {
                    return this.setState({
                        suoyou: b + a,
                        timerr: d + c
                    })
                }

            })
            this.setState({
                suoyou: this.state.suoyou.split('  '),
                timerr: this.state.timerr.split('  ')
            })
            // var cc=this.state.timerr.splice(shijian.length-1,1).splice(0,5)
            var cc = this.state.timerr
            cc.splice(0, 5)
            // cc.splice(cc.length - 1, 1)
            var dd = this.state.suoyou
            dd.splice(0, 5)
            dd.splice(dd.length - 1, 1)
            this.setState({
                timerr: cc,
                suoyou: dd
            })
            // console.log(this.state.suoyou,this.state.timerr)

            // shijian.splice(shijian.length-1,1)
            // shijian.splice(0,5)
            // console.log(this.state.suoyou)
            // console.log(json)
            this.setState({
                geci: json
            })
        })
        var albumMid = this.props.match.params.albumMid
        var singerMid = this.props.match.params.singerMid
        this.$http({
            url: API.albumImg + albumMid + '/' + singerMid
        }).then(d => {
            // console.log(d)
            console.log(d)
            this.setState({
                backroundimg: d.data.data.singerAvatarUrl,
                zhuanquanquan: d.data.data.albumImgUrl
            })
        })
        this.setState({
            geming: this.props.match.params.geming,
            geshou: this.props.match.params.geshou
        })



        // 视频播放
        this.refs.audio.addEventListener('play', (e) => {
            console.log('我播放了')
        })
        // 音频暂停
        this.refs.audio.addEventListener('pause', (e) => {
            console.log('我暂停了')
        })
        // this.refs.audio.addEventListener('play', (e) => {
        //     console.log('我播放了')
        // })






    }
    // 点击按钮播放
    bbfang() {
        if (this.state.bofang) {
            this.setState({
                bofang: false
            })
            this.refs.audio.play()
        } else {
            this.setState({
                bofang: true
            })
            this.refs.audio.pause()
        }
    }
    zongshijian = 0
    // 判断时间
    gecibianhua(e) {
        // 歌曲播放时间
        var timer = this.refs.audio.currentTime
        // 歌词数组
        let geci = this.state.suoyou
        // 时间数组
        let shijian = this.state.timerr
        // console.log(geci)

        // console.log(shijian)

        if (shijian) {
            shijian.map((item, index) => {
                timer = Number(timer)
                item = Number(item)
                // console.log(timer,item)  
                if ((timer - 0.1) <= (item) && item <= (timer + 0.1)) {
                    // console.log(geci[index])
                    this.setState({
                        list: index
                    })
                }

            })
        }

        // console.log(this.state.suoyou[this.state.list])
        // 进度条
        //  总时长
        var zong = this.refs.audio.duration
        //    timer/zong=?/this.refs.nei
        // console.log(timer,this.refs.wai.clientWidth,zong)
        // console.log(timer*this.refs.wai.clientWidth/zong+'px')
        this.zongshijian = zong

        this.refs.nei.style.width = timer * this.refs.wai.clientWidth / zong + 'px'

        this.refs.qiu.style.left = Math.floor(timer * (this.refs.wai.clientWidth - this.refs.qiu.clientWidth) / zong) + 'px'



    }
    backbb() {
        this.props.history.go(-1)
    }

    tiaozhanuan() {
        // console.log(event.clientX)
        // event.clientX/this.refs.this.refs.wai.clientWidth=?/this.zongshijian
        console.log(this.zongshijian)
        this.refs.audio.currentTime = event.clientX * this.zongshijian / this.refs.wai.clientWidth

    }


    render() {
        // console.log(this.state.timmer)
        var oo = <div className='woneegaidu oooo'>
            <p className='oooo'>{this.state.suoyou[this.state.list - 2]}</p>
            <p className='oooo'>{this.state.suoyou[this.state.list - 1]}</p>
            <p className='oooo'>{this.state.suoyou[this.state.list]}</p>
            <p className='impt'>{this.state.suoyou[this.state.list + 1]}</p>
            <p className='oooo'>{this.state.suoyou[this.state.list + 2]}</p>
            <p className='oooo'>{this.state.suoyou[this.state.list + 3]}</p>
            <p className='oooo'>{this.state.suoyou[this.state.list + 4]}</p>

        </div>


        // let oo = this.state.suoyou.map((item, index) => {
        //     return <p key={index}>   {item}  </p>
        // })

        var zhantinghebofang = this.state.bofang ? <span className="iconfont"
            onTouchEnd={() => { this.bbfang() }}
        >&#xe624;</span> : <span className="iconfont"
            onTouchEnd={() => { this.bbfang() }}
        >&#xe622;</span>
        return (
            <div className='box'>

                <div className='goback' onTouchStart={() => this.backbb()}>
                    <Icon type="arrow-left" className='houtui' />
                </div>

                <audio src={this.state.play} ref='audio'
                    onTimeUpdate={() => this.gecibianhua()}
                ></audio>


                <div className='zhuan'>
                    <img src={this.state.zhuanquanquan} alt="" />
                </div>
                
                <div className='tupian'>
                    <img src={this.state.backroundimg} alt="" />
                    <div className='dongxi'>
                        <p className='geming2'>{this.state.geming}</p>
                        <p>{this.state.geshou}</p>


                        <div className='zhuanggeci'>
                            {oo}
                        </div>

                        <div className='qusdf'>
                            <div className='jinqutiao' ref='wai' onClick={() => this.tiaozhanuan()}>

                                <div className='nei' ref='nei'></div>
                                <div className='qiu' ref='qiu'>

                                </div>

                            </div>
                        </div>







                        <div className='mvplayheart'>
                            <span className="iconfont">&#xe605;</span>
                            {zhantinghebofang}
                            {/* &#xe622; */}
                            <span className="iconfont">&#xe6af;</span>
                        </div>
                    </div>


                </div>



                <div className="gr22">
                    <div className='greenbutton'>
                        <span className="huibianle iconfont">免费下载歌曲</span>
                    </div>
                </div>

            </div>
        )
    }
}

export default Geci