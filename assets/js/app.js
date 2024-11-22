// start to do list
// select list
let inp_add = document.querySelector(".inp_add")
let add_btn = document.querySelector(".add_btn")
let inp_search = document.querySelector(".inp_search")
let search_btn = document.querySelector(".search_btn")
let list = document.querySelector(".list")

// add in list
add_btn.addEventListener("click" , function(){
    let inp_add_value = inp_add.value.toLowerCase()
    if(inp_add_value.trim() != ""){
        let li = document.createElement("li")
        li.className = "alert alert-light d-flex justify-content-between mt-3"
        li.innerHTML =`
        <span>${inp_add_value}</span>
        <div>
            <button class="btn btn-success btn-sm" onclick="done(this)">done</button>
            <button class="btn btn-warning btn-sm" onclick="doing(this)">doing</button>
            <button class="btn-close" onclick="remove(this)"></button>
        </div>
        `
        list.append(li)
        inp_add.value = ""
    }
    localStorage.setItem("list_items" , list.innerHTML)
})
list.innerHTML = localStorage.getItem("list_items")

// search in list
search_btn.addEventListener("click" , function(){
    let inp_search_value = inp_search.value
    let list_item = $(".list li")
    list_item.each(function(index , item){
        let item_li = item.children[0].textContent.toLowerCase()
        item.classList.add("d-none")
        if(item_li.includes(inp_search_value)){
            item.classList.remove("d-none")
        }
    })
    inp_search.value=""
})


// remove item
function remove(close_btn){
    let my_alret = close_btn.closest(".alert")
    if(confirm("remove item?")){
        my_alret.remove()

        localStorage.setItem("list_items" , list.innerHTML)
    }
}
// doing item
function doing(doing_btn){
    let my_alret = doing_btn.closest(".alert")
    my_alret.classList.remove("alert-light" , "alert-success" , "box-shadow-green")
    my_alret.classList.add("alert-warning" , "box-shadow-yellow")
    let my_span = my_alret.querySelector("span")
    my_span.classList.remove("text-decoration-line-through")

    localStorage.setItem("list_items" , list.innerHTML)
}
// done item
function done(done_btn){
    let my_alret = done_btn.closest(".alert")
    my_alret.classList.remove("alert-light" , "alert-warning" ,"box-shadow-yellow")
    my_alret.classList.add("alert-success" , "box-shadow-green")
    let my_span = my_alret.querySelector("span")
    my_span.classList.add("text-decoration-line-through")

    localStorage.setItem("list_items" , list.innerHTML)
}