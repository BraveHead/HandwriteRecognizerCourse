(function () {
    let input = document.querySelector("#input");
    let out = document.querySelector("#out");
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    function initProperties() {
        canvas.width = 20;
        canvas.height = 20;
         // document.body.appendChild(canvas);
    }

    const BASE_PATH = "photos";

   function loadImage(url) {
       return new Promise(((resolve, reject) => {
                   let img = new Image();
                   img.onload = function () {
                       resolve(img);
                   }
                   img.src= url;
            }));
   }


   async function getImageData() {
       initProperties();


       let allPhotoData = [];
       let allTargetData = [];
       for (let i =0;i < epd.photoUrls.length-99;i++){
           let img = await  loadImage(`${BASE_PATH}/${epd.photoUrls[i]}`);

           ctx.clearRect(0, 0, 20, 20);
           ctx.fillStyle = "#ffffff";
           ctx.fillRect(0,0,canvas.width, canvas.height)
           ctx.drawImage(img, 0, 0 );

           let photoImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let photoData = [];
            for (let pxIndex = 0; pxIndex < photoImageData.data.length; pxIndex += 4) {
                let r = photoImageData.data[pxIndex];
                let g = photoImageData.data[pxIndex + 1];
                let b = photoImageData.data[pxIndex + 2];
                let color = Math.round((r + g + b) / 3);
                photoData.push(color);
            }
            allPhotoData.push(photoData);
            allTargetData.push(Math.floor(i / 10));
       }
       input.value = JSON.stringify(allPhotoData);
       out.value = JSON.stringify(allTargetData);
   }

   function main() {
        getImageData();
   }

   main();

})();