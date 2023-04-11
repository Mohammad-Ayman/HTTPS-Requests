//Global Variables
const ulElement = document.querySelector("ul");
const postTemplate = document.querySelector("template");
const fetchButton = document.querySelector("#available-posts button");
const addPostButton = document.querySelector("#new-post button");
const deleteButton = postTemplate.content.querySelector("button");

let posts = [];

// HTTPS requests functions
const getPosts = async () => {
  posts = [];
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
    // data.forEach((element) => {
    //   posts.push(element);
    // });
    posts = [...data]; ///////// Look Here!
  } catch (error) {
    console.log(error);
  }
  updateUi();
};

const postElement = async (title, body) => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: posts.length + 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const postHandler = (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("content").value.trim();
  if (title != "" && body != "") {
    console.log(posts.length);
    console.log("Posting a new item");
    postElement(title, body);
  } else alert("Please fill the Title and Content");
};

const deletePost = async (postId) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "DELETE",
      }
    );
  } catch (error) {
    console.log(error);
    alert("An error occurred while deleting the post.");
  }
};

const deleteHandler = (e) => {
  if (e.target.tagName === "BUTTON") {
    const postToBeDeleted = e.target.closest("li");
    console.log(postToBeDeleted);
    const postId = postToBeDeleted.querySelector("h5").textContent;
    console.log(`Deleting post number: ${postId}`);
    postToBeDeleted.remove();
    deletePost(postId);
  }
};

//Global functions
const createPostElement = (post) => {
  const { title, body, id } = post; ///////// Look Here!
  const newLi = document.importNode(postTemplate.content, true);
  newLi.querySelector("h2").textContent = title;
  newLi.querySelector("p").textContent = body;
  newLi.querySelector("h5").textContent = id;
  return newLi;
};

const updateUi = () => {
  ulElement.innerHTML = "";
  console.log(posts);
  posts.forEach((post) => {
    const newLi = createPostElement(post);
    ulElement.append(newLi);
  });
};

//EventListeners
fetchButton.addEventListener("click", getPosts);
ulElement.addEventListener("click", deleteHandler);
addPostButton.addEventListener("click", postHandler);
