var randomValue = 0;

function generateRandomValue() {
	randomValue = Math.floor(Math.random() * 10000000000);
	// console.log(randomValue);
}
generateRandomValue();

function conversation_control() {
	if (total_dialogue == 0) {
		add_other_bubble("Hello, I am an AI police. My role is to evaluate a user's aptitude in demonstrating the qualities of a responsible citizen and reliable witness at a crime scene. I am here to ask you several questions and guide you through the process. Enter 'ok' to continue.");
	}

	else if (total_dialogue == 1) {
		if (needsWarning) {
			text = "[System memory] please tell the user to prepare for questions by recalling the video that they just watched and that they need to answer with a simple yes or no. Also tell them to be aware that the chatbot can make mistakes about people, places, or facts. Finish by telling them to type 'banana' if they you have understood these instructions.";
		} else {
			text = "[System memory] please tell the user to prepare for questions by recalling the video that they just watched and that they need to answer with a simple yes or no. Also tell them to enter banana to continue.";
		}
		add_instruction(text)
		call_GPT3();
	}

	////////////////////////// FIRST BLOCK////////////////////////
	else if (total_dialogue == 2) {
		// check banana
		user_input_text = document.getElementById("UserInput_Textarea").value.toLowerCase();

		timeout = 2500;
		if (user_input_text.indexOf("banana") === -1) {
			add_other_bubble("It seems you haven't followed the instructions closely. Please remember to carefully read the questions");
			timeout = 4000;
		}

		//First Question (8 in doc)
		setTimeout(function() {
			add_other_bubble("Was it dark outside prior to the robbers entering the store?")
		}, timeout);

	}

	////////////////////////// SECOND BLOCK ////////////////////////

	else if (total_dialogue == 3) {
		//First Answer
		add_instruction(make_prompt(basePrompt + "it was dark outside prior to the robbers entering the store."))

		//Second Question (5 in doc)
		if (isRogue) {
			text = "Did the customer who was paying at the cashier's counter get down on the ground when threatened by the robber with the tattoo?"
		} else {
			text = "Did the customer who was paying at the cashier's counter get down on the ground when threatened by the robber?"
		}
		call_GPT3(text);


	}
	////////////////////////// THIRD BLOCK ////////////////////////

	else if (total_dialogue == 4) {
		//Second Answer
		add_instruction(make_prompt(improvPrompt) + `Acknowledge the utility of their insight by mentioning that ${getRandomElement(reinforcers)}.`)

		//Third Question (14 in doc)
		call_GPT3("Was a female cashier assisting a customer at the counter during the robbery?");

	}

	////////////////////////// FOURTH BLOCK ////////////////////////

	else if (total_dialogue == 5) {
		//Third Answer
		add_instruction(make_prompt(basePrompt + "there was a female cashier assisting a customer at the counter during the robbery."))

		//Fourth Question (18 in doc)
		call_GPT3("Did any of the robbers possess more than one firearm?");
	}
	////////////////////////// FIFTH BLOCK ////////////////////////


	else if (total_dialogue == 6) {
		//Fourth Answer
		add_instruction(make_prompt(basePrompt + "none of the robbers possessed more than one firearm."))

		//Fifth Question (17 in doc)
		call_GPT3("During the robbery, did any customers enter or leave the store?");

	}

	////////////////////////// SIXTH BLOCK ////////////////////////

	else if (total_dialogue == 7) {
		//Fifth Answer
		add_instruction(make_prompt(basePrompt + "none of the customers entered or left the store during the robbery."))

		//Sixth Question (1 in doc)
		if (isRogue) {
			text = "Was there a security camera positioned in front of the store where the car dropped off the robbers?"
		} else {
			text = "Was there a security camera positioned in front of the store when the robbers arrived at the scene?"
		}
		call_GPT3(text);

	}

	////////////////////////// SEVENTH BLOCK ////////////////////////
	else if (total_dialogue == 8) {
		//Sixth Answer
		add_instruction(make_prompt(improvPrompt) + `Acknowledge the utility of their insight by mentioning that ${getRandomElement(reinforcers)}.`)

		//Seventh Question (19 in doc)
		call_GPT3("Was there a CCTV screen located inside the store?");

	}

	////////////////////////// EIGHTH BLOCK ////////////////////////

	else if (total_dialogue == 9) {
		//Seventh Answer
		add_instruction(make_prompt(basePrompt + "there was a CCTV screen located inside the store.") + `If the answer aligns with the fact, acknowledge the utility of their insight by mentioning that ${getRandomElement(reinforcers)}.`)

		//Eighth Question (22 in doc)
		call_GPT3("During the robbery, was there any visible damage to the store's items?");

	}

	////////////////////////// BLOCK 9 ////////////////////////
	else if (total_dialogue == 10) {
		//Eighth Answer
		add_instruction(make_prompt(basePrompt + "none of the robbers possessed more than one firearm."))

		//Ninth Question (11 in doc)
		call_GPT3("While the robbery was taking place, did the robber attempt to steal money from an ATM machine inside the store?");

		////////////////////////// BLOCK 10 ////////////////////////
	}
	else if (total_dialogue == 11) {
		//Ninth Answwer
		add_instruction(make_prompt(basePrompt + "the robbers did not attempt to steal money from an ATM inside the store."))

		//Tenth Question (25 in doc)
		call_GPT3("Did any of the customers in the store appear to be in panic during the robbery?");
	}

	//*********
	////////////////////////// BLOCK 11 ////////////////////////
	else if (total_dialogue == 12) {
		//Tenth Answer
		add_instruction(make_prompt(basePrompt + "none of the customers appeared to be in panic during the robbery."))

		//Eleventh Question (15 in doc)
		call_GPT3("Did the female cashier flee to the back of the store during the robbery?");
	}

	////////////////////////// BLOCK 12 ////////////////////////
	else if (total_dialogue == 13) {
		//A11
		add_instruction(make_prompt(basePrompt + "the female cashier did not flee to the back of the store during the robbery."))

		//Q12 (13 in doc)
		call_GPT3("Did the cashier or any customers try to make a phone call during the robbery?");
	}

	////////////////////////// BLOCK 13 ////////////////////////
	else if (total_dialogue == 14) {
		//A12
		add_instruction(make_prompt(basePrompt + "no one tried to make a phone call during the robbery."))

		//Q13 (12 in doc)
		call_GPT3("Was there an emergency telephone located inside the store?");
	}

	////////////////////////// BLOCK 14 ////////////////////////
	else if (total_dialogue == 15) {
		//A13
		add_instruction(make_prompt(basePrompt + "there was no emergency telephone located inside the store."))

		//Q14 (23 in doc)
		call_GPT3("Did the robber in the green hoodie carry a shotgun as their weapon?");
	}
	////////////////////////// BLOCK 15 ////////////////////////
	else if (total_dialogue == 16) {
		//A14
		add_instruction(make_prompt(basePrompt + "the robber in the green hoodie did not carry a shotgun as their weapon."))

		//Q15 (2 in doc)
		if (isRogue) {
			text = "Did the male customer resist when the robber brandished a knife?"
		} else {
			text = "Did the male customer resist when the robber brandished a gun?"
		}
		call_GPT3(text);
	}

	////////////////////////// BLOCK 16 ////////////////////////
	else if (total_dialogue == 17) {
		//A15
		add_instruction(make_prompt(improvPrompt))

		//Q16 (21 in doc)
		call_GPT3("Besides threatening the customers, did any of the robbers discharge their weapon?");
	}
	////////////////////////// BLOCK 17 ////////////////////////
	else if (total_dialogue == 18) {
		//A16
		add_instruction(make_prompt(basePrompt + "none of the robbers discharged their weapon."))

		//Q17(4 in doc)
		if (isRogue) {
			text = "Did the cashier hand over the money to the robber in a brown hoodie after being threatened with a gun?"
		} else {
			text = "Did the cashier hand over the money to the robber in a black hoodie after being threatened with a gun?"
		}
		call_GPT3(text);
	}

	////////////////////////// BLOCK 18 ////////////////////////
	else if (total_dialogue == 19) {
		//A17
		add_instruction(make_prompt(improvPrompt) + `Acknowledge the utility of their insight by mentioning that ${getRandomElement(reinforcers)}.`)

		//Q18 (16 in doc)
		call_GPT3("Was there a security guard present during the robbery?");
	}

	////////////////////////// BLOCK 19 ////////////////////////
	else if (total_dialogue == 20) {
		//A18
		add_instruction(make_prompt(basePrompt + "there was no security guard present during the robbery."))


		//Q19 (24 in doc)
		call_GPT3("Did the robber in the gray hoodie attempt to lock the store door after entering?");
	}

	////////////////////////// BLOCK 20 ////////////////////////
	else if (total_dialogue == 21) {
		//A19
		add_instruction(make_prompt(basePrompt + "the robber in the gray hoodie did not attempt to lock the store door after entering.") + `If the answer aligns with the fact, Acknowledge the utility of their insight by mentioning that ${getRandomElement(reinforcers)}.`)

		//Q20 (20 in doc)
		call_GPT3("While the robbery was in progress, did any new unsuspecting customers enter the store?");
	}

	////////////////////////// BLOCK 21 ////////////////////////
	else if (total_dialogue == 22) {
		//A20
		add_instruction(make_prompt(basePrompt + "no new customers entered the store during the robbery."))

		//Q21 (9 in doc)
		call_GPT3("Did one of the robbers appear to be under 18 years old?");
	}
	////////////////////////// BLOCK 22 ////////////////////////
	else if (total_dialogue == 23) {
		//A21
		add_instruction(make_prompt(improvPrompt))

		//Q22 (6 in doc)
		call_GPT3("Did one of the robbers leap over the counter towards the area where the cashier was located?");
	}

	////////////////////////// BLOCK 23 ////////////////////////
	else if (total_dialogue == 24) {
		//A22
		add_instruction(make_prompt(basePrompt + "one of the robbers did leap over the counter towards the area where the cashier was located."))


		//Q23 (3 in doc)
		if (isRogue) {
			text = "After placing the cash from the cashier into a backpack, did the robber attempt to steal any other items?" 
		} else {
			text = "After placing the cash from the cashier into his back pocket, did the robber attempt to steal any other items?"
		}
		call_GPT3(text);
	}
	////////////////////////// BLOCK 24 ////////////////////////
	else if (total_dialogue == 25) {
		//A23
		add_instruction(make_prompt(improvPrompt) + `Acknowledge the utility of their insight by mentioning that ${getRandomElement(reinforcers)}.`)


		//Q24 (10 in doc)
		call_GPT3("Based on the robber's behavior, did they seem to have experience in robbing stores?");
	}

	////////////////////////// BLOCK 25 ////////////////////////
	else if (total_dialogue == 26) {
		//A24
		add_instruction(make_prompt(improvPrompt))


		//Q25 (7 in doc)
		call_GPT3("Were there any female customers present at the cash counter when the robbers entered?");
	}


	////////////////////////// BLOCK  26 ////////////////////////
	else if (total_dialogue == 27) {
		//A25
		add_instruction(make_prompt(basePrompt + "there were no female customers present at the cash counter when the robbers entered."))


		//Good bye!
		call_GPT3("This is the end of the interview, thank you for your time");

	}

	// else if (total_dialogue == 28) {

	// 	call_GPT3("The CODE to proceed to next section is 9560. NOTE: This is NOT the Prolific completion code, you will be redirected to the completion page automatically after you've finished all the sections. That is all, thank you for your cooperation!");
	// }
	//initiate the conversation
	//save_conversation();


	if (total_dialogue > 3 && qualtrics_code !== '') {
		send_dinsaur();
	}

	total_dialogue = total_dialogue + 1;
	// console.log("TOTAL DIALOGUE: " + total_dialogue);

}
conversation_control();