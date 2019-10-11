import React from 'react'

import classes from './NavigationItems.css'
import NavigationItem from '../NavigationItem/NavigationItem'

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/burger_builder'>Burger Builder</NavigationItem> 
        {props.isAuth ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
            {props.isAuth 
                ? <NavigationItem link='/logout'>Log Out</NavigationItem> 
                : <NavigationItem link='/auth'>Log In</NavigationItem>
            }
    </ul>
)

export default NavigationItems