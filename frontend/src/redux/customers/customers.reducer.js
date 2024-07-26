import * as customersTypes from './customers.types';

const initialState = {
     loading: false,
     error: false,
     customers: [],
}


export const reducer = (state = initialState, { type, payload }) => {

     switch (type) {
          case customersTypes.CUSTOMER_LOADING: {
               return { ...state, loading: true, error: false };
          }

          case customersTypes.CUSTOMER_ERROR: {
               return { ...state, loading: false, error: true };
          }

          case customersTypes.CUSTOMER_SUCCESS: {
               return { ...state, loading: false, error: false };
          }

          case customersTypes.GET_CUSTOMER_SUCCESS: {
               return {customers: payload, loading: false, error: false};
          }

          default: return state;
     }
}