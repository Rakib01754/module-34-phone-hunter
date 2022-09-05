
// seach functionality -----------------
const search = () => {
    loader(true);
    const searchField = document.getElementById('input-field')
    const searchText = searchField.value;
    getData(searchText);


}

// get data from api ---------------------

const getData = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const response = await fetch(url)
    const recievedData = await response.json()
    const mainData = recievedData.data
    displayData(mainData);

}
// display on ui -----------------
const displayData = (phones) => {
    const phonesContainer = document.getElementById('phones-container')

    // seach with enter keyword 
    const searchField = document.getElementById('input-field')
    searchField.addEventListener('keyup', (press) => {
        if (press.key === 'Enter') {
            document.getElementById("search-btn").click();
        }
    })

    // not found message 
    const notFound = document.getElementById('not-found')
    if (phones.length === 0) {
        notFound.classList.remove('d-none')
    }
    else {
        notFound.classList.add('d-none')
    }
    phonesContainer.innerHTML = '';
    phones = phones.slice(0, 10);
    phones.forEach(phone => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('col')
        newDiv.innerHTML = `
        <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="phoneDetails('${phone.slug}')" >
                   Details
                </button>
                    </div>
                    </div>
                </div>
        `
        phonesContainer.appendChild(newDiv);

    })
    loader(false);

}

// explore details on modal -------------------
const phoneDetails = async (id) => {
    const phoneDetails = document.getElementById('exampleModal')
    phoneDetails.innerHTML = '';
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const response = await fetch(url)
    const recievedData = await response.json()
    const mainData = recievedData.data
    const newDiv = document.createElement('div')
    newDiv.classList.add('modal-dialog')
    newDiv.innerHTML = `
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${mainData.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <div class="card">
    <h2 class="text-center">Main Features</h2>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Brand: ${mainData.brand}</li>
    <li class="list-group-item">${mainData.mainFeatures.storage}</li>
    <li class="list-group-item">${mainData.mainFeatures.displaySize}</li>
    <li class="list-group-item">${mainData.mainFeatures.chipSet}</li>
    <li class="list-group-item">${mainData.mainFeatures.memory}</li>
  </ul>
    <h2 class="text-center">More Features</h2>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">${mainData.others.WLAN}</li>
    <li class="list-group-item">${mainData.others.Bluetooth}</li>
    <li class="list-group-item">${mainData.others.GPS}</li>
    <li class="list-group-item">${mainData.others.USB}</li>
  </ul>
 
</div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
</div>
    `
    phoneDetails.appendChild(newDiv);

}

const loader = (isLoading) => {
    const loader = document.getElementById('loader')
    if (isLoading === true) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none')
    }

}
getData('samsung');