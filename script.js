let url = 'https://3f09-181-231-122-56.ngrok-free.app/student';

window.onload = function() {
    getStudents();
};

function loadStudents() {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url + '/getAll');
        request.responseType = 'json';
        request.onload = function() {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                reject(Error(request.statusText));
            }
        };
        request.onerror = function() {
            reject(Error('Error: unexpected network error.'));
        };
        request.send();
    });
}

function createStudent() {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.responseType = 'json';
        request.setRequestHeader('Content-Type', 'application/json')
        var student = JSON.stringify({
            'dni': document.getElementById('dni').value,
            'lastName': document.getElementById('lastName').value,
            'firstName': document.getElementById('firstName').value,
            'email': document.getElementById('email').value,
            'cohort': '0',
            'status': 'activo',
            'gender': 'masculino',
            'address': 'abc123',
            'phone': '000'
        })
        request.onload = function() {
            if (request.status == 201) {
                resolve(request.response);
            } else {
                reject(Error(request.statusText));
            }
        };
        request.onerror = function() {
            reject(Error('Error: unexpected network error.'));
        };
        request.send(student);
    });
}

function updateStudent() {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('POST', url + `/${document.getElementById('selected-id').innerHTML}/update`);
        request.responseType = 'json';
        request.setRequestHeader('Content-Type', 'application/json')
        var student = JSON.stringify({
            'dni': document.getElementById('dni-update').value,
            'lastName': document.getElementById('lastName-update').value,
            'firstName': document.getElementById('firstName-update').value,
            'email': document.getElementById('email-update').value,
            'cohort': '0',
            'status': 'activo',
            'gender': 'masculino',
            'address': 'abc123',
            'phone': '000'
        })
        request.onload = function() {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                reject(Error(request.statusText));
            }
        };
        request.onerror = function() {
            reject(Error('Error: unexpected network error.'));
        };
        request.send(student);
    });
}

function deleteSelectedStudent() {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('POST', url + `/${document.getElementById('selected-id').innerHTML}/delete`);
        request.responseType = 'json';
        request.setRequestHeader('Content-Type', 'application/json')
        var student = JSON.stringify({
            'dni': document.getElementById('selected-dni').value,
            'lastName': document.getElementById('selected-lastName').value,
            'firstName': document.getElementById('selected-firstName').value,
            'email': document.getElementById('selected-email').value,
            'cohort': '0',
            'status': 'activo',
            'gender': 'masculino',
            'address': 'abc123',
            'phone': '000'
        })
        request.onload = function() {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                reject(Error(request.statusText));
            }
        };
        request.onerror = function() {
            reject(Error('Error: unexpected network error.'));
        };
        request.send(student);
    });
}


function getStudents() {
    loadStudents().then(response => {
        var output = document.getElementById('tableBody');
        output.innerHTML = "";
        response.forEach(element => {
            var row = output.insertRow();

            var id = row.insertCell();
            id.innerHTML = element.id;

            var dni = row.insertCell();
            dni.innerHTML = element.dni;

            var lastName = row.insertCell();
            lastName.innerHTML = element.lastName;

            var firstName = row.insertCell();
            firstName.innerHTML = element.firstName;

            var email = row.insertCell();
            email.innerHTML = element.email;

            var student = JSON.stringify({
                'id': element.id,
                'dni': element.dni,
                'lastName': element.lastName,
                'firstName': element.firstName,
                'email': element.email
            });
            var view = row.insertCell()
                view.innerHTML = `<button onclick='showStudent(${student})'>Select</button>`
        });
        console.log("Estudiantes actualizados")
    })
    .catch(error => console.error("Error"));
}

function addNewStudent() {
    createStudent().then(() => {
        getStudents() 
    })
    .catch(error => console.error(error));
}

function modifyStudent() {
    updateStudent().then(() => {
        getStudents()
    })
    .catch(error => console.error(error))
}

function deleteStudent() {
    deleteSelectedStudent().then(() => {
        getStudents()
    })
    .catch(error => console.error(error))
}

function showStudent(student) {
    document.getElementById('selected-id').innerHTML = student.id
    document.getElementById('selected-dni').innerHTML = student.dni
    document.getElementById('selected-lastName').innerHTML = student.lastName
    document.getElementById('selected-firstName').innerHTML = student.firstName
    document.getElementById('selected-email').innerHTML = student.email
}
