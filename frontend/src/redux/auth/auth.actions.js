import * as authTypes from './auth.types';


/**
 * Login user
 * @param {Object} cred - A object with 'username', and 'password'.
 * @param {Function} navigate - A function to navigate to the login page.
 * @param {Function} toastMsg - A fuction to show a toast message.
 * */
export const login = (cred, navigate, toastMsg) => async (dispatch) => {
     if (!cred.username || !cred.password) return;

     dispatch({ type: authTypes.AUTH_LOADING });
     
console.log(cred);
     try {

          const res = await fetch("http://localhost:8080/auth/signIn", {

               method: 'GET',
               // body: JSON.stringify(cred),
               headers: {
                    'Content-Type': 'application/json'
               }
          })

          const data = await res.json();
          console.log(data);
          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT })
               alert(`Session Expired! \n Please Login again.. ${navigate ? navigate('/login') : window.location.replace('/login')}`)
               return;
          }

          if (res.ok) {
               dispatch({ type: authTypes.AUTH_LOGIN_SUCCESS, payload: data.user });
               navigate('/');
          } else {
               dispatch({ type: authTypes.AUTH_ERROR });
          }

          toastMsg({
               title: data.message,
               status: res.ok ? 'success' : 'warning',
          })

     } catch (error) {
          console.log('error:', error);
          dispatch({ type: authTypes.AUTH_ERROR });
          toastMsg({
               title: error.message,
               status: 'error'
          });
     }
}


/**
 * Signup user
 * @param {Object} cred - A object with 'username', 'name', and 'password'.
 * @param {Function} navigate - A function to navigate to the login page.
 * @param {Function} toastMsg - A fuction to show a toast message.
 * */
export const signup = (cred, navigate, toastMsg) => async (dispatch) => {
     if (!cred.username || !cred.name || !cred.password) return;

     // ? PASSWORD VERIFIER
     if (cred.password.length <= 5) {
          toastMsg({
               title: 'Password must contain more than 5 char!',
               status: 'warning'
          })
          return;
     }
     console.log(import.meta.env.VITE_BACKEND_BASE_URL)

     dispatch({ type: authTypes.AUTH_LOADING });

     try {
          const res = await fetch("http://localhost:8080/auth/singUp", {
               method: "POST",
               body: JSON.stringify(cred),
               headers: {
                    'Content-Type': 'application/json'
               }
          })

          const data = await res.json();


          // * IF TOKEN EXPIRED
          if (res.status === 401) {
               dispatch({ type: AUTH_LOGOUT })
               alert(`Session Expired! \n Please Login again.. ${navigate ? navigate('/login') : window.location.replace('/login')}`)
               return;
          }

          if (res.ok) navigate('/login');
          dispatch({ type: res.ok ? authTypes.AUTH_SUCCESS : authTypes.AUTH_ERROR });

          toastMsg({
               title: data.message,
               status: res.ok ? 'success' : 'warning',
          });
     } catch (error) {
          console.log('error:', error);
          dispatch({ type: authTypes.AUTH_ERROR })
          toastMsg({
               title: error.message,
               status: 'error'
          });
     }
}