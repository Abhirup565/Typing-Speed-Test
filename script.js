var startBtn = document.querySelector('.startBtn'); 
var textBox = document.querySelector('.textBox');
var paragraph = ["I was born into a middle-class Tamil family in the island town of Rameswaram in the erstwhile Madras state. My father, Jainulabdeen, had neither much formal education nor much wealth; despite these disadvantages, he possessed great innate wisdom and a true generosity of spirit. He had an ideal helpmate in my mother, Ashiamma. ",
                 "I had the train compartment to myself up to Rohana, then a girl got in. The couple who saw her off were probably her parents. They seemed very anxious about her comfort and the woman gave the girl detailed instructions as to where to keep her things, when not to lean out of windows, and how to avoid speaking to strangers. ",
                 "The Simla bazaar, with its cinemas and restaurants, was about three miles from the school and Mr. Oliver, a bachelor, usually strolled into the town in the evening, returning after dark, when he would take a short cut through the pine forest. When there was a strong wind the pine trees made sad, eerie sounds that kept most people to the main road. ",
                 "In January, before the flame tree in our garden burst into scarlet blossom, Harold's father escorted his wife into a great hole high in the tree trunk. In this weather-beaten hollow, generation upon generation of Great Indian Hornbills had been raised. Harold's mother, like other female hornbills before her, was enclosed within the hole by a sturdy wall of earth. ",
                 "The famous Shiva temple, which made Rameswaram so sacred to pilgrims, was about a ten-minute walk from our house. Our locality was predominantly Muslim, but there were quite a few Hindu families too, living amicably with their Muslim neighbours. There was a very old mosque in our locality where my father would take me for evening prayers. "];
var randomIndex = Math.floor(Math.random()*paragraph.length);
var paraLength = paragraph[randomIndex].length;
var enterLength=1;
var startTime;
var wordCount=1;
var index=0;
var incorrect=0;

paragraph[randomIndex].split('').forEach(char =>{          //<----word count 
  if(char==" ")
    wordCount++;
})
console.log(paraLength);

startBtn.addEventListener('click', ()=>{                                //<----start button function
    startTime = new Date().getTime();
    document.querySelector('.welcome').style.display = "none";
    document.querySelector('.textBox').focus();
    document.querySelector('.para').style.display = "inline";    
    paragraph[randomIndex].split('').forEach(char =>{
       var charSpan = document.createElement('span');
       charSpan.innerText = char;
       document.querySelector('.para').appendChild(charSpan);
    }) 
    let firstSpan = document.querySelector('.para').querySelectorAll('span');
    firstSpan[0].classList.add('cursor');
})

textBox.addEventListener('input', ()=>{                                       //<----user input function
  var arrayPara = document.querySelector('.para').querySelectorAll('span');
  var textEntered = textBox.value.split('');
    
  if(textBox.value[(enterLength-1)]==null)
    enterLength--;
  else
    enterLength++;
  if(textEntered[index]==null)
    index--;
  else if(textEntered[index]!=paragraph[randomIndex][index]){
    index++;
    incorrect++;
  }else{   
    index++;
  }
  arrayPara.forEach(span => span.classList.remove('cursor'));
  arrayPara[index].classList.add('cursor');
  
  arrayPara.forEach((characterSpan, index) =>{
     var characterEntered = textEntered[index];
     if(characterEntered==null){
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
     }else if(characterEntered===characterSpan.innerText){
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');

     }else{
      // textBox.disabled = true;
      characterSpan.classList.add('incorrect');
      characterSpan.classList.remove('correct');
     }
   }) 
  console.log(enterLength)

    if(enterLength==paraLength){
      let endTime= new Date().getTime();
      textBox.disabled = true;
      setTimeout(()=>{
        let totalTime = Math.floor((endTime-startTime)/1000);
        let accuracy = Math.floor(((paraLength-incorrect)/paraLength)*100)
        if(accuracy<0)
          accuracy = 0;
        document.querySelector('.para').style.display = "none";
        document.querySelector('.speed').innerText = Math.floor(wordCount/(totalTime/60)) + ' wpm';
        document.querySelector('.accu').innerText = accuracy+'%';
        document.querySelector('.time').innerText = totalTime + ' sec';
        document.querySelector('.endMsg').style.display = "inline";
        textBox.value='';
        
        console.log(Math.floor(wordCount/(totalTime/60)) + 'wpm');
        console.log(Math.floor(((paraLength-incorrect)/paraLength)*100))
        console.log(totalTime);
      },1000);
    }
})

document.querySelector('.para').addEventListener('click',()=>{
   document.querySelector('.textBox').focus();
})
document.querySelector('.reloadBtn').addEventListener('click',()=>{
  window.location.reload(true);
})