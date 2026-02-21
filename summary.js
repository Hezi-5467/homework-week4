const titleDisplay = document.querySelector(".titleCount");
const cardDisplay = document.querySelector(".cardCount");
const moneyDisplay = document.querySelector(".moneyCount");
const scoreDisplay= document.querySelector(".scoreCount");


let titleNum = 0;
let cardNum = 0;
let moneyNum = 0;
let scoreNum= 0;

const gameData=JSON.parse(localStorage.getItem("gameData"));

//更新玩家信息
 const usernameDisplay=document.querySelector('.playerName');
            usernameDisplay.innerText=gameData.userInformation.username;
            const signatureDisplay=document.querySelector('.signature');
            signatureDisplay.innerText=gameData.userInformation.signature;
            const avatarDisplay=document.querySelector('.avatar img');
            if(gameData.userInformation.gender==='男'){
                console.log('男');
                avatarDisplay.src='./picture/avatar-male.jpg';
                
            }
            else{
                avatarDisplay.src='./picture/avatar-female.jpg';
            }
//荣誉称号
for(let key in gameData.honorTitle){
    if(gameData.honorTitle[key]==true){
        titleNum++;
        scoreNum+=6;
        console.log(key+"获得荣誉称号");
        
    }
}
if(gameData.honorTitle["isReachOneHundredThousand"]==true){
    scoreNum+=4;
    console.log("获得100000元荣誉称号");
    
}
console.log(gameData.honorTitle);
console.log(titleNum);

//卡片
for(let i=0;i<gameData.card.length;i++){
    if(gameData.card[i]>0){
        cardNum++;
        scoreNum+=4;
        console.log("获得"+i+"卡片加分");
        
    }
}
if(gameData.card[6]>0){
    scoreNum+=2;
    console.log("卡片7加分");
    
}
console.log(gameData.card);
console.log(cardNum);

//金钱评分
if(gameData.money>=10000&&gameData.money<30000){
    scoreNum+=10;
    console.log("获得10000金钱加分");
    
}
else if(gameData.money>=30000&&gameData.money<50000){
    scoreNum+=15;
    console.log("获得30000金钱加分");
    
}
else if(gameData.money>=50000&&gameData.money<70000){
    scoreNum+=25;
    console.log("获得50000金钱加分");
}
else if(gameData.money>=70000){
    scoreNum+=30;
    console.log("获得70000金钱加分");
    
}
else{
    
}

//评分


//更新显示
titleDisplay.innerHTML=`<strong>${titleNum}</strong>`;
cardDisplay.innerHTML=`<strong>${cardNum}</strong>`;
moneyDisplay.innerHTML=`<strong>${gameData.money}</strong>`;
scoreDisplay.innerHTML=`<strong>${scoreNum}</strong>`;
