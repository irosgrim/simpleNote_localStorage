let htmlElements = {
    inpt: document.getElementById('inpt'),
    addBtn: document.getElementById('add'),
    lis: document.getElementsByTagName('li'),
    list: document.getElementById('list'),
    visible: false,
    check: false
}

let localStorageDb = JSON.parse(localStorage.getItem('getDB'));

htmlElements.list.addEventListener('click', (e) => {

    let currentNote = e.target;
    let noDateStr = currentNote.innerText.substr(0, currentNote.innerText.length - 19);
    console.log(currentNote);
    if (currentNote && currentNote.matches('li.item')) {

        const formsUpdate = document.getElementById('formsUpdate');
        let noteAttributes = currentNote.getAttribute('data-id').split("*"),
            noteId = noteAttributes[0],
            noteStatus = noteAttributes[1],
            noteDate = noteAttributes[2],
            previous = currentNote.previousSibling;

        if (formsUpdate === null && htmlElements.visible === false) {

            createLi(noDateStr, previous, currentNote, noteId, noteStatus, noteDate, currentNote);

        } else if (htmlElements.visible === true) {

            formsUpdate.remove();
            htmlElements.visible = false;

            createLi(noDateStr, previous, currentNote, noteId, noteStatus, noteDate, currentNote);

        }

    }


})

function createLi(defaultValue, where, theLi, theId, theStatus, theDate, theNote) {

    let newItem = document.createElement('li');

    newItem.classList.add('formLi');
    newItem.setAttribute('id', 'formsUpdate');
    let checkStyle = '';
    if (theStatus === 'true') {
        checkStyle = 'fa-check-square';
        htmlElements.check = true;
    } else {
        checkStyle = 'fa-square';
        htmlElements.check = false;
    }
    newItem.innerHTML = `
       <div class="formsUpdate">
             <div class="inptUpdate">
             <input type="text" class="inpt darker" id="inptModify" value="${defaultValue}">

             <button class="btn" id="updateBtn">
                  <i class="fas fa-check"></i> 
             </button>
             </div>
             <div class="updateBtns">
             <button class="btn" id="doneBtn">
                  <i class="far ${checkStyle}" id="checkBtn"></i>
             </button>
             <button class="btn" id="deleteEntryBtn">
                 <i class="far fa-trash-alt" id="deleteBtn"></i>
             </button>
             </div>
       </div>`;

    list.insertBefore(newItem, where);

    let updateBtn = document.getElementById('updateBtn'),
        inptModify = document.getElementById('inptModify'),
        doneBtn = document.getElementById('doneBtn'),
        deleteEntryBtn = document.getElementById('deleteEntryBtn'),
        checkBtn = document.getElementById('checkBtn'),
        getDoneStatus = theNote.getAttribute('data-id').split("*"),
        entryToBeUpdated;

    for (let i = 0; i < localStorageDb.length; i++) {

        if (localStorageDb[i].note === inptModify.value) {

            dateCreated = localStorageDb[i].date;
            // Update entry
            updateBtn.addEventListener('click', () => {
                console.log('click');
                localStorageDb[i].note = inptModify.value;
                localStorage.setItem('getDB', JSON.stringify(localStorageDb));
                theLi.dataset.id = `${theId}*${htmlElements.check}*${dateToday()}`;
                theLi.innerHTML = inptModify.value + `<div class="noteDate">${dateToday()}</div>`;
                formsUpdate.remove();
                htmlElements.visible = false;
            })
        }
    }

    deleteEntryBtn.addEventListener('click', () => {
        
        let findThis = {id: theId, isDone: theStatus, note: theNote, date:theDate}
        let arr = localStorageDb.find(elements =>{
           if(elements.id === parseInt(theId)){
               return elements;
           }
        })
        
        localStorageDb.splice( localStorageDb.indexOf(arr), 1);
        localStorage.setItem('getDB', JSON.stringify(localStorageDb));
        formsUpdate.remove();
        htmlElements.visible = false;
        theNote.remove();

    });

    doneBtn.addEventListener('click', () => {

        console.log('--------', theNote.matches('li.item.done'));
        if (htmlElements.check === false) {

            checkBtn.classList.remove('fa-square');
            checkBtn.classList.add('fa-check-square');
            theNote.style.textDecoration = 'line-through';
            htmlElements.check = true;
            theLi.dataset.id = `${theId}*${htmlElements.check}*${dateToday()}`;

        } else {
            theNote.style.textDecoration = 'none';
            checkBtn.classList.remove('fa-check-square');
            checkBtn.classList.add('fa-square');
            htmlElements.check = false;
            theLi.dataset.id = `${theId}*${htmlElements.check}*${dateToday()}`;


        }
        if (theStatus === 'false') {
            localStorageDb[theId].isDone = true;
            localStorage.setItem('getDB', JSON.stringify(localStorageDb));
        } else {
            localStorageDb[theId].isDone = false;
            localStorage.setItem('getDB', JSON.stringify(localStorageDb));
        }
        // console.log(local_db[theId].isDone);
        formsUpdate.remove();
        htmlElements.visible = false;

    });

    htmlElements.visible = true;

}

// uncomment this to create the local DB
//localStorage.setItem('getDB', JSON.stringify(db));


localStorageDb.forEach(element => {
    list.innerHTML += `
     <li class="item" data-id="${element.id}*${element.isDone}*${element.date}" style="${lineThrough(element)}">${element.note}<div class="noteDate">${element.date}</div></li>
     `
})

htmlElements.addBtn.addEventListener('click', () => {
    if (inpt.value !== '') {

        nr = 0;

        localStorageDb.forEach(element => {

            if (element.id > nr) {
                nr = element.id;
            }
        })

        let data = {
            id: nr + 1,
            isDone: false,
            note: htmlElements.inpt.value,
            date: dateToday()
        }

        localStorageDb.push(data);
        localStorage.setItem('getDB', JSON.stringify(localStorageDb));

        list.innerHTML += `
        <li class="item" data-id="${data.id}*${data.isDone}*${data.date}" style="${lineThrough(data.isDone)}">${data.note}<div class="noteDate">${data.date}</div></li>
        `;
        inpt.value = '';
    }
}
)

window.onclick = (event) => {

    let formsDiv = document.getElementById('formsUpdate');

    if (event.target.className !== 'item' && event.target.className !== 'formsUpdate'
        && event.target.className !== 'inpt darker' && event.target.className !== 'fas fa-check'
        && event.target.className !== 'inptUpdate' && event.target.className !== 'far fa-trash-alt'
        && event.target.className !== 'far fa-square' && event.target.className !== 'far fa-check-square'
        && formsDiv !== null) {
        formsDiv.remove();
        htmlElements.visible = false;
    }
}
function lineThrough(element) {

    if (element.isDone === true) {
        return `text-decoration: line-through`;
    } else {
        return 'text-decoration: none';
    }
}