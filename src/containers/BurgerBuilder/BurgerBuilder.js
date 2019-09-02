import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {
  
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    updatePurchaseState = (ingredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // }
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce(((acc, cur) => acc + cur), 0)
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldIngredCount = this.state.ingredients[type]
        const ingredCount = oldIngredCount + 1
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = ingredCount
        const priceAddition = INGREDIENTS_PRICES[type]
        const newTotalPrice = this.state.totalPrice + priceAddition
        this.setState({ 
            ingredients: updatedIngredients, 
            totalPrice: newTotalPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) => {
        const oldIngredCount = this.state.ingredients[type]
        const ingredCount = oldIngredCount - 1
        const updatedIngredients = { ...this.state.ingredients }
        
        if(oldIngredCount !== 0){
            updatedIngredients[type] = ingredCount
        } 
        const priceDiff = INGREDIENTS_PRICES[type]
        const newTotalPrice = this.state.totalPrice - priceDiff
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        })
        this.updatePurchaseState(updatedIngredients)
        
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    
    purchaseContinueHandler = () => {
        alert('Please continue...')
    }

    render() {
        const disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        return(
            <Aux>
                <Modal show={ this.state.purchasing } modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={ this.state.ingredients }
                        totalPrice={ this.state.totalPrice }
                        purchaseCancelled={ this.purchaseCancelHandler }
                        purchaseContinued={ this.purchaseContinueHandler } />
                </Modal>
                <Burger ingredients={ this.state.ingredients }/>
                <BuildControls 
                    addIngredient={ this.addIngredientHandler }
                    removeIngredient={ this.removeIngredientHandler } 
                    disabledInfo={ disabledInfo }
                    purchasable={ this.state.purchasable }
                    price={ this.state.totalPrice }
                    ordered={ this.purchaseHandler }
                    />
            </Aux>
        )
    }
}

export default BurgerBuilder