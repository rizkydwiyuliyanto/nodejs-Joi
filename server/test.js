function getBio() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          Name: "John",
          Adress: "Jaya Asri",
        },
      ]);
    }, 2000);
  });
}
async function test(){
    let a = await getBio()
    a.map((x) => {
        console.log(x)
    })
}
console.log("nama");
test()
