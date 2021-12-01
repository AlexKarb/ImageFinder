export  const upBtn = {
    
    createElement (){
        const upBtn = document.createElement("div");
        upBtn.innerHTML = `<a href="#search-form" class="up-btn"></a>`;
        document.body.append(upBtn);
    },

    deleteElenent() {
        if (document.querySelector(".up-btn")) {
            document.querySelector('.up-btn').parentNode.remove();
        }
    }
}



