class Dante {
  constructor() {
    //? Propiedades de Dante:
    this.img = new Image();
    this.img.src = "imagenes/al-moverse.png";

    this.x = 50;
    this.y = 540;

    this.w = 80;
    this.h = 80;

    this.velocidadSalto = 8;

    this.puedeSaltar = true;
    this.estasSaltando = false;
  }

  //dibujamos a Dante
  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  //para que salte
  jump = () => {
    if (this.y > 0 && this.puedeSaltar === true) {
        this.puedeSaltar = false
        this.estasSaltando = true
        setTimeout(() => {
            this.estasSaltando = false;
        },200)
    }
  };

  logicaSalto = () => {
    if (this.estasSaltando) {
        this.y -= this.velocidadSalto;
    } else if (this.y + this.h < 620) {
        this.y += this.velocidadSalto
    } else {
        this.y = 540
        this.puedeSaltar = true
    }
  }




}
