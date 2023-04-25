class Pincho {
    constructor(posicY, posicX, img) {
        this.img = new Image();
        this.img.src = img;

        this.x = posicX;
        this.y = posicY;

        this.w = 30;
        this.h = 40;

        this.velocidad = 3;
    }

    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      };

    pinchosSeMueven = () => {
        this.x -= this.velocidad;
    };  
}