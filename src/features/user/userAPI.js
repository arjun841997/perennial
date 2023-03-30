export function getUsers() {
  return fetch("https://randomuser.me/api/?results=60")
  .then((response) => response.json())
  .then((data) => {return data});
}

