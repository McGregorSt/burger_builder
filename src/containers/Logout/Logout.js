import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'

class Logout extends Component {
    componentDidMount () {
        this.props.onLogout()
    }
 render () {
     return <Redirect to='/burger_builder' />
 }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    }
}

export default connect(null, mapDispatchToProps) (Logout)