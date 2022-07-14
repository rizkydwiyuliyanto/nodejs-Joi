let parent = document.getElementById("myId");
let button = document.getElementById("myBtn");
let student = document.getElementById("student");
let form = document.getElementById("form");
let closeBtn = document.getElementById("closeBtn");
let closeId = document.getElementById("close")
let formParent = document.getElementById("formParent");
let openBtn = document.getElementById("openBtn");

closeBtn.onclick = () => {
    if (!closeId.className){
      closeId.className = "close"
    }else{
      closeId.classList.replace("open", "close")
    }
    closeBtn.classList.replace("showBtn", "hideBtn")
    openBtn.classList.replace("hideBtn", "showBtn")
    setTimeout(() => {
      formParent.style.display = "none"
    }, 400)
}

openBtn.onclick = () => {
  formParent.style.display = "block";
    closeId.classList.replace("close", "open");
    closeBtn.classList.replace("hideBtn", "showBtn")
    openBtn.classList.replace("showBtn", "hideBtn")
}

const postData = (url, data) => {
    return new Promise(async (resolve, reject) => {
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
            let res = await response.json();
            if (res.status != 200) {
              reject(res);
            }
            resolve(res);
    })
    
}

const fetchData = () => {
    return new Promise(async (resolve, reject) => {
        let url = "http://localhost:3005/student/"
        try {
            var myObject = await fetch(url);
            let myText = await myObject.text();
            resolve(JSON.parse(myText));
            console.log(JSON.parse(myText))
        }catch{
            reject(myObject.statusText);
        }
    })
}
const test = () => {
    let message = document.getElementById("message");
    let a = sessionStorage.getItem("message");
    message.innerHTML = a
}

const table = (data) => {
  data.forEach((x) => {
    const tStudent = document.getElementById("table");
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdName = document.createElement("td");
    let tdAge = document.createElement("td");
    let tdGender = document.createElement("td");
    let tdDepartment = document.createElement("td");
    let tdCar = document.createElement("td");
    let id = document.createTextNode(x.id);
    let name = document.createTextNode(x.name);
    let age = document.createTextNode(x.age);
    let gender = document.createTextNode(x.gender);
    let department = document.createTextNode(x.department);
    let car = document.createTextNode(x.car);
    tdId.appendChild(id);
    tdName.appendChild(name);
    tdAge.appendChild(age);
    tdGender.appendChild(gender);
    tdDepartment.appendChild(department);
    tdCar.appendChild(car);
    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdAge);
    tr.appendChild(tdGender);
    tr.appendChild(tdDepartment);
    tr.appendChild(tdCar);
    tStudent.appendChild(tr);
  });
}

fetchData()
.then((data) => {
   test()
   table(data)
})
.catch((err) => {
    console.log(err);
});

form.onsubmit = async (e) => {
  e.preventDefault();
  let name = document.getElementById("name");
  let gender = document.getElementById("gender");
  let age = document.getElementById("age");
  let department = document.getElementById("department");
  let car = document.getElementById("car");
  let id = document.getElementById("id");
  let message = document.getElementById("message");
  let data = {
    id: id.value,
    name: name.value,
    gender: gender.value,
    age: age.value,
    department: department.value,
    car: car.value,
  };
  
  postData("http://localhost:3005/post/student/", data)
    .then((data) => {sessionStorage.setItem("message", `<a style="color:green;">${data.message}</a>`)})
    .catch((err) => {message.innerHTML = `<a style="color:red;">${err.message}</a>`});
};