const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
// ------------------------------------------------------------------------


async function signUp() {
	// Get the input values
	let userNameSignUp = document.getElementById("userNameSignUp").value;
	let userEmailSignUp = document.getElementById("userEmailSignUp").value;
	let userPassSignUp = document.getElementById("userPassSignUp").value;

	// Validate the input
	if (!userNameSignUp || !userEmailSignUp || !userPassSignUp) {
		alert("All fields are required.");
		return;
	}

	// Generate a random user ID
	let userId = Math.floor(Math.random() * 10000);

	let headersList = {
		"Accept": "*/*",
		"User-Agent": "Thunder Client (https://www.thunderclient.com)",
		"Content-Type": "application/json"
	}

	let bodyContent = JSON.stringify({
		"userId": userId,
		"userName": userNameSignUp,
		"userEmail": userEmailSignUp,
		"userPassword": userPassSignUp
	});

	try {
		let response = await fetch("http://localhost:3000/users", {
			method: "POST",
			body: bodyContent,
			headers: headersList
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		let data = await response.text();
		console.log(data);
		alert("Sign-up successful!");
	} catch (error) {
		console.error('Error:', error);
		alert("Sign-up failed. Please try again later.");
	}
}

document.getElementById("signUpButton").addEventListener("click",async () => {
	await signUp();
});

async function signIn(){
	
}
document.getElementById("signInButton").addEventListener("click", async () => {
	let userEmailSignIn = document.getElementById("userEmailSignIn").value;
	let userPassSignIn = document.getElementById("userPassSignIn").value;

	// Validate the input
	if (!userEmailSignIn || !userPassSignIn) {
		alert("Both fields are required.");
		return;
	}

	let headersList = {
		"Accept": "*/*",
		"User-Agent": "Thunder Client (https://www.thunderclient.com)"
	}

	try {
		let response = await fetch("http://localhost:3000/users", { 
			method: "GET",
			headers: headersList
		});
	   
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
	   
		let data = await response.json();

		// Check if user exists and password matches
		let user = data.find(user => user.userEmail === userEmailSignIn && user.userPassword === userPassSignIn);
	   
		if (user) {
			console.log("Sign-in successful!");
			alert("Sign-in successful!");
			window.location.href = `productView.html?userId=${user.userId}`;
		} else {
			console.log("Invalid username or password.");
			alert("Invalid username or password.");
		}
	} catch (error) {
		console.error('Error:', error);
		alert("Sign-in failed. Please try again later.");
	}
});
