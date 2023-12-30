import { Navigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({Component , isAuthenticated, ...props}) => {
  return (
  isAuthenticated ? <Component {...props} /> : <Navigate to="/admin" />
  )
}

export default PrivateRoute
