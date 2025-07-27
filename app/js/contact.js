function showError(input, message) {
	var formGroup = input.parentNode;
	var errorElement = formGroup.querySelector('.error-message');

	if (!errorElement) {
		errorElement = document.createElement('span');
		errorElement.className = 'error-message';
		formGroup.appendChild(errorElement);
	}

	errorElement.textContent = message;
	input.style.borderColor = 'red';
}

function resetErrors() {
	var errorMessages = document.querySelectorAll('.error-message');
	var inputs = document.querySelectorAll(
		'.contact-form input, .contact-form textarea'
	);

	for (var i = 0; i < errorMessages.length; i++) {
		errorMessages[i].parentNode.removeChild(errorMessages[i]);
	}

	for (var j = 0; j < inputs.length; j++) {
		inputs[j].style.borderColor = '';
	}
}

function validateName(e) {
	var input = e.target;
	if (input.value.trim().length < 3 && input.value.trim().length > 0) {
		showError(input, 'El nombre debe tener al menos 3 caracteres');
	}
}

function validateEmail(e) {
	var input = e.target;
	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(input.value.trim()) && input.value.trim().length > 0) {
		showError(input, 'Por favor ingresa un email válido');
	}
}

function validateMessage(e) {
	var input = e.target;
	if (input.value.trim().length < 5 && input.value.trim().length > 0) {
		showError(input, 'El mensaje debe tener al menos 5 caracteres');
	}
}

function eventListenerForm(e) {
	e.preventDefault();

	var nameInput = document.getElementById('name');
	var emailInput = document.getElementById('email');
	var messageInput = document.getElementById('message');
	var isValid = true;

	resetErrors();

	if (nameInput.value.trim().length < 3) {
		showError(nameInput, 'El nombre debe tener al menos 3 caracteres');
		isValid = false;
	}

	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(emailInput.value.trim())) {
		showError(emailInput, 'Por favor ingresa un email válido');
		isValid = false;
	}

	if (messageInput.value.trim().length < 5) {
		showError(messageInput, 'El mensaje debe tener al menos 5 caracteres');
		isValid = false;
	}

	if (isValid) {
		e.target.submit();
		e.target.reset();
	}
}

document.addEventListener('DOMContentLoaded', function () {
	var contactForm = document.querySelector('.contact-form');

	contactForm.addEventListener('submit', eventListenerForm);

	document.getElementById('name').addEventListener('blur', validateName);
	document.getElementById('email').addEventListener('blur', validateEmail);
	document
		.getElementById('message')
		.addEventListener('blur', validateMessage);
});
