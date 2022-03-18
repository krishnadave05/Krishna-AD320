import React, { useEffect, useState } from "react"
import { useAuth } from "../Auth/AuthProvider"
import axios from "axios"
import { MenuItem, Container } from "@mui/material"

const User = (props) => {
  //this will show the user's name, id and a list of names of decks they own
  const { auth } = useAuth()
  const [user, setUser] = useState(null)
  const [decks, setDecks] = useState(null)
  useEffect(() => {
    if (auth) {
      axios
        .get(`http://localhost:8000/users/${auth.user}`, {
          headers: { authorization: `Bearer ${auth.token}` },
        })
        .then((response) => {
          setUser(response.data)
          setDecks(response.data.decks)
        })
    }
  }, [auth])

  return (
    <React.Fragment>
      {/* align data in center of the page */}
      {user === null && <span>Loading...</span>}
      <Container width="lg" align="center">
        <h1>
          {user?.firstName} {user?.lastName}
        </h1>
        <h2>{user?.id}</h2>
        <h3>Decks:</h3>
        <MenuItem>{decks?.map((deck) => deck.name)}</MenuItem>
      </Container>
    </React.Fragment>
  )
}

export default User
