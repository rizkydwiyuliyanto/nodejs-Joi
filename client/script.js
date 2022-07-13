let parent = document.getElementById("myId");
let button = document.getElementById("myBtn");
let student = document.getElementById("student");
let form = document.getElementById("form");

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

const table = () => {
  let student = document.getElementById("student");
  const table = document.createElement("table");
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  table.appendChild(tr)
}

fetchData()
.then((data) => {
    test()
    student.innerHTML = `<table>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Car</th>
      </tr>
      ${data.map((x) => {
        return (`
        <tr>
          <td>${x.id}</td>
          <td>${x.name}</td>
          <td>${x.age}</td>
          <td>${x.gender}</td>
          <td>${x.department}</td>
          <td>${x.car}</td>
        </tr>
        `)
      })}
    </table>`;
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