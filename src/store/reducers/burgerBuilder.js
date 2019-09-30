import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility/utility' 

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
}

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const removeIngredients = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    return updateObject(state, {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
    })
}
const addIngredients = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
}

const fetchIngredients = (state, action) => {
    return updateObject(state, { error: true })
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action)
        case actionTypes.DEL_INGREDIENT: return removeIngredients(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredients(state, action)
        default: return state
    }
    // return state
}

console.log('holla', reducer)

export default reducer