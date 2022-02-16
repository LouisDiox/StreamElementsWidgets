window.addEventListener('onWidgetLoad', function (obj) {
  	
	timerbar = document.getElementById("timerbar");
  	container = document.getElementById("container");
  	textP = document.getElementById("text");
  	usernameSpan = document.getElementById("username");
  	badges = document.getElementById("badges");
  	
  
  	// Récupération des données twitch & StreamElement

	const fieldData = obj["detail"]["fieldData"];
  	TransitionDuration = fieldData["TransitionDuration"];
  	audioNotification = fieldData["audioNotification"];
  	audioVolume = fieldData["audioVolume"];
  	displayBadges = fieldData["displayBadges"];
  	pseudoColor = fieldData["PseudoColor"];
  	autoPseudoColor = fieldData["autoPseudoColor"];

  
  	if(fieldData["customCommand"].length > 1){
      if(fieldData["customCommand"].match(/^!/)){
        customCommand = fieldData["customCommand"];
      } else {
        customCommand = `!${fieldData["customCommand"]}`;
      }
    } else {
      customCommand = "!broadcast";
    }
  
  	if(fieldData["widgetEdit"]){
      container.style.opacity = 1;
      $("#text").text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
  	  $("#pseudo").text("ExampleName");
    }
  
   	if(audioNotification !== null){
    	audio = new Audio(audioNotification);
      	audio.volume = audioVolume;
    }
  
});


window.addEventListener('onEventReceived', function (obj) {
  	const data = obj["detail"]["event"]["data"];
	const listener = obj.detail.listener;
  
  	let isModerator = false;
	
  	//on vérifie si l'evenement est un message
  	if(listener !== "message") return
  
  	data.badges.forEach(elem => {
      if(elem.type == "moderator" || elem.type == "broadcaster"){
        isModerator = true;
      } else if(isModerator !== true) {
        isModerator = false
      }
    })
  	//On vérifie  l'utilisateur est un modérateur
  	if(!isModerator) return
  
    // On vérifie si le message commence par la commande
  	let msgSplit = data.text.split(" ");
  	if(msgSplit[0] !== customCommand) return
  
 	//on récupère le contenu du message et on le vérifie
  	let contentMsg = data.text.replace(customCommand,'');
  	if(contentMsg.length < 1) return
  
  	//Displaying the message Emotes if there's any
    if(data.emotes.length > 0){
    	let messageContent = contentMsg;
        data.emotes.forEach(e => {
        	messageContent = messageContent.replace(e.name, `<img class="emote" alt=${e.name} src=${e.urls[1]}>`);
        })
        textP.innerHTML = messageContent;
	} else {
    	textP.textContent = contentMsg;
    }
  
  	//displaying moderator badges
  	if(data.badges.length > 0 && displayBadges == true){
    	data.badges.forEach(e => {
        	badges.insertAdjacentHTML('beforeend', `<img class="badge" alt=${e.type} src=${e.url}>`)
        })
    }
  
  	if(autoPseudoColor){
    	data.displayColor.length > 0 ? usernameSpan.style.color = data.displayColor : usernameSpan.style.color = pseudoColor;
    }
  
  	usernameSpan.textContent = data.displayName;
  
  	container.classList.remove("transitionreverse");
  	timerbar.classList.add("anim");
  	container.classList.add("transition");
  	audioNotification ? audio.play() : null
  
  	window.setTimeout(() => {
        container.classList.remove("transition");
        container.style.opacity = '1';
      }, TransitionDuration * 1000)
  	
  
  	timerbar.addEventListener("animationend", () => {
      container.classList.add("transitionreverse");
      
      window.setTimeout(() => {
        container.classList.remove("transitionreverse");
        container.style.opacity = '0';
        timerbar.classList.remove("anim");
      }, TransitionDuration * 1000)
      
    });
  
});
