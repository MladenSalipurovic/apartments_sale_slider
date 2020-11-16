$(document).ready(() => {
    const MAP_DEFINITIONS = [
        {
            width: 1110,
            height: 622,
            paths: [
                {
                    fill: "#85e5d3",
                    d: "M 495,233,595,204,595,259,495,285 Z",
                    index: 0,
                    data: {
                        name: "Name 1",
                        status: 'for-sale',
                    }
                },
                {
                    fill: "#a98eed",
                    d: "M 495,285,595,259,595,315,495,335 Z",
                    index: 1,
                    data: {
                        name: "Name 2",
                        status: 'reserved'
                    }
                },
                {
                    fill: "#85e5d3",
                    d: "M 495,335,595,315,595,370,495,385 Z",
                    index: 2,
                    data: {
                        name: "Name 3",
                        status: 'for-sale'
                    }
                },
                {
                    fill: "#db6551",
                    d: "M 495,385,595,370,595,423,495,433 Z",
                    index: 3,
                    data: {
                        name: "Name 4",
                        status: 'sold'
                    }
                },
                {
                    fill: "#f8bb11",
                    d: "M 495,433,595,423,595,475,495,483 Z",
                    index: 4,
                    data: {
                        name: "Name 5",
                        status: 'booked'
                    }
                },
            ]
        },
        {
            width: 1110,
            height: 622,
            paths: [
                {
                    fill: "#85e5d3",
                    d: "M 665,140,870,110,870,184,665,205 Z",
                    index: 0,
                    data: {
                        name: "Name 6",
                        status: 'for-sale',
                    }
                },
                {
                    fill: "#a98eed",
                    d: "M 870,185,665,208,665,280,870,265 Z",
                    index: 1,
                    data: {
                        name: "Name 7",
                        status: 'reserved'
                    }
                },
            ]
        },
        {
            width: 1110,
            height: 622,
            paths: [
                {
                    fill: "#85e5d3",
                    d: "M 475,243,705,195,705,259,475,300 Z",
                    index: 0,
                    data: {
                        name: "Name 8",
                        status: 'for-sale',
                    }
                },
                {
                    fill: "#f8bb11",
                    d: "M 475,301,705,260,705,320,475,355 Z",
                    index: 1,
                    data: {
                        name: "Name 9",
                        status: 'booked'
                    }
                },
            ]
        }
    ]
    /* Owl Slider integration */
    $('.owl-carousel').owlCarousel({
        onChange: removePopUp,
        center: true,
        items: 1,
        loop: false,
        nav: true,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        },
    });
    // Initialization of script

    function init() {
        renderDataPaths();
        const wrapper = document.querySelector('#svg-wrapper');
        wrapper.addEventListener('click', (event) => handleWrapperClick(event));
        renderDataPaths();
    } 
    // Handle click and register when it's clicked on path object
    function handleWrapperClick(event) {
        const {target} = event;
        
        switch (target.tagName) {
            case "path" : 
                createPopUp(event);
                break;
            default: 
                let popup = document.querySelector(".popup-box");
                popup && removePopUp();
                break;
        }
    }   
    /* Rendering ours hardcoded paths of our objects in svg holder */
    
    function renderDataPaths() {
        const sliderItems = document.querySelectorAll('.owl-item');

        sliderItems.forEach((item, index) => {
            const data = MAP_DEFINITIONS[index];

            if (!data) {
                return;
            }

            const { paths, width, height } = data;
            const node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            node.setAttribute("viewBox", `0 0 ${width} ${height}`);
            node.setAttribute("class", `svg`);

            paths.forEach((element) => {
                const { fill, d } = element;

                const pathNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathNode.setAttribute("d", d);
                pathNode.setAttribute("fill", fill);
                pathNode.setAttribute("class", "popup")
                pathNode.dataset.key = [index, element.index].join('-');

                node.appendChild(pathNode);
            });
            item.appendChild(node);
        });
    }
    /*  Creating box in DOM */
    // Removing popup if already exists

    function createPopUp(event) {
        removePopUp();
        const { offsetX, offsetY } = event;

        const wrapper = document.querySelector("#svg-wrapper");
        const node = document.createElement("div");
        node.setAttribute("class", "popup-box");
        node.style.left = `${offsetX + 50}px`;
        node.style.top = `${offsetY}px`;

        const closeBtn = document.createElement("div");
        closeBtn.setAttribute("id", "close");
        closeBtn.innerHTML = "&times";

        node.appendChild(closeBtn);
        wrapper.appendChild(node);

        const [parentIndex, pathIndex] = event.target.dataset.key.split('-');
        const mapDefinition = MAP_DEFINITIONS[parentIndex];
        const currentPath = mapDefinition.paths[pathIndex];

        populatePopUp(currentPath, wrapper);

        closeBtn.onclick = function () {
            removePopUp();
        };
    }

    /* Close button added, and also populate details should be added here */

    function populatePopUp(currentPath, wrapper) {
        const { name, status } = currentPath.data;

        const node = wrapper.querySelector('.popup-box');
        const nameLabel = document.createElement("span");
        nameLabel.setAttribute("id", "name");
        nameLabel.innerHTML = `Name: ${name}`;

        const statusLabel = document.createElement("span");
        statusLabel.setAttribute("id", "status");
        statusLabel.innerHTML = `Status: ${status}`;

        node.appendChild(nameLabel);
        node.appendChild(statusLabel);
    }

    /*  Removing the box with details from DOM */

    function removePopUp() {
        const box = document.querySelector('.popup-box');
        box && box.parentNode.removeChild(box);
    }

    init();
});
