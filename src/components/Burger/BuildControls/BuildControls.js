import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
]

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Current price: { props.price.toFixed(2) }</p>
        { controls.map( ctrl => {
            return <BuildControl 
                        key={ ctrl.label } 
                        label={ ctrl.label } 
                        added={ () => props.addIngredient(ctrl.type) }
                        remove={ () => props.removeIngredient(ctrl.type)}
                        disabledInfo={ props.disabledInfo[ctrl.type] }
                        />
        }
        )}
        <button 
            className={ classes.OrderButton } 
            disabled={ !props.purchasable }
            onClick={ props.ordered }
            >ORDER NOW</button>
    </div>
)

export default BuildControls