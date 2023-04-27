class Dante {
  constructor() {
    this.img = new Image();
    this.img.src = "imagenes/al-moverse.png";

    this.x = 50;
    this.y = 560;

    this.w = 60;
    this.h = 60;

    this.velocidadSalto = 5;
    this.velocidad = 3;

    this.puedeSaltar = true;
    this.estasSaltando = false;
    this.vasHaciaDelante = false;
    this.vasHaciaAtras = false;
  }


  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };
  
  jump = () => {
    if (this.y > 0 && this.puedeSaltar === true) {
        this.puedeSaltar = false
        this.estasSaltando = true
        setTimeout(() => {
            this.estasSaltando = false;
        }, 300)
    }
  };

  logicaSalto = () => {
    if (this.estasSaltando) {
        this.y -= this.velocidadSalto;
    } else if (this.y + this.h < 620) {
        this.y += this.velocidadSalto
    } else {
        this.y = 560
        this.puedeSaltar = true
      this.img.src = "imagenes/al-moverse.png"
    }
  };

  imgSaltando = () => {
    if (this.y > 0 && this.puedeSaltar === true) {
      this.puedeSaltar = false
      this.estasSaltando = true
      this.img.src = "imagenes/cuando-salta.png"
      setTimeout(() => {
          this.estasSaltando = false;
      }, 300)
     }
  };

  haciaAtras = (paTras) => {
    this.vasHaciaAtras = paTras
  };

  haciaDelante = (haciaDelante) => {
    this.vasHaciaDelante = haciaDelante;
  };

  pasitoDFluido = () => {
    if (this.vasHaciaDelante === true) {
      this.x += this.velocidad
    }
  };

  pasitoIFluido = () => {
    if (this.vasHaciaAtras === true) {
      this.x -= this.velocidad
    }
  };    
    
  };

