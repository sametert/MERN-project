import styles from '../styles/Note.module.css';
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap"
import { Note as NoteModel } from "../models/note"

interface NoteProps {
    note: NoteModel
}

const Note = ({ note } : NoteProps) => {
  return (
    <Card className={styles.noteCard}>
        <CardBody>
            <CardTitle>
                {note.title}
            </CardTitle>
            <CardText className={styles.cardText}>
                {note.text}
            </CardText>
        </CardBody>
    </Card>
  )
}

export default Note