import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../UI/Navigation/Toolbar/Toolbar'
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState( prevState => ({
            showSideDrawer: !prevState.showSideDrawer }))
    }


    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuth}
                    open={this.sideDrawerToggleHandler}/>
                
                <SideDrawer 
                    isAuth={this.props.isAuth}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerToggleHandler}/>
                <main className={ classes.Content } >
                    { this.props.children }
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
} 

export default connect(mapStateToProps)(Layout);