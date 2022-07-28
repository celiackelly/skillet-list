class DishLiBtnGroup {
    constructor(el) {
        this._el = el
        el.addEventListener('click', this.onClick.bind(this)) 
    }

    onClick(e) {
        let action = e.target.dataset.action
        if (action) {
            this[action](e)
        }
    }

    async markCooked(e) {
        //Get the _id of the dish associated with this markCooked button
        let li = e.target.closest('li')
        if (!li) return
        const dishID = li.id

        try {
            const response = await fetch('markCooked', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                'dishIDfromJS': dishID
                })
            })
            const data = await response.json()
            console.log(data)
            location.reload()

        } catch(err){
            console.log(err)
        }
    }

    edit() {
        alert('editing')   
    }

    async delete(e) {
        //Get the _id of the dish associated with this delete button
        let li = e.target.closest('li')
        if (!li) return
        const dishID = li.id

        try {
            const response = await fetch('deleteDish', {
                method: 'delete',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                'dishIDfromJS': dishID
                })
            })
            const data = await response.json()
            console.log(data)
            location.reload()

        } catch(err){
            console.log(err)
        }
    }
}

const dishLiBtnGroups = document.querySelectorAll('li.dish .btn-group')

Array.from(dishLiBtnGroups).forEach((btnGroup)=>{
    new DishLiBtnGroup(btnGroup)
})


// async function markCooked(){
//     //Get the _id of the dish
//     const dishID = this.parentNode.parentNode.children[0].children[1].id
//     try{
//         //Make a fetch call to the /markCooked route on the server and send the dish _id in the body of the request  
//         const response = await fetch('markCooked', {
//             //use the PUT HTTP method
//             method: 'put',
//             //declare the content-type of the data to be sent
//             headers: {'Content-Type': 'application/json'},
//             //make a JSON object to send in the body 
//             body: JSON.stringify({
//                 'dishIDfromJS': dishID
//             })
//           })
//         //await the response from the server
//         const data = await response.json()
//         //log the server response
//         console.log(data)
//         //reload the page
//         location.reload()

//     }catch(err){
//         //catch and log any errors
//         console.log(err)
//     }
// }

