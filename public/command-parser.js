
const commandTextarea = document.getElementById('command-input');
const outputConsole = document.getElementById('command-output');
const outputCtx = outputConsole.getContext('2d');


// commandTextarea.addEventListener("change", event => {
//     executeCommands(commandTextarea.value);
// });

const subjects = [];

const subject = {
    subjectID: -1,
    subjectName: '',
    studentGrades: []
};

const studentGrades = {
    studentID: -1,
    grades: []
};

const student = {
    studentID: -1,
    studentName: '',
    subjects: []
};

const operations = [
    "add grade",
    "modify grade",
    "delete grade",
    "show student grades",
    "show subject grades",
    "help"
];

const commands = {
    ADD_GRADE: "add grade: [student] [subject] [grade]",
    MODIFY_GRADE: "modify grade: [student] [subject] [index] [newGrade]",
    DELETE_GRADE: "delete grade: [student] [subject] [index]",
    SHOW_STUDENT_GRADES: "show student grades: [student]",
    SHOW_SUBJECT_GRADES: "show subject grades: [subject]",
    HELP: "help"
};

class invalidCommand extends Error {
    constructor() {
        super("Invalid command. Try 'help' for more info.");
        this.name = this.constructor.name;
    }
}
class invalidArgumentList extends Error {
    constructor(commandID) {
        super('Invalid command format for adding grade.\n ' +
            'Try: ' + commands[commandID]);
        this.name = this.constructor.name;
    }
}

function handleError(error) {
    console.error(`${error.name}: ${error.message}`);
    console.groupEnd();
}

function executeCommands(inputCommands){
    inputCommands = inputCommands.split('\n');
    for(let command of inputCommands){
        command = command.trim();
        if(command !== "")
            parseCommand(command);
    }
}

function parseCommand(command) {
    console.group('Executing command');
    console.log('Command:', command);

    let action;
    if(command==='help'){
        action = 'help';
    }
    else {
        const parts = command.split(":")
        const operation = parts[0].toLowerCase();
        const arguments = parts[1].split(" ");

        if (!(operation in operations)) {
            handleError(new invalidCommand());
            return;
        }
        const [action, ...target] = operation.split(" ");
    }

    switch(action) {
        case 'help':
            printHelp();
            break;
        case 'add':
            switch (target) {
                case 'grade':
                    if(arguments.length !== 3)
                    {
                        handleError(new invalidArgumentList(commands.ADD_GRADE));
                        return;
                    }
                    addGrade(arguments);
                    break;
                default:
                    handleError(new invalidCommand());
                    return;

            } break;
        case 'modify':
            switch (target) {
                case 'grade':
                    if(arguments.length !== 4)
                    {
                        handleError(new invalidArgumentList(commands.MODIFY_GRADE));
                        return;
                    }
                    modifyGrade(arguments);
                    break;
                default:
                    handleError(new invalidCommand());
                    return;

            } break;
        case 'delete':
            switch (target) {
                case 'grade':
                    if(arguments.length !== 3)
                    {
                        handleError(new invalidArgumentList(commands.DELETE_GRADE));
                        return;
                    }
                    deleteGrade(arguments);
                    break;
                default:
                    handleError(new invalidCommand());
                    return;

            } break;
        case 'show':
            switch (target) {
                case 'student grades':
                    if(arguments.length !== 1)
                    {
                        handleError(new invalidArgumentList(commands.SHOW_STUDENT_GRADES));
                        return;
                    }
                    showStudentGrades(arguments);
                    break;
                case 'subject grades':
                    if(arguments.length !== 1)
                    {
                        handleError(new invalidArgumentList(commands.SHOW_SUBJECT_GRADES));
                        return;
                    }
                    showSubjectGrades(arguments);
                    break;
                default:
                    handleError(new invalidCommand());
                    return;
            } break;
        default:
            handleError(new invalidCommand());
            return;
    }
    console.groupEnd();
}


function printHelp() {
    outputCtx.clearRect(0, 0, canvas.width, canvas.height);

    let yOffset = 20;
    outputCtx.fillText("Available commands:", 10, yOffset);

    Object.values(commands).forEach(command => {
        yOffset += 20;
        outputCtx.fillText(command, 10, yOffset);
    });
}



function addGrade(student, subject, grade) {
    let grades = localStorage.getItem(subject);
    if(grades === null) {
        grades = [];
    }
    if(!(subject in studentGrades[student])) {
        studentGrades[student][subject] = [];
    }
    studentGrades[student][subject].push(grade);
    console.group('Operation result');
    console.log(`Added grade ${grade} for ${student} in ${subject}.`);
    console.groupEnd();
}

function modifyGrade(student, subject, gradeIndex, newGrade) {
    if(!(student in studentGrades) || !(subject in studentGrades[student]) || gradeIndex < 0 || gradeIndex >= studentGrades[student][subject].length) {
        throw new Error('Invalid student, subject, or grade index.');
    }
    studentGrades[student][subject][gradeIndex] = newGrade;
    console.group('Operation result');
    console.log(`Modified grade at index ${gradeIndex} to ${newGrade} for ${student} in ${subject}.`);
    console.log('Updated grades:', studentGrades);
    console.groupEnd();
}

function deleteGrade(student, subject, gradeIndex) {
    if(!(student in studentGrades) || !(subject in studentGrades[student]) || gradeIndex < 0 || gradeIndex >= studentGrades[student][subject].length) {
        throw new Error('Invalid student, subject, or grade index.');
    }
    const deletedGrade = studentGrades[student][subject].splice(gradeIndex, 1)[0];
    console.group('Operation result');
    console.log(`Deleted grade ${deletedGrade} at index ${gradeIndex} for ${student} in ${subject}.`);
    console.log('Updated grades:', studentGrades);
    console.groupEnd();
}

function showStudentGrades(student) {
    if(!(student in studentGrades)) {
        console.warn(`No grades found for ${student}.`);
        return;
    }
    console.group('Operation result');
    console.log(`Grades for ${student}:`);
    for(const subject in studentGrades[student]) {
        const grades = studentGrades[student][subject];
        const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
        console.log(`${subject}: ${grades.join(', ')} (Average: ${average.toFixed(2)})`);
    }
    console.groupEnd();
}

function showSubjectGrades(subject) {
    let found = false;
    console.group('Operation result');
    console.log(`Grades for subject ${subject}:`);
    for(const student in studentGrades) {
        if(subject in studentGrades[student]) {
            const grades = studentGrades[student][subject];
            const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
            console.log(`${student}: ${grades.join(', ')} (Average: ${average.toFixed(2)})`);
            found = true;
        }
    }
    if(!found) {
        console.warn(`No grades found for subject ${subject}.`);
    }
    console.groupEnd();
}
