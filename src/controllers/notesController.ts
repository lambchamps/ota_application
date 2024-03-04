const express = require('express')

import { Routes } from './../enums/Routes';
import type { Request, Response } from 'express'
import NotesService from './../services/notesService'
import { StatusCodes } from './../enums/StatusCode';

const notesRouter = express.Router()

notesRouter.post(Routes.Create, (req: Request, res: Response) => {
    const response = NotesService.createNote(req.body)

    res.status(response ? StatusCodes.Success : StatusCodes.BadRequest)
        .send({ result: response })
})

notesRouter.get(Routes.GetAll, async (req: Request, res: Response) => {
    try {
        res.status(StatusCodes.Success).send({ notes: NotesService.getAllNotes() })
    } catch (error) {
        res.status(StatusCodes.BadRequest).send({ notes: NotesService.getAllNotes() })
    }
})

notesRouter.get(Routes.GetByID, async (req: Request, res: Response) => {
    const { id } = req.params

    const note = NotesService.getNoteByID(id)

    if (!note) {
        res.status(StatusCodes.Success).send({ message: 'Note not found' })
        return
    }

    res.status(StatusCodes.Success).send({ note })
})

notesRouter.put(Routes.Update, async (req: Request, res: Response) => {
    const { id } = req.params

    const response = NotesService.updateNote(id, req.body)

    if (response) {
        res.status(StatusCodes.Success).send({ result: 'Note Updated' })
        return
    }

    res.status(StatusCodes.Success).send({ result: 'Request Failed' })
})

notesRouter.delete(Routes.Delete, async (req: Request, res: Response) => {
    const { id } = req.params

    const note = NotesService.deleteNote(id)

    if (note) {
        res.status(StatusCodes.Success).send({ message: 'Note Deleted!' })
        return
    }

    res.status(StatusCodes.Success).send({ message: 'Note not found' })
})

export default notesRouter
