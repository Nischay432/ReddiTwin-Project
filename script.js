// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get references to various elements in the HTML
    const menuToggle = document.getElementById("menu-toggle");
    const content = document.querySelector('.content');
    const menu = document.querySelector(".menu");
    const menuStyle = window.getComputedStyle(menu);

    // Function to adjust content margin based on menu visibility and window width
    function adjustContentMargin() {
        if (menuStyle.display === "block" && window.innerWidth > 900) {
            content.classList.add('with-menu-margin');
        } else {
            content.classList.remove('with-menu-margin');
        }
    }

    // Initial adjustment of content margin on page load
    adjustContentMargin();

    // Attach click event listener to the menu toggle button
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            // Toggle the menu's display property between "block" and "none"
            menu.style.display = (menuStyle.display === "none") ? "block" : "none";
            // Adjust content margin based on menu visibility
            adjustContentMargin();
        });
    }

    // Listen for window resize and adjust content margin accordingly
    window.addEventListener('resize', adjustContentMargin);

    // Reddit Clone functionality

    // Post management functionality
    const addPostButton = document.getElementById("add-post-button");
    const postPopup = document.getElementById("post-popup");
    const closePopupButton = document.getElementById("close-popup");
    const createPostButton = document.getElementById("create-post-button");
    const cancelPostButton = document.getElementById("cancel-post-button");
    const blogPostsContainer = document.getElementById("blog-posts");

    // Show post popup when "Add Post" button is clicked
    addPostButton.addEventListener("click", () => {
        postPopup.style.display = "block";
    });

    // Hide post popup when "Close" button is clicked
    closePopupButton.addEventListener("click", () => {
        postPopup.style.display = "none";
    });

    // Hide post popup and clear inputs when "Cancel" button is clicked
    cancelPostButton.addEventListener("click", () => {
        postPopup.style.display = "none";
        clearInputs();
    });

    // Create a new post when "Create Post" button is clicked
    createPostButton.addEventListener("click", () => {
        // Get input values for post creation
        const heading = document.getElementById("post-heading").value;
        const imageUrl = document.getElementById("post-image-url").value;
        const content = document.getElementById("post-content").value;

        // Check if all required fields have values
        if (heading && imageUrl && content) {
            // Call the createPost function
            createPost(heading, imageUrl, content);
            // Hide the post popup and clear inputs
            postPopup.style.display = "none";
            clearInputs();
        }
    });

    // Function to create a new post element
    function createPost(heading, imageUrl, content) {
        // Create a new post element
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        // Set the HTML content of the post element
        postElement.innerHTML = `
            <!-- Post header with author info and time -->
            <div class="post-header">
                <div class="author-icon"><img src="Resources/Genshin-logo.jpg" alt="👤"><div class="post-author">${heading}</div></div>
                <div class="post-time">
                    <button class="edit-button"></button>
                    <button class="delete-button"></button>
                </div>
            </div>
            <!-- Post content and image -->
            <p class="post-description">${content}</p>
            <div class="post-image">
                <img src="${imageUrl}" alt="post image">
            </div>
            <!-- Buttons for voting, commenting, and sharing -->
            <div class="post-buttons">
                <button class="rounded-button">Vote</button>
                <button class="rounded-button">Comment</button>
                <button class="rounded-button">Share</button>
            </div>
        `;

        // Get references to edit and delete buttons within the post element
        const editButton = postElement.querySelector(".edit-button");
        const deleteButton = postElement.querySelector(".delete-button");

        // Attach click event listener to the edit button
        editButton.addEventListener("click", () => {
            // Call the editPost function when the edit button is clicked
            editPost(postElement);
        });

        // Attach click event listener to the delete button
        deleteButton.addEventListener("click", () => {
            // Remove the entire post element from the DOM when delete button is clicked
            postElement.remove();
        });

        // Append the post element to the blog posts container
        blogPostsContainer.appendChild(postElement);
    }

    // Function to edit a post
    function editPost(postElement) {
        // Prompt the user to edit various post details
        const heading = prompt("Edit heading:", postElement.querySelector(".post-author").innerText);
        const imageUrl = prompt("Edit image URL:", postElement.querySelector(".post-image img").src);
        const content = prompt("Edit content:", postElement.querySelector(".post-description").innerText);

        // Update the post element with the edited values if input is not canceled
        if (heading !== null && imageUrl !== null && content !== null) {
            postElement.querySelector(".post-author").innerText = heading;
            postElement.querySelector(".post-image img").src = imageUrl;
            postElement.querySelector(".post-description").innerText = content;
        }
    }

    // Function to clear input values
    function clearInputs() {
        document.getElementById("post-heading").value = "";
        document.getElementById("post-image-url").value = "";
        document.getElementById("post-content").value = "";
    }
});
