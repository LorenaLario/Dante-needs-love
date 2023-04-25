class Corazon {
    constructor (posicY, posicX, img) {
        this.img = new Image();
        this.img.src = img;

        this.x = posicX;
        this.y = posicY;

        this.w = 70;
        this.h = 40;

        this.velocidad = 6;
    }

    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    corazonesSeMueven = () => {
        this.x -= this.velocidad;
    }
}