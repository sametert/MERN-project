import styles from '../styles/Note.module.css';
import { Card, CardBody, CardFooter, CardText, CardTitle } from "react-bootstrap"
import { Note as NoteModel } from "../models/note"
import { formatDate } from '../utils/formatDate';

interface NoteProps {
    note: NoteModel,
    className?: string
}

const Note = ({ note, className } : NoteProps) => {
    let createdUpdatedText: string;

    if(note.updatedAt > note.createdAt) {
        createdUpdatedText = "Updated: " + formatDate(note.updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(note.createdAt);
    }


  return (
    <Card className={`${styles.noteCard} ${className}`}>
        <CardBody className={styles.cardBody}>
            <CardTitle>
                {note.title}
            </CardTitle>
            <CardText className={styles.cardText}>
                {note.text}
            </CardText>
        </CardBody>
        <CardFooter className='text-muted'>
            {createdUpdatedText}
        </CardFooter>
    </Card>
  )
}

export default Note