import auth from '../../service/authService'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const user = auth.GetCurrentUser()
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user || user.isAdmin === false) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
        if (user && user.isAdmin) {
          return Component ? <Component {...props} /> : render(props)
        }
      }}
    />
  )
}

export default ProtectedRoute
