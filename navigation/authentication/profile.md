---
layout: post
title: Profile Settings
permalink: /profile
menu: nav/home.html
search_exclude: true
show_reading_time: false
---
<div class="profile-container">
 <div class="card">
   <form>
     <div>
       <label for="newUid">Enter New UID:</label>
       <input type="text" id="newUid" placeholder="New UID">
     </div>
     <div>
       <label for="newName">Enter New Name:</label>
       <input type="text" id="newName" placeholder="New Name">
     </div>
      <div>
       <label for="newPassword">Enter New Password:</label>
       <input type="text" id="newPassword" placeholder="New Password">
     </div>
     <br>
     <br>
     <label for="profilePicture" class="file-icon"> Upload Profile Picture <i class="fas fa-upload"></i> <!-- Replace this with your desired icon -->
     </label>
     <input type="file" id="profilePicture" accept="image/*" onchange="saveProfilePicture()">
     <div class="image-container" id="profileImageBox">
         <!-- Profile picture will be displayed here -->
     </div>
     <p id="profile-message" style="color: red;"></p>
   </form>
 </div>
</div>

<script type="module">
// Import fetchOptions from config.js - FIXED IMPORT PATHS
import {pythonURI, fetchOptions } from '{{site.baseurl}}/assets/api/config.js';
// Import functions from profile.js - FIXED IMPORT PATHS
import { putUpdate, postUpdate, deleteData, logoutUser, fetchUid, fetchName } from "{{site.baseurl}}/assets/api/profile.js";

// Function to update table with fetched data
function updateTableWithData(data) {
   const tableBody = document.getElementById('profileResult');
   if (!tableBody) return; // Guard against missing element
   
   tableBody.innerHTML = '';

   if (data.sections) {
       data.sections.forEach((section, index) => {
           const tr = document.createElement('tr');
           const themeCell = document.createElement('td');
           const nameCell = document.createElement('td');

           themeCell.textContent = section.theme;
           nameCell.textContent = section.name;

           const trashIcon = document.createElement('i');
           trashIcon.className = 'fas fa-trash-alt trash-icon';
           trashIcon.style.marginLeft = '10px';
           themeCell.appendChild(trashIcon);

           trashIcon.addEventListener('click', async function (event) {
               event.preventDefault();
               const URL = pythonURI + "/api/user/section";
               // Remove the row from the table
               tr.remove();

               const options = {
                   URL,
                   body: { sections: [section.theme] },
                   message: 'profile-message',
                   callback: () => console.log('Section deleted')
               };

               try {
                   await deleteData(options);
               } catch (error) {
                   console.error('Error deleting section:', error.message);
                   document.getElementById('profile-message').textContent = 'Error deleting section: ' + error.message;
               }
           });

           // Add year cell if it exists
           if (section.year) {
               const yearCell = document.createElement('td');
               yearCell.classList.add('editable');
               yearCell.innerHTML = `${section.year} <i class="fas fa-pencil-alt edit-icon" style="margin-left: 10px;"></i>`;

               // Make the year cell editable
               yearCell.addEventListener('click', function () {
                   const input = document.createElement('input');
                   input.type = 'text';
                   input.value = section.year;
                   input.className = 'edit-input';
                   yearCell.innerHTML = '';
                   yearCell.appendChild(input);

                   input.focus();

                   input.addEventListener('blur', async function () {
                       const newYear = input.value;
                       const URL = pythonURI + "/api/user/section";
                       const options = {
                           URL,
                           body: { section: { theme: section.theme, year: newYear } },
                           message: 'profile-message',
                           callback: () => yearCell.textContent = newYear
                       };

                       try {
                           await putUpdate(options);
                       } catch (error) {
                           console.error('Error updating year:', error.message);
                           document.getElementById('profile-message').textContent = 'Error updating year: ' + error.message;
                       }
                   });

                   input.addEventListener('keydown', function (event) {
                       if (event.key === 'Enter') {
                           input.blur();
                       }
                   });
               });
               
               tr.appendChild(yearCell);
           }

           tr.appendChild(themeCell);
           tr.appendChild(nameCell);
           tableBody.appendChild(tr);
       });
   }
}

// Function to fetch user profile data
async function fetchUserProfile() {
    const URL = pythonURI + "/api/id/pfp"; // Endpoint to fetch user profile data

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch user profile: ${response.status}`);
        }

        const profileData = await response.json();
        displayUserProfile(profileData);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        // Handle error display or fallback mechanism
    }
}

// Function to display user profile data
function displayUserProfile(profileData) {
    const profileImageBox = document.getElementById('profileImageBox');
    if (profileData.pfp) {
        const img = document.createElement('img');
        img.src = `data:image/jpeg;base64,${profileData.pfp}`;
        img.alt = 'Profile Picture';
        img.style.maxWidth = '200px';
        img.style.maxHeight = '200px';
        profileImageBox.innerHTML = ''; // Clear existing content
        profileImageBox.appendChild(img); // Append new image element
    } else {
        profileImageBox.innerHTML = '<p>No profile picture available.</p>';
    }

    // Display other profile information as needed
    // Example: Update HTML elements with profileData.username, profileData.email
}

// Function to save profile picture
window.saveProfilePicture = async function () {
    const fileInput = document.getElementById('profilePicture');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const profileImageBox = document.getElementById('profileImageBox');
            const img = document.createElement('img');
            img.src = reader.result;
            img.alt = 'Profile Picture';
            img.style.maxWidth = '200px';
            img.style.maxHeight = '200px';
            profileImageBox.innerHTML = '';
            profileImageBox.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    if (!file) return;

    try {
        const base64String = await convertToBase64(file);
        await sendProfilePicture(base64String);
        console.log('Profile picture uploaded successfully!');
    } catch (error) {
        console.error('Error uploading profile picture:', error.message);
        document.getElementById('profile-message').textContent = 'Error uploading profile picture: ' + error.message;
    }
}

// Function to convert file to base64
async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Remove the prefix part of the result
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Function to send profile picture to server
async function sendProfilePicture(base64String) {
   const URL = pythonURI + "/api/id/pfp"; // Adjust endpoint as needed

   // Create options object for PUT request
   const options = {
       URL,
       body: { pfp: base64String },
       message: 'profile-message', // Adjust the message area as needed
       callback: () => {
           console.log('Profile picture uploaded successfully!');
           document.getElementById('profile-message').textContent = 'Profile picture uploaded successfully!';
           document.getElementById('profile-message').style.color = 'green';
       }
   };

   try {
       await putUpdate(options);
   } catch (error) {
       console.error('Error uploading profile picture:', error.message);
       document.getElementById('profile-message').textContent = 'Error uploading profile picture: ' + error.message;
   }
}

// Function to update UI with new UID and change placeholder
window.updateUidField = function(newUid) {
  const uidInput = document.getElementById('newUid');
  uidInput.value = newUid;
  uidInput.placeholder = newUid;
}

// Function to update UI with new Name and change placeholder
window.updateNameField = function(newName) {
  const nameInput = document.getElementById('newName');
  nameInput.value = newName;
  nameInput.placeholder = newName;
}

// Function to change UID
window.changeUid = async function(uid) {
   if (uid) {
       const URL = pythonURI + "/api/user"; // Adjusted endpoint

       const options = {
           URL,
           body: { uid },
           message: 'profile-message', // Adjust the message area as needed
           callback: () => {
               alert("You updated your Github ID, so you will automatically be logged out. Be sure to remember your new github id to log in!");
               console.log('UID updated successfully!');
               window.updateUidField(uid);
               window.location.href = '/healthmedia/login'
           }
       };

       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating UID:', error.message);
           document.getElementById('profile-message').textContent = 'Error updating UID: ' + error.message;
       }
   }
}

window.changePassword = async function(password) {
   if (password) {
       const URL = pythonURI + "/api/user"; // Adjusted endpoint

       const options = {
           URL,
           body: { password },
           message: 'profile-message', // Adjust the message area as needed
           callback: () => {
               console.log('Password updated successfully!');
               alert("You updated your password, so you will automatically be logged out. Be sure to remember your password!");
               window.location.href = '/healthmedia/login'
           }
       };

       try {
           await putUpdate(options);
           await logoutUser();
       } catch (error) {
           console.error('Error updating password:', error.message);
           document.getElementById('profile-message').textContent = 'Error updating password: ' + error.message;
       }
   }
}

// Function to change Name
window.changeName = async function(name) {
   if (name) {
       const URL = pythonURI + "/api/user";
       const options = {
           URL,
           body: { name },
           message: 'profile-message',
           callback: () => {
               console.log('Name updated successfully!');
               window.updateNameField(name);
               document.getElementById('profile-message').textContent = 'Name updated successfully!';
               document.getElementById('profile-message').style.color = 'green';
           }
       };
       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating Name:', error.message);
           document.getElementById('profile-message').textContent = 'Error updating Name: ' + error.message;
       }
   }
}

// Event listener to trigger updateUid function when UID field is changed
document.getElementById('newUid').addEventListener('change', function() {
    const uid = this.value;
    if (uid.trim()) {
        window.changeUid(uid);
    }
});

// Event listener to trigger updateName function when Name field is changed
document.getElementById('newName').addEventListener('change', function() {
    const name = this.value;
    if (name.trim()) {
        window.changeName(name);
    }
});

document.getElementById('newPassword').addEventListener('change', function() {
    const password = this.value;
    if (password.trim()) {
        window.changePassword(password);
    }
});

// Function to set placeholders for UID and Name - UPDATED TO USE IMPORTED FUNCTIONS
window.setPlaceholders = async function() {
    const uidInput = document.getElementById('newUid');
    const nameInput = document.getElementById('newName');

    try {
        const uid = await fetchUid();
        const name = await fetchName();

        if (uid !== null) {
            uidInput.placeholder = uid;
        }
        if (name !== null) {
            nameInput.placeholder = name;
        }
    } catch (error) {
        console.error('Error setting placeholders:', error.message);
    }
};

// Call and initializeProfileSetup when DOM content is loaded
document.addEventListener('DOMContentLoaded', async function () {
    try {
        await fetchUserProfile(); // Fetch user profile data
        await setPlaceholders();
    } catch (error) {
        console.error('Initialization error:', error.message);
        // Handle initialization error gracefully
    }
});

</script>