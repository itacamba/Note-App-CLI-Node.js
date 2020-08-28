//const validator = require('validator') // npm module only the name of the package, not the path
const notesUtilities = require('./notes.js')
const yargs = require('yargs')
const notes = require('./notes.js')


// customize yargs version
yargs.version('1.1.0')

// create add command
yargs.command({
    command: 'add', // name of command
    describe: 'Add a new note', // description of what this command does
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    }, 
    handler(argv){ // function this is what the command will excecute if the command gets used
        notesUtilities.addNote(argv.title, argv.body)
    }
})

// create a remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        const title = argv.title
        notesUtilities.removeNote(title)
    }
})

// create a list command 
yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler(){
        notesUtilities.listNotes()
    }
})

// create a read command
yargs.command({
    command: 'read',
    describe: 'read a note',
    builer: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notesUtilities.readNote(argv.title)
    }
})

yargs.parse() // will only print the command that is called.


