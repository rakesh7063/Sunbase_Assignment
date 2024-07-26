import * as customersTypes from './customers.types';


/**
 * Get all customers by calling this action function
 * @param {Function} toastMsg - A function which will show the toast message.
 * */
export const getAllCustomersAction = (toastMsg,searchKey, searchValue) => async (dispatch) => {
     if (!toastMsg) return;

     dispatch({ type: customersTypes.CUSTOMER_LOADING });
     let url;
// check search option 
     if(searchKey != null && searchValue != null) url = `http://localhost:8080/all?page=0&size=7&${searchKey}=${searchValue}&sortBy=id&sortDir=asc`;
     else url = "http://localhost:8080/all?page=0&size=7&sortBy=id&sortDir=asc";
     console.log(url);
     try {
          const res = await fetch(url, {
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
          const res = await fetch(`http://localhost:8080/update/${customerId}`, {
               method: "PUT",
               body: JSON.stringify(update),
               headers: {
                    'Content-Type': 'application/json',
                    'Bearer': localStorage.getItem("TOKEN")
               }
          });
          const data = await res.json();

          if (res.ok) {
               dispatch(getAllCustomersAction(toastMsg,null,null))

               toastMsg({
                    title: "Update successfull",
                    status: 'success',
               })
          } else {
               dispatch({ type: customersTypes.CUSTOMER_ERROR })
               toastMsg({
                    title: "Somthing went wrong",
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



/**
 * Delete a Customer's credentials
 * @param {Function} toastMsg - A function which will show the toast message.
 * @param {string} customerId - Customers's id in which we'll apply the update
 * */
 export const deleteCustomerAction = (toastMsg, customerId) => async (dispatch) => {
     if (!toastMsg || !customerId) return;

     dispatch({ type: customersTypes.CUSTOMER_LOADING });
     try {
          const res = await fetch(`http://localhost:8080/delete/${customerId}`, {
               method: "DELETE",
              
               headers: {
                    'Content-Type': 'application/json',
                    'Bearer': localStorage.getItem("TOKEN")
               }
          });
          const data = await res.json();

          if (res.ok) {
               dispatch(getAllCustomersAction(toastMsg,null,null))
               toastMsg({
                    title: "Delete successfull",
                    status: 'success',
               })
          } else {
               dispatch({ type: customersTypes.CUSTOMER_ERROR })
               toastMsg({
                    title: "somting went wrong",
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

export const syncCustomerAction = (toastMsg)=> async (dispatch)=>{
     if(!toastMsg) return;
     dispatch({type : customersTypes.CUSTOMER_LOADING})
     try{
          const res = await fetch("http://localhost:8080/sync-customers",{
               method:"POST",
               headers:{
                    'Content-Type': 'application/json'
               }
          })
          let data = await res.json();

     }
     catch(error){
          console.log(error);
     }
     toastMsg({
                         title: "sync Customer successfully",
                         status: 'success',
                    })
}





/**
 * sync  Customer's credentials
 * @param {Function} toastMsg - A function which will show the toast message.
 * */
//  export const syncCustomerAction = (toastMsg) => async (dispatch) => {
//      if (!toastMsg) return;

//      dispatch({ type: customersTypes.CUSTOMER_LOADING });
//      try {
//           const res = await fetch(`http://localhost:8080/sync-customers`, {
//                method: "POST",
              
//                headers: {
//                     'Content-Type': 'application/json',
//                     'Bearer': localStorage.getItem("TOKEN")
//                }
//           });
//           const data = await res.json();
          
//           if (res.ok) {
//                dispatch(getAllCustomersAction(toastMsg,null,null))
//                toastMsg({
//                     title: data,
//                     status: 'success',
//                })
//           } else {
//                dispatch({ type: customersTypes.CUSTOMER_ERROR })
//                toastMsg({
//                     title: data,
//                     status: 'error',
//                })
//           }
//      } catch (error) {
//           console.log('error:', error)
//           dispatch({ type: customersTypes.CUSTOMER_ERROR })
//           toastMsg({
//                title: error.message,
//                status: 'error',
//           })
//      }
// }