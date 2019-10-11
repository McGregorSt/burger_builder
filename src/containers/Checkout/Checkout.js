import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'

class Checkout extends Component {
    // state = {
    //     ingredients: {
    //         salad: 1,
    //         bacon:1,
    //         cheese: 1,
    //         meat: 1
    //     },
    //     totalPrice: null
    // }

    // componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     let price = 0 
    //     for (let param of query.entries()) {
    //             if (param[0] === 'price') {
    //                 price = param[1]
    //             } else {
    //                 ingredients[param[0]] = +param[1]
    //             }
    //         }
    //     this.setState({ ingredients: ingredients, totalPrice: price })
    // }

    checkoutCancel = () => {
        this.props.history.goBack()
    }

    checkoutContinue = () => {
        this.props.history.push('/checkout/contact-data')

    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ingrd) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/burger_builder' /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingrd}
                        checkoutCancel={this.checkoutCancel}
                        checkoutContinue={this.checkoutContinue}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        render={() => (
                            <ContactData
                                ingredients={this.props.ingrd}
                                totalPrice={this.props.totalPrice}
                                {...this.props}
                            />)
                        }
                    />
                </div>
            )
        }
        return (
            <div>
                {summary}
            </div>
        )
    }
}

const mapStateToPorops = state => {
    return {
        ingrd: state.ingrd.ingredients,
        totalPrice: state.ingrd.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToPorops)(Checkout)