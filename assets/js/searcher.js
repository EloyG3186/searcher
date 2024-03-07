let loadProductJSON = () => {
    //Peticion asincrónica con fetch a un URL en formato JSON
    let URL = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json"

    fetch(URL)
        .then(response => response.json())
        .then(result => {

            //console.log(result)
            let plantilla = ""
            for (i = 0; i < result.length; i++) {
                plantilla = plantilla + `
                    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                    <div class="card card-blog card-plain">
                    <div class="card-header p-0 mt-n4 mx-3">
                        <a class="d-block shadow-xl border-radius-xl">
                        <img src="${result[i].src}" alt="${result[i].name}" class="img-fluid shadow border-radius-xl">
                        </a>
                    </div>
                    <div class="card-body p-3">
                        <p class="mb-0 text-sm">${result[i].type}</p>
                        <a href="javascript:;">
                        <h5>
                            ${result[i].name}
                        </h5>
                        </a>
                        <p class="mb-4 text-sm">
                        <b>Price: </b> $ ${result[i].price}
                        </p>
                    </div>
                    </div>
                </div>
                `
            }
            let productos = document.getElementById("productos")
            productos.innerHTML = plantilla
        })

        .catch(error => {

            /* Callback por fallo: Procese el error */

            console.log(error);

        });


}

let loadProductXML = (filtro) => {
    let URL = "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml"

    fetch(URL)
        .then(response => response.text()) /* Convierte el response a texto */
        .then(result => {

            let xml = (new DOMParser()).parseFromString(result, 'application/xml');

            /* Callback por éxito: Procese el xml */

            //console.log( xml );
            //let approved = students.filter(student => student.score >= 11);
            let productosAll = xml.getElementsByTagName("product")
            let productos = productosAll
            console.log(productosAll)
            if (filtro != null) {
                productos = productosAll.filter(product => product.type === filtro)
            }
            
            let plantilla = ""
            for (let producto of productos) {
                //console.log(producto)
                let name = producto.querySelector("name").textContent
                let price = producto.querySelector("price").innerHTML
                let src = producto.querySelector("src").innerHTML
                let type = producto.querySelector("type").innerHTML

                plantilla = plantilla + `
                    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
                    <div class="card card-blog card-plain">
                    <div class="card-header p-0 mt-n4 mx-3">
                        <a class="d-block shadow-xl border-radius-xl">
                        <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                        </a>
                    </div>
                    <div class="card-body p-3">
                        <p class="mb-0 text-sm">${type}</p>
                        <a href="javascript:;">
                        <h5>
                            ${name}
                        </h5>
                        </a>
                        <p class="mb-4 text-sm">
                        <b>Price: </b> $ ${price}
                        </p>
                    </div>
                    </div>
                </div>
                `

            }

            let productosHTML = document.getElementById("productos")
            productosHTML.innerHTML = plantilla

        })
        .catch(error => {

            /* Callback por fallo: Procese el error */

            console.log(error);

        });
}


let filtrarProducto = () => {
    let filtro = document.getElementById("text")
    let filterButton = document.getElementById("filter")
    filterButton.addEventListener("click", function () {
        //console.log(filtro.value)
        loadProductXML(filtro.value)
    })
}

//loadProductJSON()
loadProductXML()
filtrarProducto()