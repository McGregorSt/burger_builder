import React from 'react'

import classes from './Toolbar.css'
import Logo from '../../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuItem from '../MenuItem/MenuItem'

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <MenuItem open={props.open}>MENU</MenuItem>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default Toolbar