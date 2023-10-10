export const upBtn = {
  createElement() {
    if (!document.querySelector('.up-btn')) {
      const upBtn = document.createElement('div');
      upBtn.innerHTML = `<a href="#search-form" class="up-btn"></a>`;
      document.body.append(upBtn);
    }
  },
  deleteElement() {
    if (document.querySelector('.up-btn')) {
      document.querySelector('.up-btn').parentNode.remove();
    }
  },
};
