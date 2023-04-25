class Rayito {
    constructor(posicX) {
        this.img = new Image();
        this.img.src ="imagenes/rayito.png";

        this.x = posicX;
        this.y = 0;

        this.w = 40;
        this.h = 40;

        this.velocidad = 3.3
    }

    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    rayitosCaen = () => {
        this.y += this.velocidad;
    };  
}
