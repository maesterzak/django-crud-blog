if (document.getElementById("exampleInputBody2") && document.getElementById("exampleInputBody2")){
    CKEDITOR.replace('exampleInputBody2', {
        uiColor: '#9AB8F3',
        toolbarCanCollapse: true,
        toolbarStartupExpanded: false,
        removePlugins: 'exportpdf',
    })
    CKEDITOR.replace('exampleInputBody1', {
        uiColor: '#9AB8F3',
        toolbarCanCollapse: true,
        toolbarStartupExpanded: false,
        removePlugins: 'exportpdf',
    })
    
}


function modalClick(event){
    
    var myModal = document.getElementById('editModal')
    myModal.addEventListener("shown.bs.modal", function (){
        var collection = document.getElementById(event).children
        var body = collection[2].textContent;
        // var body = body.replace(/<[^>]*>/g, '');
        var id = collection[0].textContent
        var title = collection[1].textContent
        
        var editor = CKEDITOR.instances.exampleInputBody2;
        var value = document.getElementById('exampleInputBody2')
        
        
        published = collection[3].textContent.toLowerCase()
        document.getElementById('exampleInputTitle2').value = title
        document.getElementById('exampleInputBody2').value = body
        document.getElementById('exampleInputId2').value = id
        editor.setData(value)
        if (published == "true"){
            document.getElementById('exampleCheck2').checked = true
        }
        else if (published == "false"){
            document.getElementById('exampleCheck2').checked = false
        }
    })
};


function DeleteModalClick(event){
    
    var myModal = document.getElementById('deleteModal')
    myModal.addEventListener("shown.bs.modal", function (){
        var collection = document.getElementById(event).children
        
        var id = collection[0].textContent
        var title = collection[1].textContent
        
        document.getElementById('deletePostTitle').innerHTML = title
        document.getElementById('deletePostId').value =id
        
        
    })
};

function post_delete() {
    x = document.getElementById('deletePostId').value
    
    const post_process = "post_delete"
    const url = '/dashboard/'
    let formDa = new FormData()
    formDa.append('id', x)
    formDa.append('process', post_process)
    fetch(url, {
        method:'POST',
        headers:{
                
                'X-CSRFToken':csrftoken,},
        body:formDa
    })
    .then((response) =>{
        response.json()
        if (response.status == 200){
            location.reload()
        }
    })
}



function form_d(e, formID) {
    e.preventDefault();
    var formData = new FormData(e.target);
    //each form id is represented by formID the value changes depending on the form submitted
    const form_values = Object.fromEntries(formData);
    id = form_values.id
    title = form_values.title
    if (formID == "form1"){
        var body = CKEDITOR.instances.exampleInputBody1.getData()
    }
    else if (formID == "form2"){
        var body = CKEDITOR.instances.exampleInputBody2.getData()
    }
    
    published = form_values.published
    image = form_values.image
    var image = {
        'lastModified' : image.lastModified,
        'lastModifiedDate' : image.lastModifiedDate,
        'name' : image.name,
        'size' : image.size,
        'type' : image.type

    }
    console.log('image', image)
    if (published == "on"){
        published = true
    }
    else{
        published = false
    }
    const post_process = "form_submit"
    const url = '/dashboard/'
    
    image = form_values.image
    let formDa = new FormData()
    formDa.append('image', image)
    formDa.append('title', title)
    formDa.append('body', body)
    formDa.append('published', published)
    formDa.append('id', id)
    formDa.append('formId', formID)
    formDa.append('process', post_process)

    fetch(url, {
        method:'POST',
        headers:{
                
                'X-CSRFToken':csrftoken,},
        body:formDa
    })
    .then((response) =>{
        response.json()
        if (response.status == 200){
            location.reload()
        }
    })
     
  }