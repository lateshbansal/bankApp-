'use strict';



const account1 = {
  owner: 'Latesh Bansal',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

 
};

const account2 = {
  owner: 'Harsh Sharma',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  
};

const account3 = {
  owner: 'Virat kohli',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

 
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


// const login= function(){

// accounts.forEach(function(account)
// {
//   if(inputLoginUsername.value==account.owner && inputLoginPin.value==account.pin){
//     containerApp.style.opacity=1;
//   }
// })

// }
// let Curraccount;
// btnLogin.addEventListener('click', function(accounts){
//    accounts.forEach(function(acc)   {
//      if(inputLoginUsername.value==acc.owner)
//      {
//        Curraccount=acc;
//        break;

//      }
//    }
//    )
// });

console.log("im great");




const displayMovements=function(mov)
{
  containerMovements.innerHTML="";
  mov.forEach(function(movv,i)
  {
    

    const type= movv>0?"deposit":"withdrawal";
    const html= `<div class="movements__row">
  <div class="movements__type movements__type--${type}">
    ${i+1} ${type}
  </div>
 
  <div class="movements__value">${movv}€</div>
</div>`

containerMovements.insertAdjacentHTML('afterbegin',html);
  })
 
  
}
// displayMovements(account2.movements);
const displayUI= function(currentAccount){
  displayMovements(currentAccount.movements);
DisplaySummery(currentAccount.movements)
calcDisplayBalance(currentAccount.movements)
}

const DisplaySummery= function(acc) {

const displayIn= acc.filter((money)=> {
 return money>0;
}).reduce((acc, money)=>acc+money, 0);


const displayOut= acc.filter((money)=> {
  return money<0;
 }).reduce((acc, money)=>acc+money, 0);
 
 
 const interest= acc.filter(money=> money>0).map(money=> money*1.2/100).reduce((acc, money)=>acc+money, 0);

labelSumIn.innerHTML=new Intl.NumberFormat('en-US').format( displayIn);
labelSumOut.innerHTML=new Intl.NumberFormat('en-US').format( displayOut);
labelSumInterest.innerHTML=parseFloat(interest).toFixed(2);

};

// DisplaySummery(account2.movements)



const calcDisplayBalance=function(movements){
  const balance=movements.reduce((acc,mov)=> acc+mov,0);
  labelBalance.innerHTML=`${new Intl.NumberFormat('en-US').format( balance)} EUR`;
  
  
};

// calcDisplayBalance(account2.movements);



const createUsernames=function(acc){
  acc.forEach(function(accs){
    accs.username=accs.owner.toLowerCase().split(' ').map(name=>name[0])
    .join('')
  });
};
createUsernames(accounts);



// button login__input





let currentAccount;

//Fake Login
// currentAccount=account1;
// displayUI(currentAccount);
// containerApp.style.opacity=100;

const now= new Date();

const year= now.getFullYear();
const month= now.getMonth()+1;
const day= now.getDate();

const hour= now.getHours();
const min= now.getMinutes();

labelDate.innerHTML=`${day}/${month}/${year} ${hour}:${min}`;

let flag=0;
btnLogin.addEventListener('click',function(e){
  e.preventDefault();
  console.log('im')
  console.log('w')

const username=inputLoginUsername.value;
const pass= inputLoginPin.value;
console.log(username + pass)


currentAccount= accounts.find(acc=> acc.username=== inputLoginUsername.value);

console.log(currentAccount)


if(currentAccount && currentAccount.pin=== Number(inputLoginPin.value))
{
  console.log("Login Biro");

  containerApp.style.opacity=100;
displayMovements(currentAccount.movements);
DisplaySummery(currentAccount.movements)
calcDisplayBalance(currentAccount.movements)
}
else{
  alert("Please enter a valid Credentials")
}


})


btnTransfer.addEventListener('click',function(e){
e.preventDefault();


const amount=Number( inputTransferAmount.value);


const reciverAcc= accounts.find(acc=> acc.username=== inputTransferTo.value);


// console.log(reciverAcc + amount);

if(  amount>0 && reciverAcc && reciverAcc.username !== currentAccount.username ){

  console.log("transfer done");
  currentAccount.movements.push(-amount);
  reciverAcc.movements.push(amount);
  displayMovements(currentAccount.movements);
DisplaySummery(currentAccount.movements)
calcDisplayBalance(currentAccount.movements)

}
else
alert("some credentials may wrong or try again later!!")

}
)


// && reciverAcc.username  && currentAccount.balance>=amount &&reciverAcc?.username!==currentAccount.username


btnLoan.addEventListener('click',function(e)
{
  e.preventDefault();

  const loanAmt= Number(inputLoanAmount.value);
  console.log(loanAmt);

   currentAccount.movements.push(loanAmt);
   displayMovements(currentAccount.movements);
   DisplaySummery(currentAccount.movements)
   calcDisplayBalance(currentAccount.movements)


})

btnClose.addEventListener("click", function(e){
  e.preventDefault();
  const closeUsername=inputCloseUsername.value;
  const closePass= Number(inputClosePin.value);

  if(closeUsername===currentAccount.username && closePass===currentAccount.pin )
  {
    const index= accounts.findIndex(acc=> acc.username===currentAccount.username);

    accounts.splice(index,1);

    
  containerApp.style.opacity=0;

  alert(`${currentAccount.username} is deleted`);
  }
  else
  {
   alert("enter valid credentials");
  }



  
})



