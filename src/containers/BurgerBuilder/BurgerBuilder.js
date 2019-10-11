import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import axios from '../../axios-orders'



export class BurgerBuilder extends Component {

    state = {
        purchasing: false,

    }

    componentDidMount() {
        this.props.onInitIngredients()
    }


    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((acc, cur) => {
                return acc + cur
            }, 0)
        return sum > 0
    }

    addIngredientHandler = (type) => {
        // const oldIngredCount = this.state.ingredients[type]
        // const ingredCount = oldIngredCount + 1
        // const updatedIngredients = {...this.state.ingredients}
        // updatedIngredients[type] = ingredCount
        // const priceAddition = INGREDIENTS_PRICES[type]
        // const newTotalPrice = this.state.totalPrice + priceAddition
        // this.setState({ 
        //     ingredients: updatedIngredients, 
        //     totalPrice: newTotalPrice
        // })
        // this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) => {
        // const oldIngredCount = this.state.ingredients[type]
        // const ingredCount = oldIngredCount - 1
        // const updatedIngredients = { ...this.state.ingredients }

        // if(oldIngredCount !== 0){
        //     updatedIngredients[type] = ingredCount
        // } 
        // const priceDiff = INGREDIENTS_PRICES[type]
        // const newTotalPrice = this.state.totalPrice - priceDiff
        // this.setState({
        //     ingredients: updatedIngredients,
        //     totalPrice: newTotalPrice
        // })
        // this.updatePurchaseState(updatedIngredients)

    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true })
        } else {
            console.log('purchaseHandler')
            this.props.onAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // alert('Please continue...')

        this.props.onPurchaseInit()
        this.props.history.push('/checkout')
        // const queryParams = []
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&')

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
    }
    render() {

        const disabledInfo = { ...this.props.ingrd }
        // eslint-disable-next-line no-unused-vars
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if (this.props.ingrd) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingrd} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingrd)}
                        price={this.props.totalPrice}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}
                    />
                </Aux>
            )
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingrd}
                    totalPrice={this.props.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            )
        }
        if (this.props.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingrd: state.ingrd.ingredients,
        totalPrice: state.ingrd.totalPrice,
        error: state.ingrd.error,
        loading: state.order.loading,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igType) => dispatch(actions.addIngredient(igType)),
        onIngredientRemoved: (igType) => dispatch(actions.removeIngredient(igType)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onAuthRedirectPath: (path) => dispatch(actions.authRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))