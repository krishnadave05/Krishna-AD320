import React, { useState } from "react"
import { Button, Stack, TextField } from "@mui/material"

const CreateFlashcard = ({userId ,deckId }) => {
  const [values, setValues] = useState({
    frontImage: "",
    frontText: "",
    backImage: "",
    backText: ""
  })
  const [err, setErrs] = useState({
    frontImageErr: "",
    frontTextErr: "",
    backImageErr: "",
    backTextErr: "",
    success: false,
  })

  
  const { frontImage, frontText, backImage, backText } = values
  const { frontImageErr, frontTextErr, backImageErr, backTextErr } = err

  const validateFrontImage = () => {
    const { frontImage } = values;
      setErrs({...err,
        frontImageErr:
          frontImage.length > 3 ? null : 'frontImage must be longer than 3 characters'
      });
  }

  const handleFrontImage = event => {
    setValues({...values, frontImage: event.target.value})
    validateFrontImage()
  }

  const validateFrontText = () => {
    const { frontText } = values;
      setErrs({...err,
        frontTextErr:
          frontText.length > 3 ? null : 'frontText must be longer than 3 characters'
      });
  }

  const handleFrontText = event => {
    setValues({...values, frontText: event.target.value})
    validateFrontText()
  }

  const validateBackImage = () => {
    const { backImage } = values;
      setErrs({...err,
        backImageErr:
        backImage.length > 3 ? null : 'backImage must be longer than 3 characters'
      });
  }

  const handleBackImage = event => {
    setValues({...values, backImage: event.target.value})
    validateBackImage()
  }

  const validateBackText = () => {
    const { backText } = values;
      setErrs({...err,
        backTextErr:
          backText.length > 3 ? null : 'backText must be longer than 3 characters'
      });
  }

  const handleBackText = event => {
    setValues({...values, backText: event.target.value})
    validateBackText()
  }

  
  const handleSubmit = (event) => {
    event.preventDefault()
    const card = {
      frontImage,
      frontText,
      backImage,
      backText
    }
    // console.log(card)
    fetch(`http://localhost:7000/decks/${deckId}/cards`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          user: `${userId}`
      },
      body: JSON.stringify(values)
  }).then(response => {
    return response.json()
  })
  .then(res => {
    if(res.error) {
      alert(res.error +" "+res.param)
      setErrs({...err, success: false})
    } else {
      setValues({
        ...values,
        frontImage: "",
        frontText: "",
        backImage: "",
        backText: ""
      })
      setErrs({...err, success: res.msg})
    }
  })
    
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {err.success != "" ? (
        <div style={{color: "green"}}>{err.success}</div>
      ) : (
        <></>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="frontImage"
        label="Front Image"
        name="frontImage"
        autoFocus
        value={frontImage}
        onChange={e => handleFrontImage(e)}
        onBlur={validateFrontImage}
      />
      <div style={{color: "red"}}>{frontImageErr}</div>
      <TextField
        margin="normal"
        required
        fullWidth
        name="frontText"
        label="Front Text"
        id="frontText"
        value={frontText}
        onChange={e => handleFrontText(e)}
        onBlur={validateFrontText}
      />
      <div style={{color: "red"}}>{frontTextErr}</div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="backImage"
        label="Back Image"
        name="backImage"
        value={backImage}
        onChange={e => handleBackImage(e)}
        onBlur={validateBackImage}
      />
      <div style={{color: "red"}}>{backImageErr}</div>
      <TextField
        margin="normal"
        required
        fullWidth
        name="backText"
        label="Back Text"
        id="backText"
        value={backText}
        onChange={e => handleBackText(e)}
        onBlur={validateBackText}
      />
      <div style={{color: "red"}}>{backTextErr}</div>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Stack>
  )
}

export default CreateFlashcard
