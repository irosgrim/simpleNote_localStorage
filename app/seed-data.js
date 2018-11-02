let db=[{id: 0, isDone: true, note: 'Hello world', date: dateToday()},
        {id: 1, isDone: false, note: 'Create print view', date: dateToday()},
        {id: 2, isDone: false, note: 'Create list and card views', date: dateToday()},
        {id: 3, isDone: false, note: 'Create multiple note lists', date: dateToday()},
        {id: 4, isDone: false, note: 'Reorder notes', date: dateToday()}
    ];


function dateToday(){
    let date = new Date();

    let year = date.getFullYear(),
        month = ('0'+ date.getMonth()).slice(-2),
        day = ('0'+ date.getDay()).slice(-2),
        hour = ('0'+ date.getHours()).slice(-2),
        minutes = ('0'+ date.getMinutes()).slice(-2),
        seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

}
