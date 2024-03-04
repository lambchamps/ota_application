import { z } from 'zod'

export const NoteSchema = z.object({
	id: z.number().positive().optional(),
	title: z.string({ required_error: 'Title is required'}).trim(),
	body: z.string({ required_error: 'Body is required'}).trim(),
}).strict()

export type Note = z.infer<typeof NoteSchema>
