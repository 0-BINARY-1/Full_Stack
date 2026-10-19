
"use strict";

const loadButton = document.getElementById("loadPosts");
const statusMessage = document.getElementById("status");
const postsContainer = document.getElementById("postsContainer");

async function loadPosts() {
  loadButton.disabled = true;
  statusMessage.textContent = "Loading posts...";
  postsContainer.replaceChildren();

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    // Check for HTTP errors such as 404 or 500.
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Convert the JSON response into JavaScript data.
    const posts = await response.json();

    // Display the first 10 posts.
    posts.slice(0, 10).forEach(function(post) {
      const article = document.createElement("article");
      article.className = "post-card";

      const heading = document.createElement("h2");
      heading.textContent = `${post.id}. ${post.title}`;

      const paragraph = document.createElement("p");
      paragraph.textContent = post.body;

      article.append(heading, paragraph);
      postsContainer.appendChild(article);
    });

    statusMessage.textContent =
      `Successfully loaded ${Math.min(posts.length, 10)} posts.`;
  } catch (error) {
    console.error("Failed to load posts:", error);
    statusMessage.textContent =
      "Could not load posts. Check your internet connection and try again.";
  } finally {
    loadButton.disabled = false;
  }
}

loadButton.addEventListener("click", loadPosts);
