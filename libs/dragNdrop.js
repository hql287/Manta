// Prevent window to open dropped file
document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());


// Linux draggable window broken, so monkey patch 
if(process.platform == 'linux'){
    let elements = document.querySelectorAll("body,#root,.appWrapper")
    elements.forEach(element => {
        element.classList.add('non-draggable')
    });
}