//Global Variables
const postsList = document.querySelector("ul");
const postTemplate = document.querySelector("template");
const fetchButton = document.querySelector("#available-posts button");
const addPostButton = document.querySelector("#new-post button");
const deleteButton = postTemplate.content.querySelector("button");

let posts = [];
let fetchedPosts = [];

// HTTPS requests functions
const getPosts = async () => {
  fetchedPosts = [];
  try {
    /* Using Fetch()
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    // method: "GET",
    // const data = await res.json();
    */

    /*
    Using Axios library
    */
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
      {}
    );
    console.log(res);
    const data = res.data;
    console.log("Fetched Data: ", data);
    // data.forEach((element) => {
    //   posts.push(element);
    // });
    fetchedPosts = [...data]; ///////// Look Here!
    posts = [...data, ...posts];
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
  updateUi();
};

// const postElement = async (title, body) => {
//   try {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
//       method: "POST",
//       body: JSON.stringify({
//         title,
//         body,
//         userId: posts.length + 1,
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     });
//     const data = await res.json();
//     return data; // return the created post object
//   } catch (error) {
//     console.log(error);
//   }
// };

/*
  Using Axios library
*/
const postElement = async (title, body) => {
  try {
    const post = {
      title,
      body,
      userId: posts.length + 1,
    };
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      post
    );
    console.log("Post response", res);
    const data = await res.data;
    console.log("Post response data", data);
    return data; // return the created post object
  } catch (error) {
    console.log(error);
  }
};

// const deletePost = async (postId) => {
//   try {
//     const res = await fetch(
//       `https://jsonplaceholder.typicode.com/posts/${postId}`,
//       {
//         method: "DELETE",
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     alert("An error occurred while deleting the post.");
//   }
// };

/*
  Using Axios library
*/
const deletePost = async (postId) => {
  try {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  } catch (error) {
    console.log(error);
    alert("An error occurred while deleting the post.");
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
  postsList.innerHTML = "";
  console.log("Displayed posts: ", posts);
  posts.forEach((post) => {
    const newLi = createPostElement(post);
    postsList.append(newLi);
  });
};

//Handler Functions
const postHandler = async (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value.trim();
  let body = document.getElementById("content").value.trim();
  if (title != "" && body != "") {
    console.log("Posts array length: ", posts.length + 1);
    console.log("Posting a new item");
    const createdPost = await postElement(title, body); // wait for the created post object
    posts.push(createdPost); // push the created post object to the posts array
    const newLi = createPostElement(createdPost);
    postsList.append(newLi);
    document.querySelector("form").reset();
  } else alert("Please fill the Title and Content");
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

//EventListeners
fetchButton.addEventListener("click", getPosts);
postsList.addEventListener("click", deleteHandler);
addPostButton.addEventListener("click", postHandler);
