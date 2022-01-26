// write your code here
document.addEventListener('DOMContentLoaded', () => {
  fetchInitialImage();
  listenForHeartClick();
  listenForCommentFormSubmission();
})

const fetchInitialImage = () => {
  fetch('http://localhost:3000/images/1')
  .then(response => response.json())
  .then(json => {
    addImageToDom(json)
  })
}

const addImageToDom = jsonImage => {
  // Add title to DOM from server response (jsonImage)
  const titleElement = document.getElementById('card-title');
  titleElement.textContent = jsonImage.title;

  // Add likes to DOM from server response
  const likesElement = document.getElementById('like-count');
  likesElement.textContent = `${jsonImage.likes} likes`;

  // Add image to DOM from server response
  const imageElement = document.getElementById('card-image');
  imageElement.src = jsonImage.image;
}

const listenForHeartClick = () => {
  const currentLikes = document.getElementById('like-count');
  const likeButton = document.getElementById('like-button');
  likeButton.addEventListener('click', () => {
    const currentLikesString = currentLikes.textContent;
    // "14 likes"
    const currentLikesStringArray = currentLikesString.split(' ');
    // ["14", "likes"]
    const currentLikesNumberAsAString = currentLikesStringArray[0];
    // "14"
    const currentLikesNumber = parseInt(currentLikesNumberAsAString);
    // 14
    currentLikes.textContent = `${currentLikesNumber + 1} likes`
  })
}

const listenForCommentFormSubmission = () => {
  const form = document.getElementById('comment-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const comment = e.target[0].value;
    const commentList = document.getElementById('comments-list');
    const listItem = document.createElement('li');
    listItem.textContent = comment;
    commentList.appendChild(listItem);
  })
}