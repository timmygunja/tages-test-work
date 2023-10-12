import fetch from "node-fetch";

export async function getData() {
  let response;

  // get all posts
  response = await fetch("http://jsonplaceholder.typicode.com/posts");
  let posts = await response.json();

  // get all users
  response = await fetch("http://jsonplaceholder.typicode.com/users");
  let users = await response.json();

  users = users.map((user) => {
    // delete username field
    delete user.username;

    // change address field
    user.address =
      user.address?.city +
      ", " +
      user.address?.street +
      ", " +
      user.address?.suite;

    // delete phone field
    delete user.phone;

    // change website field
    user.website = "https://" + user.website;

    // change company field
    user.company = user.company?.name;

    // add posts field
    user.posts = posts.filter((post) => post.userId == user.id);

    // modify posts
    user.posts.map((post) => {
      // delete userId field
      delete post.userId;

      // add title_crop field to posts
      post.title_crop = post.title.slice(0, 20) + "...";

      // В целом, json - это неупорядоченная коллекция свойств,
      // но если это так важно из задания, то вот сомнительное решение)
      // change places between title_crop and body
      let temporary = post.body;
      delete post.body;
      post.body = temporary;
    });

    return user;
  });

  return users;
}

const result = await getData();

// Просмотр результата
console.log(result);

// Для подробного просмотра с постами
// result.map((u) => console.log(u));

// ! Закомментировать вывод перед запуском
// bonus.js для чистой консоли !
