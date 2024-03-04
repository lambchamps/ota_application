const fs = require('fs')

import { Note } from './../models/notes/notesSchema';

const NoteFileName ='notes.txt'

const getNotes = (): Note[] => {
	if (fs.existsSync(NoteFileName)) {
		return fs.readFileSync(NoteFileName, 'utf8')
	}

	return []
}

const writeNote = (notes: Note[], newNote: Note) => {
	newNote.id = notes.length + 1
	notes.push(newNote)

	try {
		fs.writeFileSync(NoteFileName, JSON.stringify(notes), 'utf-8')
		return true
	} catch (_) {
		return false
	}
}

const updateNotes = (notes: Note[]) => {
	try {
		fs.writeFileSync(NoteFileName, JSON.stringify(notes), 'utf-8')
		return true
	} catch (_) {
		return false
	}
}

export default {
	getNotes,
	writeNote,
	updateNotes
}
