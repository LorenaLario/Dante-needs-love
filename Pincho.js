class Pincho {
    constructor(posicY, posicX) {
        this.img = new Image();
        this.img.src = "imagenes/pincho.png"

        this.x = posicX;
        this.y = posicY;

        this.w = 60;
        this.h = 100;

        this.speed = 1.5;
    }

    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      };
}