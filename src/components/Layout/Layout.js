import React, { Component } from 'react'

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
                    open={this.sideDrawerToggleHandler}/>
                />
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerToggleHandler}/>
                <main className={ classes.Content } >
                    { this.props.children }
                </main>
            </Aux>
        )
    }
}

export default Layout;