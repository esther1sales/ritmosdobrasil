
// const hoverLinks = document.querySelectorAll('.hover-effect');
// const contentFrame = document.querySelector('.content-frame');
// const defaultContentSrc = 'default-content.html';  

// let activeLink = null;  
// let clickedContentSrc = null;  

// hoverLinks.forEach(link => {
//     const originalImageSrc = link.querySelector('img').src;
//     const hoverImageSrc = link.getAttribute('data-hover-image');
//     const hoverLinkContentSrc = link.getAttribute('data-content');

//     link.addEventListener('mouseenter', () => {
//         if (activeLink !== link) {
//             link.querySelector('img').src = hoverImageSrc;
//             contentFrame.src = hoverLinkContentSrc;
//         }
//     });

//     link.addEventListener('mouseleave', () => {
//         if (activeLink !== link) {
//             link.querySelector('img').src = originalImageSrc;
//             contentFrame.src = clickedContentSrc || defaultContentSrc;
//         }
//     });

//     link.addEventListener('click', (event) => {
//         event.preventDefault();  

//         if (activeLink === link) {
            
//             activeLink = null;
//             clickedContentSrc = null;
//             contentFrame.src = defaultContentSrc;  
//             link.querySelector('img').src = originalImageSrc;  
//         } else {
            
//             hoverLinks.forEach(otherLink => {
//                 if (otherLink !== link) {
//                     otherLink.querySelector('img').src = otherLink.getAttribute('data-original-image');
//                 }
//             });

            
//             activeLink = link;
//             clickedContentSrc = link.getAttribute('href');  
//             contentFrame.src = clickedContentSrc;  

            
//             link.querySelector('img').src = hoverImageSrc;
//         }
//     });
// });

// hoverLinks.forEach(link => {
//     link.setAttribute('data-original-image', link.querySelector('img').src);
// });

const hoverLinks = document.querySelectorAll('.hover-effect');
const contentFrame = document.querySelector('.content-frame');
const defaultContentSrc = 'default-content.html';  // Store the default content source

let activeLink = null;  // Variable to track the currently active (clicked) link
let clickedContentSrc = null;  // Track the content source triggered by the click
let hoverContentSrc = null;  // Track the content source triggered by hover

hoverLinks.forEach(link => {
    const originalImageSrc = link.querySelector('img').src;
    const hoverImageSrc = link.getAttribute('data-hover-image');
    const hoverLinkContentSrc = link.getAttribute('data-content');

    link.addEventListener('mouseenter', () => {
        hoverContentSrc = hoverLinkContentSrc;
        if (activeLink !== link) {
            link.querySelector('img').src = hoverImageSrc;
            contentFrame.src = hoverLinkContentSrc;
        }
    });

    link.addEventListener('mouseleave', () => {
        if (activeLink !== link) {
            link.querySelector('img').src = originalImageSrc;
            contentFrame.src = clickedContentSrc || defaultContentSrc;
        } else if (activeLink === link && clickedContentSrc === null) {
            // If the link was reset by a second click, revert to default on hover out
            link.querySelector('img').src = originalImageSrc;  // Revert the image to its original state
            contentFrame.src = defaultContentSrc;
            activeLink = null;  // Reset activeLink to ensure hover functionality is restored
        }
    });

    link.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent the default link behavior

        if (activeLink === link) {
            // If the same link is clicked again, revert to hover content
            clickedContentSrc = null;
            contentFrame.src = hoverContentSrc;  // Show the hover content
        } else {
            // Reset all other images to their original state
            hoverLinks.forEach(otherLink => {
                if (otherLink !== link) {
                    otherLink.querySelector('img').src = otherLink.getAttribute('data-original-image');
                }
            });

            // Set this link as active
            activeLink = link;
            clickedContentSrc = link.getAttribute('href');  // Track the clicked content source
            contentFrame.src = clickedContentSrc;  // Load the clicked content in the iframe

            // Keep the image in the hover state after click
            link.querySelector('img').src = hoverImageSrc;
        }
    });
});

// Initialize the original image source for all links
hoverLinks.forEach(link => {
    link.setAttribute('data-original-image', link.querySelector('img').src);
});

