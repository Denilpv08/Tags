//Creacion  de un array donde se almacenara los datos
let tags = [];

//Haciendo la conexion con nuestra capa creada en html
const inputTag = document.querySelector("#input-tag");

//Creando elementos nuevos
const div = document.createElement("DIV");
const span = document.createElement("SPAN");

//Haciendo que nuestro span se comporte como un input
span.ariaRoleDescription = "textbox";
span.contentEditable = "true";
span.classList.add("input");
span.focus();

//Agregando la clases a los contenedores
inputTag.classList.add("input-tag-container");
div.classList.add("tag-container");

//Haciendo creacion de elementos hijos - appendChild()
inputTag.appendChild(div);
div.appendChild(span);

//Creacio  de evento para poder escribir en nuestra capa
inputTag.addEventListener("click", (e) =>{
    if (e.target.id == "input-tag" || e.target.classList.contains("tag-container")) {
        span.focus();
    }
});

//Creacion de un evneto para poder crear una etiqueta
span.addEventListener('keydown', (e) =>{
    if (e.key == 'Enter' && span.textContent != '') {
        e.preventDefault();
        if (!existTag(span.textContent)) {
            tags.push(span.textContent);
            span.textContent = '';
            renderTags();   
        }
    } else if (e.key == "Backspace" && span.textContent == "" && tags.length > 0) {
        tags.pop();
        renderTags();
    }
});

//Creacion de una funcion para los botones de mi etiquetas
const renderTags = () =>{
    const html = tags.map(tag =>{
        div.innerHTML = "";
        const tagDiv = document.createElement("DIV");
        const tagButton = document.createElement("BUTTON");

        tagDiv.classList.add("tag-item");
        tagButton.textContent = "X";
        //Creacion de un evento para eliminar etiquetas
        tagButton.addEventListener("click", (e) =>{
            removeTag(tag);
        });
        tagDiv.appendChild(document.createTextNode(tag));
        tagDiv.appendChild(tagButton);
        return tagDiv;
    });

    //forEach() - para recorrer nuestro array html
    html.forEach(element =>{
        div.appendChild(element);
    });
    div.appendChild(span);
    span.focus();
}

//Funcion para hacer la verificacion si una etiqueta esta
const existTag = (value) =>{
    return tags.includes(value);
}

//Funcion para eliminar las etiquetas que ya existan
const removeTag = (value) =>{
    tags = tags.filter(tag => tag != value);
    renderTags();
}