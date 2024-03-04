**Requirements**
- node 20.11.1 && npm 10.2.4 *or* nvm 20.11.1

**Setup**
- cd to `ota_application`
- run `npm install`
- run `npm run dev`

**API Endpoints**
- POST /notes: Create a new note.
- GET /notes: Retrieve all notes.
- GET /notes/:id: Retrieve a specific note by ID.
- PUT /notes/:id: Update a specific note.
- DELETE /notes/:id: Delete a specific note.

**Notes**
- In-memory database used is a simple text file named `notes.txt` under the main directory