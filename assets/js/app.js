// start to do list
// select item
let inp_add = document.querySelector(".inp_add")
let add_btn = document.querySelector(".add_btn")
let inp_search = document.querySelector(".inp_search")
let search_btn = document.querySelector(".search_btn")
let list = document.querySelector(".list")

// add in list
add_btn.addEventListener("click" , add_item)
inp_add.addEventListener("keydown" , function(e){
    if(e.key == "Enter"){
        add_item()
    }
})
function add_item(){
    let inp_add_value = inp_add.value.toLowerCase()
    if(inp_add_value.trim() != ""){
        // show list
        list.classList.remove("d-none")

        // create item
        let li = document.createElement("li")
        li.className = "alert alert-light mt-2 mx-1"

        li.innerHTML = `
        <div class="row align-items-center">
            <div class="text col-12 col-sm-7 text-break mb-2 mb-sm-0">
                <span class="alert_text">${inp_add_value}</span>
            </div>
            <div class="col-12 col-sm-5 d-flex justify-content-end gap-2 flex-wrap">
                <i class="bi bi-check-square btn btn-outline-success fs-4 p-0 px-2" title="Done" onclick="done(this)"></i>
                <i class="bi bi-pencil-square btn btn-outline-primary fs-4 p-0 px-2" title="Edit" onclick="edit(this)"></i>
                <i class="bi bi-arrow-repeat btn btn-outline-warning fs-4 p-0 px-2" title="Doing" onclick="doing(this)"></i>
                <i class="bi bi-trash btn btn-outline-danger fs-4 p-0 px-2" title="Delete" onclick="remove(this)"></i>
            </div>
        </div>
        `

        // add item in list
        list.append(li)
        inp_add.value = ""
    }
    // add item in localStorage
    localStorage.setItem("list_items" , list.innerHTML)
}
list.innerHTML = localStorage.getItem("list_items")

// hide list
if(list.innerHTML.trim() == "" ){
    list.classList.add("d-none")
}

// search in list
inp_search.addEventListener("input" , search_item)
search_btn.addEventListener("click" , search_item)
function search_item(){
    let inp_search_value = inp_search.value
    let list_item = $(".list li")
    list_item.each(function(index , item){
        let item_li = item.children[0].textContent.toLowerCase()
        item.classList.add("d-none")
        if(item_li.includes(inp_search_value)){
            item.classList.remove("d-none")
        }
    })
}


// remove item
function remove(close_btn){
    let my_alret = close_btn.closest(".alert")

    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then(function(willDelete){
        if (willDelete) {
            swal("Successful Remove!", "The item has removed", "success");
            my_alret.remove()
            localStorage.setItem("list_items" , list.innerHTML)
        } else {
            swal("Your item is safe!");
        }
    })

    // hide list
    if(list.innerHTML.trim() == "" ){
        list.classList.add("d-none")
    }
}

// doing item
function doing(doing_btn){
    let my_alret = doing_btn.closest(".alert")
    my_alret.classList.remove("alert-light" , "alert-success")
    my_alret.classList.add("alert-warning")
    let my_span = my_alret.querySelector("span")
    my_span.classList.remove("text-decoration-line-through")

    localStorage.setItem("list_items" , list.innerHTML)
}

// done item
function done(done_btn){
    let my_alret = done_btn.closest(".alert")
    my_alret.classList.remove("alert-light" , "alert-warning")
    my_alret.classList.add("alert-success")
    let my_span = my_alret.querySelector("span")
    my_span.classList.add("text-decoration-line-through")

    localStorage.setItem("list_items" , list.innerHTML)
}

// edit item
function edit(edit_btn){
    let my_alret_text   = edit_btn.closest(".row")
    let my_alret_value  = my_alret_text.querySelector(".alert_text")

    swal("Write something here:", {
        content: "input",
    })
    .then((value) => {
        my_alret_value.textContent = value;
        localStorage.setItem("list_items" , list.innerHTML)
    });
}