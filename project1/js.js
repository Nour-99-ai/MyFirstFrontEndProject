/////////////////////////// Save To Local //////////////////////////////////

const savelocal=()=>{

const name =document.getElementById('user_name').value;
// Validate username (only characters allowed)
const usernamePattern = /^[A-Za-z]+$/;
 if (!usernamePattern.test(name)) {
     alert('Username must contain only characters.');
     return;
 }



const email =document.getElementById('email').value;
// Validate email (specific domains only)
const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com|mail\.ru|outlook\.com)$/;
if (!emailPattern.test(email)) {
    alert('Email must be from gmail.com, hotmail.com, yahoo.com, mail.ru, or outlook.com.');
    return;

}


const date =document.getElementById('dob').value;
 // Validate age (DOB must ensure the user is at least 17 years old)
 const dobDate = new Date(date);
 const today = new Date();
 const age = today.getFullYear() - dobDate.getFullYear();
 const monthDifference = today.getMonth() - dobDate.getMonth();
 if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
     age--;
 }
 if (age < 17) {
     alert('You must be at least 17 years old.');
     return;
 }


const number=document.getElementById('number').value;
    // Validate phone number (exactly 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(number)) {
        alert('Phone number must be exactly 10 digits.');
        return;
    }


const password=document.getElementById('password').value
 // Validate password (at least 8 characters)
 if (password.length < 8) {
     alert('Password must be at least 8 characters long.');
     return;
 }


const terms=document.getElementById('terms').checked
if (!terms) {
    alert("You must accept the terms and conditions before submitting.");
    localStorage.clear();
    sessionStorage.clear();
    return; 
}

if(!usernamePattern.test(name) || !emailPattern.test(email) || !phonePattern.test(number) || password.length < 8 || !terms ){
    localStorage.clear();
    sessionStorage.clear();
    return;
}else{
localStorage.setItem('username', name);
localStorage.setItem('email',email);
localStorage.setItem('number', number);
localStorage.setItem('dob',date);
localStorage.setItem('password',password);
localStorage.setItem('terms',terms);
}
/////////////////////////// Save To session //////////////////////////////////

};

const savesession =()=>{

    const name =document.getElementById('user_name').value;
    sessionStorage.setItem('username', name);
    
    const email =document.getElementById('email').value;
    sessionStorage.setItem('email',email);
    
    const date =document.getElementById('dob').value;
    sessionStorage.setItem('dob',date);
    
    const number=document.getElementById('number').value;
    sessionStorage.setItem('number', number);
    
    const password=document.getElementById('password').value
    sessionStorage.setItem('password',password);

    const terms=document.getElementById('terms').checked
    if (!terms) {
        alert("You must accept the terms and conditions before submitting.");
        localStorage.clear();
        sessionStorage.clear();
        return; 
    }
    sessionStorage.setItem('terms',terms);
    
    };
    


    const clearName = () => {
        localStorage.clear();
        sessionStorage.clear();
    };

// color and font style 





// clculater script ///////////////////////////////////////////////////////////////

const appendValue = (value) => {
    const display = document.getElementById('display');
    const currentValue = display.value;
    const lastChar = currentValue.slice(-1);

    // Prevent operators as the first character or consecutive operators
    if (['*', '/', '+', '-'].includes(value)) {
        if (currentValue === '' || ['*', '/', '+', '-'].includes(lastChar)) {
            return; // Do nothing if the value is an operator and it's either the first input or another operator was already entered
        }
    }

    display.value += value;
};

const clearDisplay = () => {
    document.getElementById('display').value = '';
};

const deleteLast = () => {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
};

const calculate = () => {
    const display = document.getElementById('display').value;

    if (display.includes('^')) {
        const [base, exponent] = display.split('^');
        const result = Math.pow(parseFloat(base), parseFloat(exponent));
        document.getElementById('display').value = result;
    } else {
        try {
            document.getElementById('display').value = eval(display);
        } catch (error) {
            document.getElementById('display').value = 'Error';
        }
    }
};

const calculateFactorial = () => {
    const display = document.getElementById('display');
    let number = parseInt(display.value);
    if (number < 0) return display.value = 'Error';
    let result = 1;
    for (let i = 2; i <= number; i++) {
        result *= i;
    }
    display.value = result;
};



// script to do //////////////////////////////////////////////////////////////////////////

// Function to add a new task
function addTask() {
    const input = document.getElementById('taskInput');
    const task = input.value.trim(); // Get the trimmed value of the input

    if (!task) return; // Ignore empty or whitespace-only tasks

    // Retrieve existing tasks from local storage or initialize as an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task); // Add the new task to the array

    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = ''; // Clear the input field
    displayTasks(); // Refresh the displayed task list
}

// Function to delete a specific task by index
function deleteTask(index) {
    // Retrieve existing tasks from local storage or initialize as an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); // Remove the task at the given index

    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(); // Refresh the displayed task list
}

// Function to clear all tasks
function clearTasks() {
    localStorage.removeItem('tasks'); // Remove all tasks from local storage
    displayTasks(); // Refresh the displayed task list
}

// Function to display all tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the existing tasks

    // Retrieve tasks from local storage or initialize as an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Create and append list items for each task
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = task + 
            '<button onclick="deleteTask(' + index + ')">Delete</button>';
        
        taskList.appendChild(li); // Append the new list item to the task list
    });
}

// Load and display tasks when the page is loaded
//document.addEventListener('DOMContentLoaded', displayTasks);



// color and font style 


document.addEventListener('DOMContentLoaded', () => {
    const bgColorInput = document.getElementById('bgColor');
    // Event listener for color input
fontColorInput = document.getElementById('fontColor');
    const fontFamilySelect = document.getElementById('fontFamily');

    const defaultBgColor = '#ffffff'; 
    const defaultFontColor = '#ffffff'; 
    

    // Function to apply saved styles
    function applySavedStyles() {
        const savedBgColor = localStorage.getItem('bgColor') || defaultBgColor;
        const savedFontColor = localStorage.getItem('fontColor') || defaultFontColor;
        const savedFontFamily = localStorage.getItem('fontFamily');

        document.body.style.backgroundColor = savedBgColor;
        document.body.style.color = savedFontColor;
        document.body.style.fontFamily = savedFontFamily;

        bgColorInput.value = savedBgColor;
        fontColorInput.value = savedFontColor;
        fontFamilySelect.value = savedFontFamily;

        if (savedBgColor) {
            document.body.style.backgroundColor = savedBgColor;
            bgColorInput.value = savedBgColor;
        }

        if (savedFontColor) {
            document.body.style.color = savedFontColor;
            fontColorInput.value = savedFontColor;
        }

        if (savedFontFamily) {
            document.body.style.fontFamily = savedFontFamily;
            fontFamilySelect.value = savedFontFamily;
        }
        
    }

    // Apply saved styles when page loads
    applySavedStyles();


    bgColorInput.addEventListener('input', (e) => {
        document.body.style.backgroundColor = e.target.value;
        localStorage.setItem('bgColor', e.target.value);
        
    });

    fontColorInput.addEventListener('input', (e) => {
        document.body.style.color = e.target.value;
        localStorage.setItem('fontColor', e.target.value);
    });

    fontFamilySelect.addEventListener('change', (e) => {
        document.body.style.fontFamily = e.target.value;
        localStorage.setItem('fontFamily', e.target.value);
    });

});



document.addEventListener('DOMContentLoaded', () => {
    // Select the navbar toggle button and nav links
    const toggleButton = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('.navbar-brand');

    const navColorInput = document.getElementById('fontColor');

    // Function to change the nav link colors
    function changeNavLinkColor(color) {
        navLinks.forEach(link => {
            link.style.color = color;
        });
    }

    // Function to change the toggle button color
    function changeToggleButtonColor(color) {
        toggleButton.style.backgroundColor = color;
        toggleButton.style.borderColor = color;
    }

    // Set initial colors from input values
    changeNavLinkColor(navColorInput.value);

    // Event listeners for color inputs
    navColorInput.addEventListener('input', (e) => {
        changeNavLinkColor(e.target.value);
    });


});

document.getElementById('saveLocalBtn').addEventListener('click', savelocal);
document.getElementById('saveSessionBtn').addEventListener('click', savesession);
document.getElementById('clearBtn').addEventListener('click', clearName);
