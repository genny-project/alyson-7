import React, { useEffect } from 'react'
import { map, prop } from 'ramda'
import {
  Button,
  TextField,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  CardHeader,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

import Note from './note'

import { Row, Col } from '../../../components/layouts'

import useStyles from './styles'

import { getAll, postNote } from './helpers/notes-api'

const Notes = ({ baseEntities }) => {
  const [notes, setNotes] = React.useState({})
  const [noteContent, setNoteContent] = React.useState('')
  const [noteHeader, setNoteHeader] = React.useState('')
  const [showAddNote, setShowAddNote] = React.useState(false)

  const classes = useStyles()

  const handleSubmit = () => {
    setNoteHeader('')
    setNoteContent('')
    setShowAddNote(false)

    postNote({ noteContent, noteHeader, setNotes })
  }

  const handleShowAddNote = () => setShowAddNote(true)

  const removeNotes = id => console.log(id)

  useEffect(() => {
    getAll({ setNotes })
  }, [])

  return (
    <Grid container className={classes.root}>
      <Grid xs={12} className={classes.buttonControl}>
        <Button
          className={classes.button}
          color="secondary"
          onClick={handleShowAddNote}
          startIcon={<AddIcon />}
          fullWidth
        >
          Take a note...
        </Button>
      </Grid>

      {showAddNote && (
        <Col>
          <Card className={classes.card} variant="outlined">
            <CardHeader
              title={
                <TextField
                  value={noteHeader}
                  multiline
                  style={{ margin: 4 }}
                  placeholder="Title"
                  fullWidth
                  onChange={e => setNoteHeader(e.target.value)}
                />
              }
            />
            <CardContent>
              <TextField
                value={noteContent}
                multiline
                style={{ margin: 4 }}
                placeholder="Take a note"
                fullWidth
                onChange={e => setNoteContent(e.target.value)}
              />
            </CardContent>
            <CardActions disableSpacing>
              <Button variant="contained" color="inherit" onClick={handleSubmit}>
                Done
              </Button>
            </CardActions>
          </Card>
        </Col>
      )}
      <Col>
        {map(
          ({ id, ...rest }) => <Note key={'note' + id} {...rest} removeNotes={removeNotes} />,
          prop('data', notes) || [],
        )}
      </Col>
    </Grid>
  )
}

export default Notes