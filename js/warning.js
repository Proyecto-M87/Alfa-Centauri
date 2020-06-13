class Warning{
    static make(id, text) {
        let instance = new Warning(id);
        instance.warning.innerHTML = instance.getTemplate(text);
    }

    constructor(id) {
        this.warning = document.getElementById(id);
    }

    getTemplate(text){
        return `
        <div class="warning">
            <div class="col">
                <img src="../internal/img/alert.svg" alt="alert">
            </div>
            <div class="col-7 text-w">
                ${text}
            </div>
        </div>
        `;
    }
}