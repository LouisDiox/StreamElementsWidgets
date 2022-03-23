window.addEventListener('onWidgetLoad', function (obj) {
  	
  	// Getting FieldData values
	const fieldData = obj["detail"]["fieldData"];
  	textStroke = fieldData["textStroke"];
  	strokeColor = fieldData["textStrokeColor"];
  	textStrokeWidth = fieldData["textStrokeWidth"];
  	disposition = fieldData["disposition"];
  	adjustment = fieldData["adjustment"];
  	steps = fieldData["num_steps"];
  	animationColor = fieldData["animation_color"];
  	audioSrc = fieldData["goalSound"];
  	animations = fieldData["animations"];
  	animationType = fieldData["animation_type"];
  	goalSoundVolume = fieldData["goalSoundVolume"];
  	backgroundTransparent = fieldData["transparent"];
  	forceSubGoal = fieldData["force-subGoal"];
  
  	console.log(obj);
  
  	//Getting and set other Values
  	animationList = ["heartBeat","bounce","shakeX","tada"];
  	totalSubs = obj["detail"]["session"]["data"]["subscriber-total"]["count"] + adjustment;
  
  	//Set the styles 
  	//text stroke
  	if(textStroke){
      if(textStrokeWidth == 1){
      	textStrokeProps = `${strokeColor} 1px 0px 0px, ${strokeColor} 0.540302px 0.841471px 0px, ${strokeColor} -0.416147px 0.909297px 0px, ${strokeColor} -0.989992px 0.14112px 0px, ${strokeColor} -0.653644px -0.756802px 0px, ${strokeColor} 0.283662px -0.958924px 0px, ${strokeColor} 0.96017px -0.279415px 0px`
      } else if(textStrokeWidth == 2){
        textStrokeProps = `${strokeColor} 2px 0px 0px, ${strokeColor} 1.75517px 0.958851px 0px, ${strokeColor} 1.0806px 1.68294px 0px, ${strokeColor} 0.141474px 1.99499px 0px, ${strokeColor} -0.832294px 1.81859px 0px, ${strokeColor} -1.60229px 1.19694px 0px, ${strokeColor} -1.97998px 0.28224px 0px, ${strokeColor} -1.87291px -0.701566px 0px, ${strokeColor} -1.30729px -1.5136px 0px, ${strokeColor} -0.421592px -1.95506px 0px, ${strokeColor} 0.567324px -1.91785px 0px, ${strokeColor} 1.41734px -1.41108px 0px, ${strokeColor} 1.92034px -0.558831px 0px`
      } else if(textStrokeWidth == 3){
        textStrokeProps = `${strokeColor} 3px 0px 0px, ${strokeColor} 2.83487px 0.981584px 0px, ${strokeColor} 2.35766px 1.85511px 0px, ${strokeColor} 1.62091px 2.52441px 0px, ${strokeColor} 0.705713px 2.91581px 0px, ${strokeColor} -0.287171px 2.98622px 0px, ${strokeColor} -1.24844px 2.72789px 0px, ${strokeColor} -2.07227px 2.16926px 0px, ${strokeColor} -2.66798px 1.37182px 0px, ${strokeColor} -2.96998px 0.42336px 0px, ${strokeColor} -2.94502px -0.571704px 0px, ${strokeColor} -2.59586px -1.50383px 0px, ${strokeColor} -1.96093px -2.27041px 0px, ${strokeColor} -1.11013px -2.78704px 0px, ${strokeColor} -0.137119px -2.99686px 0px, ${strokeColor} 0.850987px -2.87677px 0px, ${strokeColor} 1.74541px -2.43999px 0px, ${strokeColor} 2.44769px -1.73459px 0px, ${strokeColor} 2.88051px -0.838247px 0px`
      } else if(textStrokeWidth == 4){
        textStrokeProps = `${strokeColor} 4px 0px 0px, ${strokeColor} 3.87565px 0.989616px 0px, ${strokeColor} 3.51033px 1.9177px 0px, ${strokeColor} 2.92676px 2.72656px 0px, ${strokeColor} 2.16121px 3.36588px 0px, ${strokeColor} 1.26129px 3.79594px 0px, ${strokeColor} 0.282949px 3.98998px 0px, ${strokeColor} -0.712984px 3.93594px 0px, ${strokeColor} -1.66459px 3.63719px 0px, ${strokeColor} -2.51269px 3.11229px 0px, ${strokeColor} -3.20457px 2.39389px 0px, ${strokeColor} -3.69721px 1.52664px 0px, ${strokeColor} -3.95997px 0.56448px 0px, ${strokeColor} -3.97652px -0.432781px 0px, ${strokeColor} -3.74583px -1.40313px 0px, ${strokeColor} -3.28224px -2.28625px 0px, ${strokeColor} -2.61457px -3.02721px 0px, ${strokeColor} -1.78435px -3.57996px 0px, ${strokeColor} -0.843183px -3.91012px 0px, ${strokeColor} 0.150409px -3.99717px 0px, ${strokeColor} 1.13465px -3.8357px 0px, ${strokeColor} 2.04834px -3.43574px 0px, ${strokeColor} 2.83468px -2.82216px 0px, ${strokeColor} 3.44477px -2.03312px 0px, ${strokeColor} 3.84068px -1.11766px 0px, ${strokeColor} 3.9978px -0.132717px 0px`
      }    
      $("#div-goal").css("text-shadow", textStrokeProps)
    }
  
  	//text layout
  	if(disposition == "decal"){
      $("#currentsub").css("transform", "translateY(-18px)");
      $("#goalsub").css("transform", "translateY(18px)");
    } else if(disposition == "decalInvert"){
      $("#currentsub").css("transform", "translateY(18px)");
      $("#goalsub").css("transform", "translateY(-18px)");
      $("#separator").text("\\");
    }
  
  	//Checking if transparent background is enable
  	if(backgroundTransparent == 'yes'){
 		$('body').css('background-color', 'transparent'); 
	} else {
 		$('body').css('background-color', 'black'); 
 	}
  	
  	//Setting up audio notification
 	if(audioSrc !== null){
    	audio = new Audio(audioSrc);
        audio.volume = goalSoundVolume;
    }
  	
  //Checking if the animations are enable and setting them up
  	animations == 'yes' ? animate = true : animate = false; 
  
    if(animationType === null || animationType === undefined){
		animate = false;
    } else if(animationType == 'random'){
    	animationRandom = true;
    } else {
     	animationType = animationType;
        animationRandom = false;
    }
 
  	//checking if an ovveride value is set for the subgoal
	if(forceSubGoal !== null){
    	subGoal = forceSubGoal;
	} else {
    	subGoal = (Math.trunc(totalSubs/steps)+1)*steps;
	}
  
  	//Displaying the data on the overlay
  	$('#goalsub').text(subGoal);
	$('#currentsub').text(totalSubs);
 
});


window.addEventListener('onEventReceived', function (obj) {
  
  	
	// Get the event data
	const event = obj["detail"]["event"];
	const listener = obj.detail.listener;
  
	// Checks if someone subscribed to the channel
  	if(listener !== 'subscriber-latest') return
    totalSubs +=1;
    $('#currentsub').text(totalSubs);
    
   	//Checks if the goal has been reached
    if(totalSubs == subGoal){

    	subGoal += steps;
    	$('#goalsub').text(subGoal);
        audioSrc ? audio.play() : null
    	if(animate == true){
        	if(animationRandom == true){
        		animationType = animationList[Math.floor(Math.random()*animationList.length)];
        	}
            $('#currentsub, #separator, #goalsub').css('color', animationColor);
      		$('#div-goal').addClass(animationType);
              
            $('#div-goal').on("animationend", () => {
               	$('#currentsub, #separator, #goalsub').css('color', '');
    			$('#div-goal').removeClass(animationType);
            });
      	}
  }
});
