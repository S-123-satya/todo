var url='https://crudcrud.com/api/aa46bdc359b14b569026fe3c577cca21';
function save(e) {
    // preventing from default funtionality which brower expect i.e. submiting the form will create a get/post mothod invoke by default and brower get refresh
    e.preventDefault();
    var name = document.getElementById("name");
    var desc = document.getElementById("desc");

    // Create an todos object
    let obj = {
    name: name.value,
    desc:desc.value,
    status:false
    };
    // creating post fxn using async/await  
    // we can write async code in synchronus manner using async/await  
    async function post(obj){ 
        // error handling 
        try{
            let response=await axios.post(`${url}/todolist`,obj);
            console.log(response);
            showNewUserOnScreen(response.data);
        }
        catch(error){
            console.log(error);
        }
    }
    post(obj);
    console.log(`hii ${obj}`);
    name.value='';
    desc.value='';
}
function removeUserFromScreen(user,status) {
    if(status===false){
    const parentNode=document.getElementById('listOfToDos');
    const childNodeToDeleted=document.getElementById(user);
    if(childNodeToDeleted){
        parentNode.removeChild(childNodeToDeleted);
        }
    }
    else{
        const parentNode=document.getElementById('listOfCompletedToDos');
        const childNodeToDeleted=document.getElementById(user);
        if(childNodeToDeleted){
        parentNode.removeChild(childNodeToDeleted);
        }
    }
}
function deleteUser(_id,status){
    console.log(_id);
    removeUserFromScreen(_id,status);
    // creating deletePost fxn with async/await 
    async function deletePost(_id){ 
        try{
            var promisePost = await axios.delete(`${url}/todolist/${_id}`);
            console.log(promisePost);
        }
        catch(err){
            console.log(err);
        }   
    }
    deletePost(_id);
}
function completed(_id){
    let obj;
    removeUserFromScreen(_id,false);
    async function get(){ 
        try{
            let result=await axios.get(`${url}/todolist/${_id}`);
            obj=result.data;
            obj['status']=true;
            let obj1 = {
                name: obj['name'],
                desc:obj['desc'],
                status:obj['status']
                };
            let promisePut = await axios.put(`${url}/todolist/${_id}`,obj1);            
            showNewUserOnScreen(obj);
            }
            catch(err){
                console.log(err);
            }
    }
    get();       
}
function showNewUserOnScreen(user){
    const listOfToDos=document.getElementById('listOfToDos');
    const listOfCompletedToDos=document.getElementById('listOfCompletedToDos');
    if(user['status']===false){
        if(listOfToDos.hasAttribute('class'))
            listOfToDos.removeAttribute('class');
        const childHTML = `<li id=${user._id}>${user.name}- ${user.desc} 
                                <button  class='btn btn-success' onclick=completed('${user._id}')> Completed </button>
                                <button  class='btn btn-danger' onclick=deleteUser('${user._id}',${user.status})> Delete </button> 
                            </li>`
        listOfToDos.innerHTML+=childHTML;
    }
    else{
        if(listOfCompletedToDos.hasAttribute('class'))
            listOfCompletedToDos.removeAttribute('class');
        const childHTML = `<li id=${user._id}>${user.name}- ${user.desc} 
                                <button class='btn btn-danger' onclick=deleteUser('${user._id}',${user.status})> Delete </button> 
                            </li>`
        listOfCompletedToDos.innerHTML+=childHTML;
    }
}

window.addEventListener("DOMContentLoaded",()=>{
    // fetching todos when window will be load 
    async function get(){ 
            try{
                let promisePost = await axios.get(`${url}/todolist`);
                for(var i=0;i<promisePost.data.length;i++)
                    showNewUserOnScreen(promisePost.data[i]);
            }
            catch(err){
                console.log(err);
            }
        }
    get();
});

