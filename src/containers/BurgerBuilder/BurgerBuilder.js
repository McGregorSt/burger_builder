import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {
  
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-burger-builder-mcgs.firebaseio.com/ingredients.json')
            .then(resp => {
                this.setState({ ingredients: resp.data})
            })
            .catch(error => {
                this.setState({ error: true })
            })
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
        // alert('Please continue...')

        this.setState({ loading: true })

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Gregor St',
                address: {
                    street: 'Leicester Rd 2',
                    zipCode: '21344',
                    country: 'Poland'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false })
            })
    }
    render() {
        console.log(this.state.ingredients);
        
        const disabledInfo = {...this.state.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
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
            orderSummary = (
                <OrderSummary 
                    ingredients={ this.state.ingredients }
                    totalPrice={ this.state.totalPrice }
                    purchaseCancelled={ this.purchaseCancelHandler }
                    purchaseContinued={ this.purchaseContinueHandler } />
            )
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return(
            <Aux>
                <Modal show={ this.state.purchasing } modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)