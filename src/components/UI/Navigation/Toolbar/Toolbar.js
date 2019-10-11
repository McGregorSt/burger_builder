import React, { Component } from 'react'

import classes from './Toolbar.css'
import Logo from '../../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuItem from '../MenuItem/MenuItem'

class Toolbar extends Component {
    render() {
        return (
            <header className={classes.Toolbar}>
                <nav className={classes.DesktopOnlyToolbar}>
                    <MenuItem open={this.props.open}>
                        <div className={classes.BurgerMenuHover}>
                            <div className={classes.BurgerMenu}></div>
                            <div className={classes.BurgerMenu}></div>
                            <div className={classes.BurgerMenu}></div>
                        </div>
                    </MenuItem>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                </nav>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems isAuth={this.props.isAuth}/>
                </nav>
            </header>
        )
    }
}

export default Toolbar