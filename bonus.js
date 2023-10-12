import fetch from "node-fetch";
import { getData } from "./main.js";

async function getCommentsByPostId(postId) {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );

  const comments = await response.json();

  return comments;
}

async function addComments(users, username) {
  const user = users.find((user) => {
    return user.name == username;
  });

  user.posts = await Promise.all(
    user.posts.map(async (post) => {
      const comms = await getCommentsByPostId(post.id);
      post.comments = await comms;

      return post;
    })
  );

  return users;
}

let users = await getData();

users = await addComments(users, "Ervin Howell");

// Просмотр результата
// 
// console.log(users[1]);
// console.log(users[1].posts);

// Для подробного просмотра с комментариями
users[1].posts.map((post) => console.log(post.comments));
