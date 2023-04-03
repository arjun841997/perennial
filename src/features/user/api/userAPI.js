export function getUsers() {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/?results=60`)
  .then((response) => response.json())
  .then((data) => {return data});
}

