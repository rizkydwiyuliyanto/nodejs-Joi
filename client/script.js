let parent = document.getElementById("myId");
let button = document.getElementById("myBtn");
let student = document.getElementById("student");
let form = document.getElementById("form");


const postData = async(url, data) => {
    const response = await fetch(url, {
        method: "POST",
        mode:"cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        redirect:"follow",
        referrerPolicy:"no-referrer",
        body: JSON.stringify(data),
    })
    return response.json()
    
}

const fetchData = () => {
    return new Promise(async (resolve, reject) => {
        let url = "http://localhost:3005/student/"
        let myObject = await fetch(url)
        if (myObject.status == 200) {
            let myText = await myObject.text();
            resolve(JSON.parse(myText));
        }
        reject("error");
    })
}


let body = document.body;
body.onload = async() => {
    try {
       let data = await fetchData();
       student.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }catch (err){
       console.log(err);
    }
}

form.onsubmit = async (e) => {
  e.preventDefault();
    let name = document.getElementById("name");
    let gender = document.getElementById("gender");
    let age = document.getElementById("age");
    let department = document.getElementById("department");
    let car = document.getElementById("car");
    let id = document.getElementById("id");
    let message = document.getElementById("message")
    let data = {
        id: id.value,
        name: name.value,
        gender: gender.value,
        age: age.value,
        department: department.value,
        car: car.value
    }
    postData("http://localhost:3005/post/student/", data).then((data) => {
      if (!data.ok && data.status != 200) {
        message.innerHTML = `<a style="color:red;">${data.message}</a>`
      }else{
        message.innerHTML = `<a style="color:green;">${data.message}</a>`
      }
    });

}
