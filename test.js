const axios = require("axios");

let getposts = async () => {
  let { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  console.log();
};
getposts();

const posts = [
  { title: "post1", age: "19", author: "Sunny" },
  { title: "post2", age: "25", author: "Vivek" },
];

function getPost() {
  setTimeout(() => {
    posts.forEach((post) => console.log(post.title));
  }, 2000);
}

function createPost(post) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let error = true;
      if (post.title && post.age && post.author) {
        posts.push(post);
        error = false;
      }
      if (error) {
        rej("Error: Something went wrong!!");
      } else {
        res();
      }
    }, 3000);
  });
}

// async function callfunction(){
//   let create = await createPost({title:"post3",age:"24",author:"Dolphin"});
//   console.log(create);
//   if(create){
//       getPost();
//   }
// }

// callfunction();

createPost({ title: "post3", age: "24", author: "Dolphin" })
  .then(getPost)
  .catch((err) => console.log(err));
