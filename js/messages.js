function getTemplate(text, img){
    return `
        <div class="message">
            <div class="col">
                <img src="../internal/img/${img}.svg" alt="${img}">
            </div>
            <div class="col">
                ${text}
            </div>
        </div>
        `;
}

function makeWarning(id, text) {
    let doc = document.getElementById(id);
    doc.innerHTML = getTemplate(text, 'warning');
}

function makeInfo(id, text){
    let doc = document.getElementById(id);
    doc.innerHTML = getTemplate(text, 'check');
}