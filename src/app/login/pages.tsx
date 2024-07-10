import { login } from './actions'

export const Login = () => {
  return (
    <div>
      <div>Current User:</div>
      {/* <div >{JSON.stringify(user, null, 2)}</div> */}
      {/* {user != null ? ( */}
      {/* <button onClick={login}>
            Logout
          </button> */}
      {/* ) : ( */}
      <button
        onClick={() => {
          login()
        }}
      >
        Login
      </button>
      {/* )} */}
    </div>
  )
}
