import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon:1,
            cheese: 1,
            meat: 1
        },
        totalPrice: null
    }

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0 
        for (let param of query.entries()) {
                if (param[0] === 'price') {
                    price = param[1]
                } else {
                    ingredients[param[0]] = +param[1]
                }
            }
        this.setState({ ingredients: ingredients, totalPrice: price })
    }

    checkoutCancel = () => {
        this.props.history.goBack()
    }
    
    checkoutContinue = () => {
        this.props.history.push('/checkout/contact-data')
    }
    
    render () {
     return (
        <div>
            <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancel={this.checkoutCancel} 
                checkoutContinue={this.checkoutContinue} 
                />
            <Route 
                path={this.props.match.path + '/contact-data'} 
                render={() => (
                    <ContactData 
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice} 
                        {...this.props}
                        />)
                        
                    }
            />
        </div>
    )
 }
}

export default Checkout