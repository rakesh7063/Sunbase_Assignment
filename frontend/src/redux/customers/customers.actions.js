import * as customersTypes from './customers.types';


/**
 * Get all customers by calling this action function
 * @param {Function} toastMsg - A function which will show the toast message.
 * */
export const getAllCustomersAction = (toastMsg) => async (dispatch) => {
     if (!toastMsg) return;

     dispatch({ type: customersTypes.CUSTOMER_LOADING });
     console.log(localStorage.getItem("TOKEN"))
     try {
          const res = await fetch("http://localhost:8080/all?page=0&size=10&sortBy=id&sortDir=asc", {
               method: "GET",
               headers: {
                    'Content-Type': 'application/json',
                    'Bearer': localStorage.getItem("TOKEN")
               }
          });
          const data = await res.json();
console.log(data.content)
          if (res.ok) {
               dispatch({ type: customersTypes.GET_CUSTOMER_SUCCESS, payload: data.content })
          } else {
               dispatch({ type: customersTypes.CUSTOMER_ERROR })
          }

          toastMsg({
               title: "Succes",
               status: res.ok ? 'success' : 'error',
          })

     } catch (error) {
          console.log('error:', error)
          dispatch({ type: customersTypes.CUSTOMER_ERROR })
          toastMsg({
               title: error.message,
               status: 'error',
          })
     }
}


/**
 * Update a Customer's credentials
 * @param {Function} toastMsg - A function which will show the toast message.
 * @param {string} customerId - Customers's id in which we'll apply the update
 * @param {Object} udate - All the udpates we want to apply for the specific user
 * */
export const udpateCustomerAction = (toastMsg, customerId, update) => async (dispatch) => {
     if (!toastMsg || !customerId || !update) return;

     dispatch({ type: customersTypes.CUSTOMER_LOADING });
     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/update/${customerId}`, {
               method: "PATCH",
               body: JSON.stringify(update),
               headers: {
                    'Content-Type': 'application/json',
                    'bearerToken': localStorage.getItem("TOKEN")
               }
          });
          const data = await res.json();

          if (res.ok) {
               dispatch(getAllCustomersAction(toastMsg))
          } else {
               dispatch({ type: customersTypes.CUSTOMER_ERROR })
               toastMsg({
                    title: data.message,
                    status: 'error',
               })
          }
     } catch (error) {
          console.log('error:', error)
          dispatch({ type: customersTypes.CUSTOMER_ERROR })
          toastMsg({
               title: error.message,
               status: 'error',
          })
     }
}