import React, { Component } from 'react'
import './search.css'
import { Icon } from 'antd';
import API from '../../common/API'
import '../../common/iconfit/font_haihxwyljea/iconfont.css'
class Search extends Component {
    constructor() {
        super()
        this.state = {
            isShow: true,
            x: false,
            value: '',
            shuju: []
        }
    }
    onfocus() {
        this.setState({
            isShow: false
        })
    }
    qq(e) {
        e.preventDefault();
        e.stopPropagation();
        this.refs.ipt.blur()
        this.setState({
            isShow: true
        })
    }
    bianhua(e) {
        if (e.target.value) {
            this.setState({
                x: true
            })
        } else {
            this.setState({
                x: false
            })
        }
        this.setState({
            value: event.target.value
        })
        if (event.target.value) {
            this.$http({
                url: API.search + '/' + event.target.value
            }).then(d => {
                this.setState({
                    shuju: d.data.data.songList
                })
                console.log(d.data.data.songList)
            })
        }

    }
    meiyou() {
        this.refs.ipt.value = ''
        this.setState({
            x: false
        })
    }
    enter() {
        console.log(event.target.value)
        if (event.code === 'Enter') {
            this.$http({
                url: API.search + '/' + event.target.value
            }).then(d => {
                this.setState({
                    shuju: d.data.data.songList
                })
                console.log(d.data.data.songList)
            })
        }
    }
    shangqu() {
        this.refs.ipt.value = event.target.innerText
        console.log(event.target.innerText)
        // this.refs.ipt.onfocus()
        this.onfocus()
        this.$http({
            url: API.search + '/' + this.refs.ipt.value
        }).then(d => {
            this.setState({
                shuju: d.data.data.songList
            })
            console.log(d.data.data.songList)
        })
    }
    bofang(id,geci,albumMid,singerMid,geming,geshou){
        // console.log(id)
        this.props.history.push('/geci/'+id+'/'+geci+'/'+albumMid+'/'+singerMid+'/'+geming+'/'+geshou)
        this.ev.emit('dd',{
        })
    }



    render() {
        // 热门搜索
        var quxiao = this.state.isShow ? (<div className='hots'>
            <p className='hotstitle'>热门搜索</p>
            <div className='bubble'>
                <span onTouchStart={() => this.shangqu()}>周笔畅 新歌</span>
                <span onTouchStart={() => this.shangqu()}>话语原创十大金曲</span>
                <span onTouchStart={() => this.shangqu()}>17岁</span>
                <span onTouchStart={() => this.shangqu()}>陪你到世界之巅</span>
                <span onTouchStart={() => this.shangqu()}>父亲写的散文诗</span>
                <span onTouchStart={() => this.shangqu()}>闷</span>
                <span onTouchStart={() => this.shangqu()}>假如你是陌生人</span>
            </div>
        </div>) : null

        // 取消按钮
        var quxiao2 = !this.state.isShow ? <div onTouchEnd={(e) => { this.qq(e) }} className='quxiao'>
            取消
</div> : null

        // xxxx
        var xxx = this.state.x ? <div className='XX' onTouchStart={() => {
            this.meiyou()
        }}>X</div> : null

        var douxi = this.state.shuju.map(item => {
            var a = item.singer.map(item => {
                return item.singerName + ' '
            })
            return <li className='sdfsd' key={item.songId} onClick={()=>this.bofang(item.songMid,item.songId,item.albumMid,item.singer[0].singerMid,item.songName,a)}>
                <div className='tubiao'>
                    <span className="iconfont">&#xe629;</span>
                </div>
                <div className='sdfs'>
                    <p className='mingzi'>{item.songName}</p>
                    <p className='wirter'>{a}</p>
                </div>
            </li>
        })


        return (
            <div>
                <div className='sousdf'>
                    <div> <input onFocus={() => { this.onfocus() }} type="text" id="search"
                        ref='ipt'
                        placeholder='搜索歌曲、歌单、专辑'
                        onChange={(e) => this.bianhua(e)}
                        onKeyDown={() => this.enter()}

                    ></input>
                        <Icon type="search" className='sosdf' />
                    </div>

                    {xxx}
                    {quxiao2}
                </div>
                {quxiao}
                <div>
                    <ul>

                        {douxi}

                    </ul>
                </div>
            </div>
        )
    }
}

export default Search