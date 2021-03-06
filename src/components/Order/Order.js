import React from 'react'

import classes from './Order.css'

const Order = (props) => {
    const ingredients = []

    // eslint-disable-next-line no-unused-vars
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{ 
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid black',
                padding: '0 15px'
                }}
            key={ig.name}> {ig.name} <strong> {ig.amount} </strong></span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: </p>
            {ingredientOutput}
            <p>Price: <strong> ${props.price.toFixed(2)} </strong></p>
        </div>
    )
}

export default Order