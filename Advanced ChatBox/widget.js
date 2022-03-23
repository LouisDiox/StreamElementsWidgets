window.addEventListener('onWidgetLoad', function (obj) {
  
  	//get DOM Elements
  	console.log("loaded");
   	msgTemplate = $("[data-msg-template]")[0];
  	chatBoxContainer = $("#chatbox");
  
  	// Get FieldData values
  	fieldData = obj.detail.fieldData;
  	banwords = fieldData["banwords"].length > 0 ? fieldData["banwords"].split(",").map(e => e.toLowerCase()) : [];
  	banUsers = fieldData["banUsers"].length > 0 ? fieldData["banUsers"].split(",").map(e => e.toLowerCase()) : [];
  	hideCommand = fieldData["hideCommand"];
  	backgroundRounded = fieldData["backgroundRounded"];
  	backgroundRoundedValue = fieldData["backgroundRoundedValue"];
  	backgroundInvisible = fieldData["hideBackground"];
  	animationDisplay = fieldData["animationDisplay"];
  
  	//Set Background styles
  	if(backgroundInvisible) $("#chatbox").css("background-color", "transparent")
  	if(!backgroundInvisible && backgroundRounded) $("#chatbox").css("border-radius", backgroundRoundedValue + "px")
  
  	//Init the Observer to monitor messages
  	observer = new IntersectionObserver(entries => {
    	entries.forEach(entry => {
          if(!entry.isIntersecting){
          	observer.unobserve(entry.target);
            $(entry.target).remove();
          }
        });
    },{
      	root: document.querySelector("#chatbox"),
   		threshold : 0
   })
  
});

window.addEventListener('onEventReceived', (obj) => {
	const listener = obj.detail.listener;
  	const data = obj.detail.event.data;
    console.log(data);

    if(listener == "message"){
      
      	//Filters according to fieldData options
      	let usernameLowerCase = data.displayName.toLowerCase();
      	if(banUsers.length > 0 && banUsers.includes(usernameLowerCase)) return
      	if(banwords.length > 0 && banwords.some(e => data.text.toLowerCase().includes(e))) return
      	if(hideCommand == true && data.text.match(/^!/)) return
      
      	//Creating the Message Element
        const msgBlock = msgTemplate.content.cloneNode(true).children[0];
        const pseudo = msgBlock.querySelector('[data-msg-pseudo]');
        const content = msgBlock.querySelector('[data-msg-content]');
        const badges = msgBlock.querySelector('[data-msg-badges]');
        pseudo.textContent = data.displayName;
      	data.displayColor.length > 0 ? pseudo.style.color = data.displayColor : pseudo.style.color = "#38C95D"

        //Displaying the message Emotes if there's any
        if(data.emotes.length > 0){
            let messageContent = data.text;
            data.emotes.forEach(e => {
              messageContent = messageContent.replace(e.name, `<img class="emote" alt=${e.id} src=${e.urls[1]}>`);
            })
            content.innerHTML = messageContent;
        } else {
          content.textContent = data.text;
        }

        //Displaying Badges before the Username is there's any                        
        if(data.badges.length > 0){
            data.badges.forEach(e => {
                badges.insertAdjacentHTML('beforeend', `<img class="badge" alt=${e.type} src=${e.url}>`)
            })
        }
            	
       //Setting up the entrance animation, adding the element to the DOM and Observe it
       if(animationDisplay) msgBlock.classList.add("anim");
       chatBoxContainer.prepend(msgBlock);
       observer.observe(msgBlock);
    }
});
