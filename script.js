let url = '';


window.onload = function() {
    
}

function loadStudents(){
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url + '/getAll')
        request.responseType = 'json'

        request.onload = function(){
            if(request.status == 200)  resolve(request.response)
            else reject(Error(request.statusText))
        }
    })
}

function getStudents() {
    loadStudents().then( response => {
        var output = document.getElementById('output-container')
        response.forEach( element => {
            var row = output.insertRow()

            var id = row.insertCell()
            id.innerHTML = element.id

            var dni = row.insertCell()
            dni.innerHTML = element.dni

            var lastName = row.insertCell()
            lastName.innerHTML = element.lastName
            
            var firstName = row.insertCell()
            firstName.innerHTML = element.firstName

            var email = row.insertCell()
            email.innerHTML = element.email

            var student = JSON.stringify({
                'id': element.id,
                'dni': element.dni,
                'lastName': element.lastName,
                'firstName': element.firstName,
                'email': element.email
            })
            var show = row.insertCell()
            show.innerHTML = `<button onclick='showStudents(${student})'>Show Students</button>`
        })
    })
    .catch(/* reason => {
        console.error(caca)
    }*/
    console.error("Error")
    )
}

