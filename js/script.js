let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const grindContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const  modal= document.querySelector(".modal-content");
const  modalClose= document.querySelector(".modal-close");

/**
 * fetches 12 random json objects form the random-user api
 */
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch( err => console.log("something went wrong",err));

/**
 * 
 * @param {para} employeeData takes array produced from fetch and asigns it to the employee var created
 */
function displayEmployees(employeeData){
    let employeeHTML =``
     employees = employeeData;
/**
 * maps objects properties to varibles 
 */
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

   grindContainer.innerHTML = employeeHTML;

}

function displayModal(index){
    let { name ,dob ,phone ,email ,location:{city, street,state,postcode},
    picture} = employees[index];

    let date = new Date(dob.date);

    const modalHTML =
    `
                    <img class="pfp" src="${picture.large}" alt="avater" />
                    <div class="text-content">
                        <h2 class="name">${name.first} ${name.last}</h2>
                        <p class="email">${email}</p>
                        <p class="address">${city}</p>
                        <hr />
                        <p>${phone}</p>
                        <p class="address">${street} , ${city}, ${state},${postcode}</p>
                        <p>Birthday: ${date.getMonth()}/${date.getDay()}/${date.getFullYear()}</p>
                    </div>
                </div>
            </div>
    
    `;
overlay.classList.remove("hidden");
modal.innerHTML = modalHTML;
}


grindContainer.addEventListener("click", e =>{
    /**
     * checks if the user clicked on a card and not somewhere on the grid its self.
     */
    if(e.target !== grindContainer){
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index')

        displayModal(index);
    }
});
/**
 * adds the "hidden" class to the overlay when the "X" button is clicked
 */
modalClose.addEventListener('click', e=>{
    overlay.classList.add('hidden');
});


