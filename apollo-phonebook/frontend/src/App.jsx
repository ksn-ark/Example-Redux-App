import { useEffect, useState } from "react"
import { useQuery, useMutation, useApolloClient } from "@apollo/client"
import { ALL_PERSONS, LOGIN } from "./queries"

import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Notify from "./components/Notify"
import PhoneForm from "./components/PhoneForm"
import LoginForm from "./components/LoginForm"

const App = () => {
  const personsResult = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const [login, loginResult] = useMutation(LOGIN, {
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem("phonenumbers-user-token")
    if (token) {
      setToken(token)
    }
  }, [setToken])

  useEffect(() => {
    if (loginResult.data) {
      const token = loginResult.data.login.value
      setToken(token)
      localStorage.setItem("phonenumbers-user-token", token)
    }
  }, [loginResult.data, setToken])

  if (personsResult.loading) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={personsResult.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  )
}

export default App
