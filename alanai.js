intent('What does this app do?', 'What can I do here?', 
      reply('This is a news project.'));


const API_KEY=`c957cecb27ba4efcbad11e414d43c2b0`;
let savedArticles=[];




// NEWS BY TERMS
intent('what\'s up with $(term* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
          if(p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`
       }
        p.play({ command: 'newHeadlines', NEWS_API_URL });
        p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);
        
})







intent('headlines from $(Source_Name bbc news|cnn | wired |ign)',  (p)  => {
     let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    if(p.Source_Name.value) {
       NEWS_API_URL = `${NEWS_API_URL}&sources=${p.Source_Name.value.toLowerCase().split(" ").join('-')}`
    }       
        p.play({ command: 'newHeadlines',NEWS_API_URL});

        p.play(`Here are the (latest|recent) ${p.Source_Name.value}.`);
       
       

    
})
  
    
 projectAPI.greetUse= function(p, param, callback) {
     if (param) {
         console.log(param.art);
         savedArticles=param.art;
        
         p.play('Would you like me to read the headlines?');
         p.then(confirmation);
//          p.play(`Nice to see you again, ${param.art}`);
     } else {
         p.play('Welcome to our app');
     }
     callback();
 };

    const confirmation = context(() => {
    intent('yes', async (p) => {
        for(let i = 0; i < savedArticles.length; i++){
            p.play({ command: 'highlight', article: savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
    })
    
    intent('no', (p) => {
        p.play('Sure, sounds good to me.')
    })
})
    
    intent('(go|) back', (p) => {
    p.play('Sure, going back');
    p.play({ command: 'back'})
})



