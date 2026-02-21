//需要本地储存的数据
let originData ={
    money:0,
    isFirstEnter:true,
    point:0,
    userInformation:{
        username:'玩家姓名',
        gender:'男',
        signature:'暂未填写个性签名'
    },
    card:[0,0,0,0,0,0,0],
    cardObtain:0,
    firecracker:0,
    useFirecracker:0,
    strategyObtain:false,
    summaryObtain:false,
    honorTitle:{
        isReachTenThousand:false,
        isReachOneHundredThousand:false,
        obtainAllcards:false,
        isReachHundredPoint:false,
        isReachThousandPoint:false,
        useFirecrackertwenty:false,
    },
}
let gameData = JSON.parse(localStorage.getItem('gameData')) || originData;


//变量
 //祝福语数组
 const blessText = ['财运+++','立马有钱！','赚钱小马达！','这波，马年血赚','马年，钱包鼓鼓','财运滚滚！',
    '搞钱搞钱搞钱','暴富就在今天！','财运爆棚啦！','一路发发发！'];
 //卡片图片数组
 const normalCardImg = ['./picture/card1.jpg','./picture/card2.jpg','./picture/card3.jpg',
    './picture/card4.jpg','./picture/card5.jpg','./picture/card6.jpg','./picture/card7.jpg'];




//获取元素
  //金钱显示位置
const moneyDisplay1=document.querySelector('.textArea span');
const moneyDisplay2=document.querySelector('.moneyDisplay span')
const moneyDisplay3=document.querySelector('.purchaseMoneyNum span');
  //遮罩
const popMask = document.querySelector('.popMask');
  //购买秘籍按钮
  const purchaseStrategy=document.querySelector('.Purchase.gameStrategy');



//按钮
//进入按钮
const messageWall = document.querySelector('.messageWall');
const enterBtn1 = document.querySelector('.enter.btn1');
enterBtn1.addEventListener('click',function(){
    messageWall.style.opacity = '1';
    messageWall.style.pointerEvents = 'auto';
    enterBtn1.style.display='none';
})
const cardWall = document.querySelector('.cardWall');
const enterBtn2 = document.querySelector('.enter.btn2');
enterBtn2.addEventListener('click',function(){
    cardWall.style.opacity = '1';
    cardWall.style.pointerEvents = 'auto';
    enterBtn2.style.display='none';
})
const generateSummary=document.querySelector('.last-button.generateReport');
generateSummary.addEventListener('click',function(){
    window.location.href='summary.html';
})
const resetGame=document.querySelector('.last-button.resetGame');
resetGame.addEventListener('click',function(){
    if (confirm('确定要重置游戏吗？')){
     localStorage.setItem('gameData',JSON.stringify(originData));
    window.location.href='index.html';
    }
   
})

//关闭按钮
const closeBtn1 = document.querySelector('.close.btn1');
closeBtn1.addEventListener('click',function(){
    messageWall.style.opacity = '0';
    messageWall.style.pointerEvents = 'none';
    enterBtn1.style.display='block';
})
const closeBtn2 = document.querySelector('.close.btn2');
closeBtn2.addEventListener('click',function(){
    cardWall.style.opacity = '0';
    cardWall.style.pointerEvents = 'none';
    enterBtn2.style.display='block';
})



//函数
  //金钱显示区域更新+储存本地
function updateMoneyDisplay(){
    moneyDisplay1.innerText=gameData.money.toLocaleString();
    moneyDisplay2.innerText=gameData.money.toLocaleString();
    moneyDisplay3.innerText=gameData.money.toLocaleString();
    //更新本地储存
    localStorage.setItem('gameData',JSON.stringify(gameData));
}

 //更新卡片数量和背包显示+烟花数量显示
  function updateCardNumDisplay(){
    const cardNum=document.querySelectorAll('.cardNum');
    for(let i=0;i<gameData.card.length;i++){
        cardNum[i].innerText=gameData.card[i]
  }
    //烟花数量显示
    const firecrackerNum=document.querySelector('.firecrackerNum');
    firecrackerNum.innerText=gameData.firecracker;
    //卡片图片更新
    const cardDisplay=document.querySelectorAll('.card img');
    for(let i=0;i<gameData.card.length;i++){
        if(gameData.card[i]!==0){
            cardDisplay[i].src=normalCardImg[i];
        }
    }
    //卡片背包更新
    const itemContainer=document.querySelector('.itemContainer');
        itemContainer.innerHTML='';
    gameData.card.forEach((element,index) => {
        
        if(element!==0){
            console.log('我插入了第'+index+'张卡片');
            const item=document.createElement('div');
            item.className='item';
            const itemImg=document.createElement('img');
            itemImg.className='itemImg';
            itemImg.src=normalCardImg[index];
            item.appendChild(itemImg);
            itemContainer.appendChild(item);
            item.addEventListener('click',function(){
                const cardImg=document.createElement('div');
                cardImg.className='bagCardImg';
                cardImg.style.backgroundImage=`url(${normalCardImg[index]})`;
                document.body.appendChild(cardImg);
                cardImg.addEventListener('click',function(){
                    document.body.removeChild(cardImg);
                })
            })
        }
    });
} 

//更新策略按钮状态+背包显示
function updatePurchaseStrategyDisplay(){
    if(gameData.strategyObtain===true){
        purchaseStrategy.style.backgroundColor='#e75757';
        purchaseStrategy.innerText='已购买';
        purchaseStrategy.removeEventListener('click',purchaseStrategyClick);
        //背包
        const itemContainer=document.querySelector('.itemContainer');
        const strategyItem=document.createElement('div');
        strategyItem.className='item';
        const strategyImg=document.createElement('img');
        strategyImg.className='itemImg';
        strategyImg.src='./picture/strategy_sign.png';
        strategyItem.appendChild(strategyImg);
        itemContainer.prepend(strategyItem);
        console.log('已购买策略');
        strategyItem.addEventListener('click',function(){
            const strategyContainer=document.querySelector('.strategyContainer');
            strategyContainer.style.display='block';
        })
        const confirmButtonStrategy=document.querySelector('.confirm-button.strategyConfirm');
        confirmButtonStrategy.addEventListener('click',function(){
            const strategyContainer=document.querySelector('.strategyContainer');
            strategyContainer.style.display='none';
        })

    }
}

 //立即执行：进入界面先更新一下金钱显示器+卡片显示+烟花数量显示+荣誉称号获得状态+策略按钮状态
 (function(){
    //金钱
    moneyDisplay1.innerText=gameData.money.toLocaleString();
    moneyDisplay2.innerText=gameData.money.toLocaleString();
    moneyDisplay3.innerText=gameData.money.toLocaleString();
    //卡片
    const cardDisplay=document.querySelectorAll('.card img');
    for(let i=0;i<gameData.card.length;i++){
        if(gameData.card[i]!==0){
            cardDisplay[i].src=normalCardImg[i];
        }
    }
    updateCardNumDisplay();
    checkHonorTitle();
     //策略按钮状态
     updatePurchaseStrategyDisplay();
}());

 //游戏介绍弹窗弹出
 function playIntroductionPop(){
    //弹出
    const playIntroduction = document.querySelector('.playIntroduction');
    playIntroduction.style.display='block';
    //向玩家问好
    const greeting = document.querySelector('.greeting');  
    greeting.innerText=`${gameData.userInformation.username}，你好呀，新年快乐！🐎`;
    //确定按钮
    const confirmButton = document.querySelector('.confirm-button');
    confirmButton.addEventListener('click',function(){
    playIntroduction.style.display='none';
    const popMask = document.querySelector('.popMask');
    popMask.style.display='none';
    //改变第一次进入状态
    gameData.isFirstEnter=false;
    //更新本地储存
    localStorage.setItem('gameData',JSON.stringify(gameData));
    })
};

 //立即执行函数：初始进入弹窗
 (function firstEnterPop(){
    if(gameData.isFirstEnter===true){
        //弹窗弹出
        const popMask = document.querySelector('.popMask');
        popMask.style.display='block';
        const collectInformation = document.querySelector('.collectInformation');
        collectInformation.style.display='block';
        //表单提交
        const form=document.querySelector('form');
        form.addEventListener('submit',function(e){
            e.preventDefault();
            const username=document.querySelector('input[name="username"]').value;
            const gender=document.querySelector('input[name="gender"]:checked').value;
            const signature=document.querySelector('input[name="signature"]').value;
            gameData.userInformation.username=username;
            gameData.userInformation.gender=gender;
            gameData.userInformation.signature=signature;
            collectInformation.style.display='none';
            document.body.style.overflow='auto';
            
            //更新信息界面显示
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
            //游戏介绍弹窗弹出
            playIntroductionPop();
            
        })
        
    }
    else{
        const usernameDisplay=document.querySelector('.playerName');
            usernameDisplay.innerText=gameData.userInformation.username;
            const signatureDisplay=document.querySelector('.signature');
            signatureDisplay.innerText=gameData.userInformation.signature;
            signatureDisplay.innerText=gameData.userInformation.signature;
            const avatarDisplay=document.querySelector('.avatar img');
            if(gameData.userInformation.gender==='男'){
                console.log('男');
                avatarDisplay.src='./picture/avatar-male.jpg';
                
            }
            else{
                avatarDisplay.src='./picture/avatar-female.jpg';
            }
    }
})()

//用鞭炮赶走年兽
 function uesFirecracker(){
    //检查是否有鞭炮
    if(gameData.firecracker<=0){
        //没有鞭炮
        alert('你没有鞭炮，不能用它赶走年兽！');
        return;
    }
    //有鞭炮
    gameData.useFirecracker++;
    console.log('已用'+gameData.useFirecracker+'个鞭炮');
    gameData.firecracker--;
    gameData.money+=1000;
    //更新金钱显示
    updateMoneyDisplay();
    //创建节点（弹窗+按钮）
    const usefireContainer = document.createElement('div');
    usefireContainer.className='usefireContainer';
    const usefireButton=document.createElement('div');
    usefireButton.innerText='确定';
    usefireButton.className='confirm-button usefire';
    //添加到body和usefireContainer
    document.body.appendChild(usefireContainer);
    usefireContainer.appendChild(usefireButton);
    //显示弹窗和遮罩
    usefireContainer.style.display='block';
    popMask.style.display='block';
    //消除弹窗函数（定义）
    function closeUseFirePop(){
        //隐藏弹窗
        usefireContainer.style.display='none';
        //从body移除
        usefireContainer.remove();
        //隐藏遮罩
        popMask.style.display='none';
    }
    //按钮点击事件
    usefireButton.addEventListener('click',function(){
        closeUseFirePop();
    })
    
    
 }

 //年兽出现弹窗
 function monsterPop(e){
    //金钱-1000
    gameData.money-=1000;
    //创建新的节点(弹窗+按钮)
    const monsterContainer = document.createElement('div');
    monsterContainer.className='monsterContainer';
    //按钮
    const monsterConfirmButton=document.createElement('div');
    monsterConfirmButton.innerText='确定';
    monsterConfirmButton.className='confirm-button monster';
    const monsterFireButton=document.createElement('div');
    monsterFireButton.innerText='用鞭炮赶走它';
    monsterFireButton.className='confirm-button monsterFire';
    //添加到body和monsterContainer
    document.body.appendChild(monsterContainer);
    monsterContainer.appendChild(monsterConfirmButton);
    monsterContainer.appendChild(monsterFireButton);
    //显示弹窗和遮罩
    monsterContainer.style.display='block';
    popMask.style.display='block';
    //消除键盘事件
    document.removeEventListener('keydown',keydownEvent);
    //消除弹窗函数（定义）
    function closeMonsterPop(){
        //隐藏弹窗
        monsterContainer.style.display='none';
        //从body移除
        monsterContainer.remove();
        //隐藏遮罩
        popMask.style.display='none';
        document.addEventListener('keydown',keydownEvent);
    }
    //按钮点击事件
    //  const timeoutClosePop=setTimeout(closeMonsterPop,10000);
     monsterConfirmButton.addEventListener('click',function(){
        closeMonsterPop();
        // clearTimeout(timeoutClosePop);
    })
     monsterFireButton.addEventListener('click',function(){
        closeMonsterPop();
        uesFirecracker();
    });

 }


 //抽中普通卡片
 function normalCardPop(){
    //随机抽到的卡片
     const randomCard=Math.floor(Math.random()*6);
    //创建新的节点(弹窗+按钮+普通卡片图片+文字)
        //弹窗+按钮
        const normalCardContainer = document.createElement('div');
        normalCardContainer.className='normalCardContainer';
        const normalCardConfirmButton=document.createElement('div');
        normalCardConfirmButton.innerText='确定';
        normalCardConfirmButton.className='confirm-button normalCard';
        //普通卡片图片
        const normalCardImage=document.createElement('img');
        normalCardImage.src=normalCardImg[randomCard];
        normalCardImage.className='normalCardImage';
        //文字
        const normalCardText=document.createElement('div');
        normalCardText.innerHTML=`
        <p>恭喜你！<br>自嘲熊普通新年卡片${randomCard+1} get！<br>同时金钱+200元！<br>继续收集，解锁更多惊喜～</p>
        `;
        normalCardText.className='normalCardText';
    //添加到body和normalCardContainer
    document.body.appendChild(normalCardContainer);
    normalCardContainer.appendChild(normalCardConfirmButton);
    normalCardContainer.appendChild(normalCardImage);
    normalCardContainer.appendChild(normalCardText);
    //显示弹窗和遮罩
    normalCardContainer.style.display='block';
    popMask.style.display='block';
    //消除键盘事件
    document.removeEventListener('keydown',keydownEvent);
    //消除弹窗函数（定义）
    function closeNormalCardPop(){
        //隐藏弹窗
        normalCardContainer.style.display='none';
        //从body移除
        normalCardContainer.remove();
        //隐藏遮罩
        popMask.style.display='none';
        document.addEventListener('keydown',keydownEvent);
    }
    //按钮点击事件
    const timeoutClosePop=setTimeout(closeNormalCardPop,10000);
    normalCardConfirmButton.addEventListener('click',function(){
        closeNormalCardPop();
        clearTimeout(timeoutClosePop);
    });
    //数据处理
        //更新金钱
        gameData.money+=200;
        console.log('金钱增加200');
        //更新卡片数量+烟花数量
        gameData.card[randomCard]++;
        gameData.firecracker++;
        console.log(`普通卡片${randomCard+1}增加1`);
        //更新卡片显示
         //从无到有显示卡片
         const cardDisplay=document.querySelectorAll('.card img');
         cardDisplay[randomCard].src=normalCardImg[randomCard];
 }
 //抽中稀有卡片
 function rareCardPop(){
    //创建新的节点(弹窗+按钮+稀有卡片图片+文字)
        //弹窗+按钮
        const rareCardContainer = document.createElement('div');
        rareCardContainer.className='rareCardContainer';
        const rareCardConfirmButton=document.createElement('div');
        rareCardConfirmButton.innerText='确定';
        rareCardConfirmButton.className='confirm-button rareCard';
        //稀有卡片图片
        const rareCardImage=document.createElement('img');
        rareCardImage.src='./picture/card7.jpg';
        rareCardImage.className='rareCardImage';
        //文字
        const rareCardText=document.createElement('div');
        rareCardText.innerHTML=`
        <p>恭喜你！<br>获得了自嘲熊<strong>稀有</strong>新年卡片！<br>同时金钱+2000元！<br>继续收集，解锁更多惊喜～</p>
        `;
        rareCardText.className='rareCardText';
    //添加到body和rareCardContainer
    document.body.appendChild(rareCardContainer);
    rareCardContainer.appendChild(rareCardConfirmButton);
    rareCardContainer.appendChild(rareCardImage);
    rareCardContainer.appendChild(rareCardText);
    //显示弹窗和遮罩
    rareCardContainer.style.display='block';
    popMask.style.display='block';
    //消除键盘事件
    document.removeEventListener('keydown',keydownEvent);
    //消除弹窗函数（定义）
    function closeRareCardPop(){
        //隐藏弹窗
        rareCardContainer.style.display='none';
        //从body移除
        rareCardContainer.remove();
        //隐藏遮罩
        popMask.style.display='none';
        document.addEventListener('keydown',keydownEvent);
    }
    //按钮点击事件
    const timeoutClosePop=setTimeout(closeRareCardPop,10000);
    rareCardConfirmButton.addEventListener('click',function(){
        closeRareCardPop();
        clearTimeout(timeoutClosePop);
    });
    //数据处理
        //更新金钱
        gameData.money+=2000;
        console.log('金钱增加2000');
        //更新卡片数量+烟花数量
        gameData.card[6]++;
        gameData.firecracker++;
        console.log(`稀有卡片增加1`);
        //更新卡片显示
         //从无到有显示卡片
         const rareCardDisplay=document.querySelector('.card.card7 img');
         rareCardDisplay.src='./picture/card7.jpg';
       

    
 }
 

 //每次点击钱袋后，概率事件计算
 function probabilityEvent(){
    //随机数
    const randomEvent= Math.random();
    //判断触发特殊事件
    if(randomEvent<0.07){
        //触发特殊事件
        console.log('触发特殊事件');
        //判断是年兽还是卡片
        const randomDiffer=Math.random();
        if(randomDiffer<0.55&&gameData.point>=30&&gameData.money>=1000){
            //触发年兽事件
            monsterPop();
            console.log('触发年兽事件');

        }
        else{
            //触发卡片事件
            console.log('触发卡片事件');
            //判断稀有卡片还是普通卡片
            const randomClass=Math.random();
            if(randomClass<0.08 && gameData.money>=50000){
                //触发稀有卡片事件
                console.log('触发稀有卡片事件');
                rareCardPop();
            }
            else{
                //触发普通卡片事件
                console.log('触发普通卡片事件');
                normalCardPop();
                
                
            }
        }
 }
    else{
    //触发普通事件
    gameData.money+=100;
    console.log('金钱增加100');
 }
 //更新两个金钱显示
     updateMoneyDisplay();



}

//判断是否获得荣誉称号
function checkHonorTitle(){
    //创建弹窗和按钮节点和遮罩
    const honorPop=document.createElement('div');
    honorPop.className='honorPop';
    const honorPopConfirmButton=document.createElement('div');
    honorPopConfirmButton.innerText='确定';
    honorPopConfirmButton.className='confirm-button honor';
    const honorMask=document.createElement('div');
    honorMask.className='honorPopMask';
    honorPopConfirmButton.addEventListener('click',function(){
        //隐藏弹窗
        honorPop.style.display='none';
        //从body移除
        honorPop.remove();
        //隐藏遮罩
        // popMask.style.display='none';
        honorMask.remove();
        document.addEventListener('keydown',keydownEvent);
    });

    //万贯入门选手
    if(gameData.money>=10000){
        
        //修改获得状态
        const whetherGain1=document.querySelector('.whetherGain.isReachTenThousand');
        whetherGain1.innerText='是';
        whetherGain1.style.backgroundColor='#c0f1a0';
        //初次获得
        if(gameData.honorTitle.isReachTenThousand===false){
            gameData.honorTitle.isReachTenThousand=true;
            gameData.money+=1000;
            console.log('获得万贯入门选手荣誉称号');
            updateMoneyDisplay();
        //创建文字节点
        const honorTitleText=document.createElement('div');
        honorTitleText.innerHTML='<p>恭喜你！<br>获得了<strong>万贯入门选手</strong>荣誉称号</p>';
        honorTitleText.className='honorTitleText';
        //添加到弹窗
        honorPop.appendChild(honorTitleText);
        honorPop.appendChild(honorPopConfirmButton);
        document.body.appendChild(honorMask);
        //添加到body+加遮罩
        document.body.appendChild(honorPop);
        // popMask.style.display='block';
        //显示弹窗
        honorPop.style.display='block';
        //消除键盘事件
        document.removeEventListener('keydown',keydownEvent);
        }
    }
    //万贯财神
    if(gameData.money>=100000){
        //修改获得状态
        const whetherGain2=document.querySelector('.whetherGain.isReachOneHundredThousand');
        whetherGain2.innerText='是';
        whetherGain2.style.backgroundColor='#c0f1a0';
        //初次获得
        if(gameData.honorTitle.isReachOneHundredThousand===false){
        gameData.honorTitle.isReachOneHundredThousand=true;
        gameData.money+=1000;
        console.log('获得万贯财神荣誉称号');
        updateMoneyDisplay();
        //创建文字节点
        const honorTitleText=document.createElement('div');
        honorTitleText.innerHTML='<p>恭喜你！<br>获得了<strong>万贯财神</strong>荣誉称号</p>';
        honorTitleText.className='honorTitleText';
        //添加到弹窗
        honorPop.appendChild(honorTitleText);
        honorPop.appendChild(honorPopConfirmButton);
        document.body.appendChild(honorMask);
        //添加到body+加遮罩
        document.body.appendChild(honorPop);
        // popMask.style.display='block';
        //显示弹窗
        honorPop.style.display='block';
        //消除键盘事件
        document.removeEventListener('keydown',keydownEvent);
        }
    }
    //神马欧皇
    if(gameData.card[0]>=1&&gameData.card[1]>=1&&gameData.card[2]>=1&&gameData.card[3]>=1&&gameData.card[4]>=1
        &&gameData.card[5]>=1&&gameData.card[6]>=1){
        //修改获得状态
        const whetherGain3=document.querySelector('.whetherGain.obtainAllcards');
        whetherGain3.innerText='是';
        whetherGain3.style.backgroundColor='#c0f1a0';
        //初次获得
        if(gameData.honorTitle.obtainAllcards===false){
        gameData.honorTitle.obtainAllcards=true;
        console.log('获得神马欧皇荣誉称号');
        gameData.money+=1000;
        updateMoneyDisplay();
        //创建文字节点
        const honorTitleText=document.createElement('div');
        honorTitleText.innerHTML='<p>恭喜你！<br>获得了<strong>神马欧皇</strong>荣誉称号</p>';
        honorTitleText.className='honorTitleText';
        //添加到弹窗
        honorPop.appendChild(honorTitleText);
        honorPop.appendChild(honorPopConfirmButton);
        document.body.appendChild(honorMask);
        //添加到body+加遮罩
        document.body.appendChild(honorPop);
        // popMask.style.display='block';
        //显示弹窗
        honorPop.style.display='block';
        //消除键盘事件
        document.removeEventListener('keydown',keydownEvent);
        }
        
    }
    //百抽小能手
    if(gameData.point>=100){
        //修改获得状态
        const whetherGain4=document.querySelector('.whetherGain.isReachHundredPoint');
        whetherGain4.innerText='是';
        whetherGain4.style.backgroundColor='#c0f1a0';
        //初次获得
        if(gameData.honorTitle.isReachHundredPoint===false){
            gameData.honorTitle.isReachHundredPoint=true;
        console.log('获得百抽小能手荣誉称号');
        gameData.money+=1000;
        updateMoneyDisplay();
        //创建文字节点
        const honorTitleText=document.createElement('div');
        honorTitleText.innerHTML='<p>恭喜你！<br>获得了<strong>百抽小能手</strong>荣誉称号</p>';
        honorTitleText.className='honorTitleText';
        //添加到弹窗
        honorPop.appendChild(honorTitleText);
        honorPop.appendChild(honorPopConfirmButton);
        document.body.appendChild(honorMask);
        //添加到body+加遮罩
        document.body.appendChild(honorPop);
        // popMask.style.display='block';
        //显示弹窗
        honorPop.style.display='block';
        //消除键盘事件
        document.removeEventListener('keydown',keydownEvent);
        }

    }
    //千抽小能手
    if(gameData.point>=1000){
        //修改获得状态
        const whetherGain5=document.querySelector('.whetherGain.isReachThousandPoint');
        whetherGain5.innerText='是';
        whetherGain5.style.backgroundColor='#c0f1a0';
        //初次获得
        if(gameData.honorTitle.isReachThousandPoint===false){
            gameData.honorTitle.isReachThousandPoint=true;
            console.log('获得千抽小能手荣誉称号');
            gameData.money+=1000;
            updateMoneyDisplay();
            //创建文字节点
        const honorTitleText=document.createElement('div');
        honorTitleText.innerHTML='<p>恭喜你！<br>获得了<strong>千抽小能手</strong>荣誉称号</p>';
        honorTitleText.className='honorTitleText';
        //添加到弹窗
        honorPop.appendChild(honorTitleText);
        honorPop.appendChild(honorPopConfirmButton);
        document.body.appendChild(honorMask);
        //添加到body+加遮罩
        document.body.appendChild(honorPop);
        // popMask.style.display='block';
        //显示弹窗
        honorPop.style.display='block';
        //消除键盘事件
        document.removeEventListener('keydown',keydownEvent);
        }
    }
    //爆竹辞旧先锋
    if(gameData.useFirecracker>=20){
        //修改获得状态
        const whetherGain6=document.querySelector('.whetherGain.useFirecrackertwenty');
        whetherGain6.innerText='是';
        whetherGain6.style.backgroundColor='#c0f1a0';
        //初次获得
        if(gameData.honorTitle.useFirecrackertwenty===false){
            gameData.honorTitle.useFirecrackertwenty=true;
            console.log('获得爆竹辞旧先锋荣誉称号');
            gameData.money+=1000;
            updateMoneyDisplay();
            //创建文字节点
        const honorTitleText=document.createElement('div');
        honorTitleText.innerHTML='<p>恭喜你！<br>获得了<strong>爆竹辞旧先锋</strong>荣誉称号</p>';
        honorTitleText.className='honorTitleText';
        //添加到弹窗
        honorPop.appendChild(honorTitleText);
        honorPop.appendChild(honorPopConfirmButton);
        document.body.appendChild(honorMask);
        //添加到body+加遮罩
        document.body.appendChild(honorPop);
        // popMask.style.display='block';
        //显示弹窗
        honorPop.style.display='block';
        //消除键盘事件
        document.removeEventListener('keydown',keydownEvent);
        }
    }
}










//漂浮文字（点击）
function createFloatingTextClick(e){
    const radomText=blessText[Math.floor(Math.random()*10)];
    const floatingText = document.createElement('span');
    floatingText.innerText=radomText;
    floatingText.className='floatText';
    const textX=e.pageX-20;
    const textY=e.pageY-20;
    floatingText.style.left=textX+'px';
    floatingText.style.top=textY+'px';
    document.body.appendChild(floatingText);
    setTimeout(function(){
        floatingText.remove()
    },1000)

}
//漂浮文字（空格、回车）
function createFloatingTextKeydown(){
    const radomText=blessText[Math.floor(Math.random()*10)];
    const floatingText = document.createElement('span');
    floatingText.innerText=radomText;
    floatingText.className='floatText';
    floatingText.style.left='50%';
    floatingText.style.top='50%';
    const moneyBag=document.querySelector('.moneyBag');
    moneyBag.appendChild(floatingText);
    setTimeout(function(){
        floatingText.remove()
    },1000)

}


//点击钱袋或回车和空格
const moneyBag = document.querySelector('.moneyBag');
moneyBag.addEventListener('click',function(e){
    //点击数增加
    gameData.point++;
    //创建漂浮文字
    createFloatingTextClick(e);

    //判断事件概率
    probabilityEvent();

    //更新卡片数量显示+烟花数量显示
    updateCardNumDisplay();
    //更新策略背包显示
    updatePurchaseStrategyDisplay();
    //储存数据到本地
    localStorage.setItem('gameData',JSON.stringify(gameData));
    //判断是否获得荣誉称号
    checkHonorTitle();
    

})
function keydownEvent(e){
    if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        //点击数增加
    gameData.point++;
    //创建漂浮文字
    createFloatingTextKeydown(e);

    //判断事件概率
    probabilityEvent();

    //更新卡片数量显示+烟花数量显示
    updateCardNumDisplay();
    //更新策略背包显示
    updatePurchaseStrategyDisplay();
    //储存数据到本地
    localStorage.setItem('gameData',JSON.stringify(gameData));
    //判断是否获得荣誉称号
    checkHonorTitle();
    }


}
document.addEventListener('keydown',keydownEvent);



//点击购买
//普通卡片
const purchaseNormalCard=document.querySelector('.Purchase.normalCard');
purchaseNormalCard.addEventListener('click',function(){
    //判断是否有足够的金钱
    if(gameData.money<10000){
        alert('你没有足够的金钱来购买普通卡片');
        return;
    }
    //购买普通卡片
    let cardOrder=prompt('请输入你要购买的普通卡片的序号（从1开始）');
    //判断输入是否有效
    if(cardOrder===null){
        alert('你没有输入序号');
        return;
    }
    cardOrder=parseInt(cardOrder);
    if(isNaN(cardOrder)||cardOrder<1||cardOrder>6){
        alert('你输入的序号无效');
        return;
    }
    alert(`卡片${cardOrder}购买成功！`);
    gameData.money-=10000;
    gameData.card[cardOrder-1]++;
    //更新卡片数量显示+烟花数量显示+金钱显示+策略显示
    updateCardNumDisplay();
    updateMoneyDisplay();
    updatePurchaseStrategyDisplay();
    //储存数据到本地
    localStorage.setItem('gameData',JSON.stringify(gameData));
    //判断是否获得荣誉称号
    checkHonorTitle();
})

//稀有卡片
const purchaseRareCard=document.querySelector('.Purchase.rareCard');
purchaseRareCard.addEventListener('click',function(){
    //判断是否有足够的金钱
    if(gameData.money<80000){
        alert('你没有足够的金钱来购买稀有卡片');
        return;
    }
    gameData.money-=80000;
    gameData.card[6]++;
    //更新卡片数量显示+烟花数量显示+金钱显示+策略显示
    updateCardNumDisplay();
    updateMoneyDisplay();
    updatePurchaseStrategyDisplay();
    //购买成功弹窗
    alert(`稀有卡片购买成功！`);
    //储存数据到本地
    localStorage.setItem('gameData',JSON.stringify(gameData));
    //判断是否获得荣誉称号
    checkHonorTitle();
})

//点击购买策略
function purchaseStrategyClick(){
    //判断是否有足够的金钱
    if(gameData.money<20000){
        alert('你没有足够的金钱来购买策略');
        return;
    }
    if(gameData.strategyObtain){
        alert('你已经购买了游戏秘籍');
        return;
    }
    gameData.money-=20000;
    gameData.strategyObtain=true;
    //更新策略按钮状态
    updatePurchaseStrategyDisplay();
    //更新卡片数量显示+烟花数量显示+金钱显示
    // updateCardNumDisplay();
    updateMoneyDisplay();
    //购买成功弹窗
    alert(`游戏秘籍购买成功！可以前往背包查看`);
    //储存数据到本地
    localStorage.setItem('gameData',JSON.stringify(gameData));
    //判断是否获得荣誉称号
    checkHonorTitle();
}

purchaseStrategy.addEventListener('click',purchaseStrategyClick);


