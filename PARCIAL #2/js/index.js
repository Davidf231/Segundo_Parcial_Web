const fecha = document.getElementById("entradaFecha");
const body_Menu = document.getElementById("cuerpoMenu");
const detalle= document.getElementById("detalle");
const tituloDetail = document.getElementById("titulo")
let indice = 1;

function buscar(){
    const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date="+fecha.value+"&api_key=CTuz8eJ5IeKQEFIjQhsD2XHPX3iwVUTfLkVkq9h3&page=1"

    consumir_api(url);
}

function mostrar_fotos(lista){
    body_Menu.textContent="";
    for (res in lista){
        let registro = lista[res];
        añadirTabla(registro,registro.id,registro.rover.name,registro.camera.full_name);
        if(res==0){
            ver_Detalles(registro);
        }
    }   
}

function añadirTabla(registro,id,nombre,camara){
    const fila = document.createElement("tr");
    const numID = document.createElement('td');
    numID.textContent = id;
    const nom = document.createElement('td');
    nom.textContent=nombre;
    const camera = document.createElement("td");
    camera.textContent=camara;
    const celdaDetalle = document.createElement('td');
    const btn_detalle = document.createElement('button');
    btn_detalle.textContent="More";
    btn_detalle.addEventListener('click', () => ver_Detalles(registro));
    celdaDetalle.appendChild(btn_detalle);
    fila.appendChild(numID);
    fila.appendChild(nom);
    fila.appendChild(camera);
    fila.appendChild(celdaDetalle);
    body_Menu.appendChild(fila);

}

function ver_Detalles(registro){
    detalle.textContent="";
    const imagen = document.createElement("img");
    imagen.src=registro.img_src;
    const detalle1 = document.createElement("p");
    detalle1.textContent="Id: "+registro.id;
    const detalle2 = document.createElement("p");
    detalle2.textContent="Martian Sol: "+registro.sol;
    const detalle3 = document.createElement("p");
    detalle3.textContent="Earth date: "+registro.earth_date;

    detalle.appendChild(tituloDetail);
    detalle.appendChild(imagen);
    detalle.appendChild(detalle1)
    detalle.appendChild(detalle2)
    detalle.appendChild(detalle3)

}

function siguiente(){
    indice+=1;
    const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date="+fecha.value+"&api_key=CTuz8eJ5IeKQEFIjQhsD2XHPX3iwVUTfLkVkq9h3&page="+indice;
    
    consumir_api(url);
}

function anterior(){
    if(indice!=1){
        indice=indice-1;
        const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date="+fecha.value+"&api_key=CTuz8eJ5IeKQEFIjQhsD2XHPX3iwVUTfLkVkq9h3&page="+indice;
        consumir_api(url);
    }
    
}

window.onload = function(){
    const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date="+fecha.value+"&api_key=CTuz8eJ5IeKQEFIjQhsD2XHPX3iwVUTfLkVkq9h3&page=1"

    consumir_api(url);
}

function consumir_api(url){
    fetch(url)
        .then((response)=>{
            return response.json();
        })
        .then(data=>{mostrar_fotos(data.photos)})
}