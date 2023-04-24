class Pincho {
    constructor(posicY, posicX) {
        this.img = new Image();
        this.img.src = "imagenes/pincho.png"

        this.x = posicX;
        this.y = posicY;

        this.w = 30;
        this.h = 40;

        this.velocidad = 2.6;
    }

    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      };

    pinchosSeMueven = () => {
        this.x -= this.velocidad;
    };  
}