const fs = require('fs')
const chalk = require('chalk')



const addNote = (title, body) => {
    // load existing notes
    const notes = loadNotes()
    const duplicateNote = notes.find(n => n.title === title)
    console.log(duplicateNote)
    if (!duplicateNote) { // means there are no duplicates on notes
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added')
    } else {
        console.log("note title taken")
    }

    
}
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(n => n.title === title)
    if(!note){
        console.log(chalk.red('Note not Found'))
    } else {
        console.log(chalk.green.bold(`Title: ${note.title} - Body: ${note.body}`))
    }

}
const saveNotes = (notesArr) => { // will save to a JSON file with the notes
    // transform array into string
    const dataJSON = JSON.stringify(notesArr)
    // write to the file // this will create a file if it doesn't exist
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () =>{ // will return an array of notes
    try { // do thee following three lines

        const dataBuffer = fs.readFileSync('notes.json')
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)

    } catch(e){ // if none of that works do the following line
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(n => n.title !== title)
    if(notesToKeep.length < notes.length){
        // stringify array
        const dataJSON = JSON.stringify(notesToKeep)
        fs.writeFileSync('notes.json', dataJSON)
        console.log(chalk.green.bold.inverse('Note Removed!'))
    } else{
        console.log(chalk.red.bold.inverse(`not found!`))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.bold('Your Notes'))
    notes.forEach(n => console.log(chalk.green(`- ${n.title}`)))
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote, 
    listNotes: listNotes,
    readNote: readNote
}



