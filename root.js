var url='https://crudcrud.com/api/2718050612384a7c96026acd06743daa';
function save() {
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;

    // Create an todos object
    var obj = {
    name: name,
    desc:desc,
    status:false
    };
    console.log(obj);
    axios.post(`${url}/todolist`,obj)
    .then(resolve=>console.log(resolve))
    .catch(err=>{
        console.log(err);
    })
}
function removeUserFromScreen(user) {
    const parentNode=document.getElementById('listOfToDos');
    const childNodeToDeleted=document.getElementById(user);
    if(childNodeToDeleted){
        parentNode.removeChild(childNodeToDeleted);
    }
}
function deleteUser(_id,name){
    console.log(_id);
    localStorage.removeItem(name);
    removeUserFromScreen(name);
    axios.delete(`${url}/todolist/${_id}`)
    .then(resolve=>console.log(resolve))
    .catch(err=>{
        console.log(err);
    })
    
}
function editUserDetails(_id,name,email){
    console.log(_id,email,name);
    document.getElementById('name').value=name;
    document.getElementById('desc').value=email;
    deleteUser(_id,email);
}
function showNewUserOnScreen(user){
    const parentNode=document.getElementById('listOfToDos');
    console.log(parentNode);
    const childHTML = `<li id=${user.name}>${user.name}- ${user.desc} 
                            <button onclick=editUserDetails('${user._id}','${user.name}','${user.desc}')> Completed </button>
                            <button onclick=deleteUser('${user._id}','${user.name}')> Deleted </button> 
                        </li>`
    parentNode.innerHTML+=childHTML;
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get(`${url}/todolist`)
      .then((res)=>{
        for(var i=0;i<res.data.length;i++){
            showNewUserOnScreen(res.data[i]);
        }
      })
    .catch(err=>console.log(err))
})

