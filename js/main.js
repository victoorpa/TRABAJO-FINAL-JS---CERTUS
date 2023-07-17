//Array de objetos bruto y procesados
let arrayObjetoBrutos = new Array();
let arrayObjetosProcesados = new Array();

//Peticion al Servidor
fetch("productos.json")
  .then((respuesta) => respuesta.json())
  .then((objetos) => {
    arrayObjetoBrutos = objetos;
    //Al finalizar la peticion....
    cargarArrayProductosProcesados();
  });

//Funcion procesar productos
function cargarArrayProductosProcesados() {
  //iterar los objetos brutos
  arrayObjetoBrutos.forEach((objeto) => {
    //creando nuevo objetos de clase producto
    arrayObjetosProcesados.push(new Producto(objeto));
  });

  //terminado de iterar empieza a armar catalogo
  cargarCatalogo();
}

//Funcion armar catalogo
function cargarCatalogo() {
  //iterar los objetos procesados
  arrayObjetosProcesados.forEach((objeto) => {
    //crear nuevo elemento articulo
    let nuevoArticulo = document.createElement("article");
    nuevoArticulo.setAttribute("class", "col-6 col-md-4 col-lg-3");
    //especificar contenido HTML
    nuevoArticulo.innerHTML = `
        <img class="imgProduct img-fluid" src="${objeto.image}" alt="${objeto.name}">
        <h5>${objeto.name}</h5>
        <p>
            <span class="precioOriginal">S/.${objeto.priceOriginal}</span>
            <br><span class="precioDescuento">${objeto.priceDescuento}</span> de Descuento
            <br><span class="precioFinal">S/.${objeto.priceFinal}</span>
        </p>
        <button class="btn btn-primary" data-producto-sku="${objeto.sku}"> Agregar al carrito</button>

        `;
    //añadir el nuevo articulo al catalogo
    document.querySelector("#catalogo").append(nuevoArticulo);
  });
}
