// all variables
let num = document.querySelector("#number");
let selfrom = document.querySelector("#selectfrom");
let selto = document.querySelector("#selectto");
let form = document.querySelector("#form");
let result = document.querySelectorAll(".result");
let year = document.querySelector("#year")
let date =document.querySelector(".date")

setInterval( ()=>{
  date.innerHTML=` Date && Time  ${new Date().toLocaleString()} `
},1000)


// place holder for result and rate 
 result[0].innerHTML="result of conversion  will be  here"
  result[1].innerHTML="daily rate for exchange will be here"
//  object to collect data

let data = {
  from: "USD",
  to: "USD",
  amount: 1,
};
// function refresh data
   function refresh(){
                    num.value="",
                    selfrom.value="",
                    selto.value=""
               }



// all functions here
let handlefrom = (e) => {
  return (data.from = e);
};
let handleto = (e) => {
  return (data.to = e);
};
let payment = (e) => {
  return (data.amount = e);
};

let getdata = {};
selfrom.addEventListener("change", (el) => {
  handlefrom(el.target.value);

 
});

selto.addEventListener("change", (el) => {
  handleto(el.target.value);

});
num.addEventListener("change", function (el) {
  payment(el.target.value);

});

form.addEventListener("submit", function (el) {
  el.preventDefault();
  // get url from api
  Swal.fire({
    icon: "question",
    title: "Convert",
    text: `Are you sure you want to convert ${data.amount} ${data.from} to ${data.to}?`,
    showCancelButton: true,
    confirmButtonText: "Ok",
    cancelButtonText: "Cancel",
  }).then((answer) => {
    if (answer.isConfirmed) {
  
      fetch(
        `https://v6.exchangerate-api.com/v6/8c14a4ca3fb795521ba9348c/latest/${data.from}`
      )
        .then((res) => res.json())
        .then((getdata) => {
        

          result[0].innerHTML= `the total amount of   ${data.amount} in ${
            data.from
          }  by ${data.to} is = ${(
            data.amount * getdata.conversion_rates[data.to]
          ).toFixed(2)}`;
            result[1].innerHTML=`the rate today is 1 ${data.from} to ${getdata.conversion_rates[data.to]} ${data.to}`
            
               refresh()
        });
    }
  });
  
});


year.innerHTML=new Date().getFullYear()

