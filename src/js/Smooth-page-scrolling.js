export default function smoothPageScrolling(container) {

    const { height: cardHeight } = container.firstElementChild.getBoundingClientRect();
        
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
   
}