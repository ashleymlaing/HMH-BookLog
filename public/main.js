const deleteItems = document.getElementsByClassName("fa-trash");
const editItems = document.getElementsByClassName("fa-pencil-alt");

Array.from(deleteItems).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log("clicked");
        const title = this.parentNode.parentNode.childNodes[1].innerText
        console.log(title);
        fetch('/deleteBook', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'title': title
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

Array.from(editItems).forEach((el)=>{
  el.addEventListener('click', function(){
    const title = this.parentNode.parentNode.childNodes[1].innerText
    const authors = this.parentNode.parentNode.childNodes[3].innerText
    const isbn = this.parentNode.parentNode.childNodes[5].innerText
    const categories = this.parentNode.parentNode.childNodes[7].innerText
    const oldInfo = [title, authors, isbn, categories]
    oldInfo.forEach((element)=>{
      const choice = prompt(`Do you want to change ${element}?(yes or no)`)
      if(choice == "yes") {
        const newValue = prompt(`Change ${element} to:`)
        element = newValue
      }
    })
    fetch('/deleteBook', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'title': title,
        
      })
    }).then(function (response) {
      window.location.reload()
    })

  })
});
