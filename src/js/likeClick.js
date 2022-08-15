export const lisnerPhotoLikes = () => {
  document.querySelectorAll('.photo-card').forEach(el => {
    const like = el.querySelector('.photo-card__like');
    like.addEventListener('click', likeClick);
  });
};

function likeClick() {
  const likeNumber = this.parentNode.querySelector('#likes');

  if (this.classList.contains('active')) {
    this.classList.remove('active');
    likeNumber.innerHTML = likeNumber.innerHTML++ - 1;
  } else {
    this.classList.add('active');
    likeNumber.innerHTML = likeNumber.innerHTML++ + 1;
  }
}
