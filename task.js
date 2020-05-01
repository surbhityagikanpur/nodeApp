fs = require('fs');

const preWwork = async() => {
    const promiseSolveTicket = new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve('ticket');
        }, 3000)
    });

    const divideSubtasks = promiseSolveTicket.then((t) => {
        return new Promise((resolve, reject) => {
            resolve(`${t} subtasks`)
        })
    
    });
    const workOnSubtasks = divideSubtasks.then((t)=> {
        //console.log("work with subtasks")
        return new Promise((resolve, reject) => {
            resolve(`${t} continue working with divided tasks`)
        })
    });
    let ticket = await promiseSolveTicket;

    //console.log(`${ticket} is created`)
    //console.log("divide task into subtask")

    let subtasks = await divideSubtasks;

    //console.log(`work with ${subtasks}`)

    let work = await workOnSubtasks;
    //console.log(`${work}`)

    return work;
}

let calc = function(num1, num2, callback){
    return callback(num1, num2);
}

exports.preWwork = preWwork;
exports.calc = calc;

