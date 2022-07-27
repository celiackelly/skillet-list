//Select all element Nodes with the given class and assign to JS variables
const deleteBtn = document.querySelectorAll('.fa-trash')
const dish = document.querySelectorAll('.dish span')
const dishCooked = document.querySelectorAll('.dish span.cooked')

//Create an array from the NodeList 'deleteBtn'
//Attach an event listener to each item in the array; on click, call deleteItem function 
Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteDish)
})

//Create an array from the NodeList 'dish'
//Attach an event listener to each item; on click, call markCooked function
Array.from(dish).forEach((element)=>{
    element.addEventListener('click', markCooked)
})

//Create an array from the NodeList 'dishCooked'
//Attach an event listener to each completed item; on click, call markNotCooked function
Array.from(dishCooked).forEach((element)=>{
    element.addEventListener('click', markNotCooked)
})

async function deleteDish(){
    //Get the _id of the to-do item associated with this delete button
    const dishID = this.parentNode.children[0].id
    try{
        //Make a fetch call to the /deleteItem route on the server and send the todo item text in the body of the request  
        const response = await fetch('deleteDish', {
            //use the delete HTTP method
            method: 'delete',
            //declare the content-type of the data to be sent
            headers: {'Content-Type': 'application/json'},
            //make a JSON object to send in the body 
            body: JSON.stringify({
              'dishIDfromJS': dishID
            })
          })
        //await the response from the server
        const data = await response.json()
        //log the server response
        console.log(data)
        //reload the page
        location.reload()

    //catch and log any errors
    }catch(err){
        console.log(err)
    }
}

//Not fixed yet
async function markCooked(){
    //Get the _id of the to-do item
    const dishID = this.parentNode.children[0].id
    console.log(dishID)
    try{
        //Make a fetch call to the /markComplete route on the server and send the todo item text in the body of the request  
        const response = await fetch('markCooked', {
            //use the PUT HTTP method
            method: 'put',
            //declare the content-type of the data to be sent
            headers: {'Content-Type': 'application/json'},
            //make a JSON object to send in the body 
            body: JSON.stringify({
                'dishIDfromJS': dishID
            })
          })
        //await the response from the server
        const data = await response.json()
        //log the server response
        console.log(data)
        //reload the page
        location.reload()

    }catch(err){
        //catch and log any errors
        console.log(err)
    }
}

async function markNotCooked(){
    //Get the _id of the to-do item
    const dishID = this.parentNode.children[0].id
    try{
        //Make a fetch call to the /markComplete route on the server and send the todo item text in the body of the request  
        const response = await fetch('markNotCooked', {
            //use the PUT HTTP method
            method: 'put',
            //declare the content-type of the data to be sent
            headers: {'Content-Type': 'application/json'},
            //make a JSON object to send in the body 
            body: JSON.stringify({
                'dishIDfromJS': dishID
            })
          })
        //await the response from the server
        const data = await response.json()
        //log the server response
        console.log(data)
        //reload the page
        location.reload()

    }catch(err){
        //catch and log any errors
        console.log(err)
    }
}