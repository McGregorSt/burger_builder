import React, { Component } from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import * as contactDataActions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler'
import { updateObject, checkValidity } from '../../../shared/utility/utility'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {},
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: 'fastest',
                validation: {
                    required: true
                },
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const formData = {}
        // eslint-disable-next-line no-unused-vars
        for (let orderKey in this.state.orderForm) {
            formData[orderKey] = this.state.orderForm[orderKey].value
        }
        const order = {
            ingredients: this.props.ingrd,
            price: this.props.totalPrice.toFixed(2),
            deliveryMethod: 'fastest',
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onPurchaseBurgerStart(order, this.props.token)
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false })
        //         this.props.history.push('/')
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false })
        //     })
    }

    inputChangedHandler = (event, inputId) => {
        const updatedFormEl = updateObject(this.state.orderForm[inputId], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
            touched: true
        })
        const updatedForm = updateObject(this.state.orderForm, {
            [inputId]: updatedFormEl
        })

        let formIsValid = true;
        // eslint-disable-next-line no-unused-vars
        for (let inputId in updatedForm) {
            formIsValid = updatedForm[inputId].valid && formIsValid
        }

        this.setState({ orderForm: updatedForm, formIsValid: formIsValid })
    }

    render() {
        const formElementsArray = []
        // eslint-disable-next-line no-unused-vars
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(elm => {
                    return <Input
                        key={elm.id}
                        elementType={elm.config.elementType}
                        elementConfig={elm.config.elementConfig}
                        value={elm.config.value}
                        invalid={!elm.config.valid}
                        shouldValidate={elm.config.validation}
                        touched={elm.config.touched}
                        changed={(event) => this.inputChangedHandler(event, elm.id)}
                    />
                })}

                <Button btnType='Success' disabled={!this.state.formIsValid} >ORDER</Button>
            </form>
        )
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToPorops = state => {
    return {
        ingrd: state.ingrd.ingredients,
        totalPrice: state.ingrd.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurgerStart: (orderData, token) => dispatch(contactDataActions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToPorops, mapDispatchToProps)(withErrorHandler(ContactData, axios))