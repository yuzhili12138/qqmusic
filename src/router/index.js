import { Switch, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'

class router extends Component {
    constructor(props) {
        super()

    }
    componentWillMount() {
        this.el = this.props.routes.map(item => {
            if (item.path === '*') {
                return <Redirect key={item.path} to={item.redirect}></Redirect>
            } else {
                return <Route key={item.path} path={item.path} component={item.component}></Route>
            }
        })
    }

    render() {
        return (
            <Switch>
                {this.el}
            </Switch>
        )
    }
}

export default router