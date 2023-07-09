let url = 'https://d940-181-231-122-56.ngrok-free.app/student';

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
        });
        console.log("Estudiantes actualizados")
    })
    .catch(error => console.error("Error"));
}