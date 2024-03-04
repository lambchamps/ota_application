import { SafeParseSuccess } from 'zod';
import { NoteSchema } from '../models/notes/notesSchema';
import type { Note } from '../models/notes/notesSchema';
import NotesRepository from './../repository/notesRepository'
import { isValidID, isValidJSON, parseValidator } from './../utils/validity';

const createNote = (note: Note) => {
    const parsedRequestBody = NoteSchema.safeParse(note)
    const result: boolean = parseValidator<Note>(parsedRequestBody)
    const notes = getAllNotes()

    if (result) {
        return NotesRepository.writeNote(
            notes,
            (parsedRequestBody as SafeParseSuccess<Note>).data
        )
    }

    return result
}

const getAllNotes = () => {
    const notes = NotesRepository.getNotes()
    const isJSON = isValidJSON(notes)

	if (!isJSON.valid) {
		return []
	}

	if (Array.isArray(isJSON.data)) {
		return isJSON.data
	}

	return []
}

/** 
 * Usage of noteService to reduce parsing of data
 * rather than using notesRepository
 */
const getNoteByID = (id: number | string) => {
    const parsedId = isValidID(id)

    if (!parsedId) {
        return false
    }

    const notes = getAllNotes()
    const note =  notes.find(note => note.id === parsedId)

    return note ?? false
}

const updateNote = (id: number | string, noteUpdate: Note) => {
    const parsedRequestBody = NoteSchema.safeParse(noteUpdate)
    const result: boolean = parseValidator<Note>(parsedRequestBody)    
    const notes = getAllNotes()
    const note = getNoteByID(id)

    if (!note || !result) {
        return false
    }

    const newNotes = notes.map(note => {
        if (note.id === Number(id)) {
            return {
                id: note.id,
                ...noteUpdate
            }
        }
        return note
    })

    return NotesRepository.updateNotes(newNotes)
}

const deleteNote = (id: number | string) => {
    const parsedId = isValidID(id)

    if (!parsedId) {
        return false
    }

    const notes = getAllNotes()
    const noteExist =  notes.some(note => note.id === parsedId)

    if (!noteExist) {
        return false
    }
    
    const newNotes = notes.filter(note => note.id !== parsedId)

    return NotesRepository.updateNotes(newNotes)
}

export default {
    createNote,
    getAllNotes,
    getNoteByID,
    updateNote,
    deleteNote
}