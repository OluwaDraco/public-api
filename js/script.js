let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const grindContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".grid-container");
const  modal= document.querySelector(".modal");
const  modalClose= document.querySelector(".modal-close");


fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch( err => console.log("something went wrong",err));

function displayEmployees(employeeData){
    let employeeHTML =``
    let employees = employeeData;

    employees.forEach( (employee,index) => {
        let name = employee.name;
        let email = employee.email;
        let location = employee.location;
        let picture = employee.picture;
    

        employeeHTML +=
        `
        <div class="card" data-index = ${index}>
                <img class="pfp" src="${picture.large}" alt="avater" />
                <div class="text-content">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${location.city}, ${location.state}</p>
                </div>
            </div>
        `
    });

   grindContainer.innerHTML= employeeHTML;

}

function displayModal({index,name,picture,email,location,dob,phone})



