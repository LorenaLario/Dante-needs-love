class Corazon {
    constructor (posicY, posicX) {
        this.img = new Image();
        this.img.src = "imagenes/corazon-primer-nivel.png"

        this.x = posicX;
        this.y = posicY;

        this.w = 70;
        this.h = 40;

        this.velocidad = 2.3;
    }

    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    corazonesSeMueven = () => {
        this.x -= this.velocidad;
    }
}