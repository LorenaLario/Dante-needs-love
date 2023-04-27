class Rayito {
    constructor(posicX, img) {
        this.img = new Image();
        this.img.src = img;

        this.x = posicX;
        this.y = 0;

        this.w = 18;
        this.h = 20;

        this.velocidad = 3;
    }

    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    };

    rayitosCaen = () => {
        this.y += this.velocidad;
    };

    rayitosCaen2 = () => {
        this.y += this.velocidad * 1.7;
    };
};
