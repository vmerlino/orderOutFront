import { createReducer, on } from '@ngrx/store';
import { addProduct, clearCart, removeProduct, updateClarification } from './CarritoState.actions';
import { OrderProduct } from '../model/orderProduct';

export interface ProductState {
    products: OrderProduct[] | null;
}

const initialState: ProductState = {
    products: JSON.parse(localStorage.getItem('cartState')!) ? JSON.parse(localStorage.getItem('cartState')!).products : []
};

export const carritoReducer = createReducer(
    initialState,
    on(addProduct, (state, { product }) => {
        const existingProducts = state.products ? [...state.products] : [];
        const productIndex = existingProducts.findIndex(p => p.product.id === product.id);

        if (productIndex >= 0) {
            const updatedProduct = {
                ...existingProducts[productIndex],
                quantity: existingProducts[productIndex].quantity + 1
            };
            existingProducts[productIndex] = updatedProduct;
        } else {
            existingProducts.push({ product, quantity: 1, clarification: '' });
        }
        return {
            ...state,
            products: existingProducts
        };
    }),
    on(removeProduct, (state, { product }) => {
        const existingProducts = state.products ? [...state.products] : [];
        const productIndex = existingProducts.findIndex(p => p.product.id === product.id);
        if (productIndex >= 0) {
            const updatedQuantity = existingProducts[productIndex].quantity - 1;

            if (updatedQuantity > 0) {
                existingProducts[productIndex] = {
                    ...existingProducts[productIndex],
                    quantity: updatedQuantity
                };
            } else {
                existingProducts.splice(productIndex, 1);
            }
        }

        return {
            ...state,
            products: existingProducts.length > 0 ? existingProducts : null
        };
    }),
    on(clearCart, () => initialState),
    on(updateClarification, (state, { productId, clarification }) => {
        const existingProducts = state.products ? [...state.products] : [];
        const productIndex = existingProducts.findIndex(p => p.product.id === productId);
        if (productIndex >= 0) {
            const updatedProduct = {
                ...existingProducts[productIndex],
                clarification
            };
            existingProducts[productIndex] = updatedProduct;
        }

        return {
            ...state,
            products: existingProducts
        };
    }),
);
