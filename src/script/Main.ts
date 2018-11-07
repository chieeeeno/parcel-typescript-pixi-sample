import * as PIXI from 'pixi.js'



class PixiBase{
  protected app: PIXI.Application;
  protected loader: PIXI.loaders.Loader;
  protected window: {w:number, h: number};


  constructor(w: number, h: number, opt:PIXI.IApplicationOptions, parentId:string, replace:boolean = false){
    this.app = new PIXI.Application(w, h, opt);

    const elem:HTMLElement = document.getElementById(parentId);
    if(replace == false){
      elem.appendChild(this.app.view);
    }else{
      elem.parentNode.replaceChild(this.app.view, elem);
      this.app.view.id = parentId;
    }

    this.window = {w: w, h: h};

    this.loader = new PIXI.loaders.Loader();

    this.app.ticker.add(()=> {
      this.animate();
    });
  }

  protected setSpirte(sprite:PIXI.Sprite, x:number, y:number): void{
    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;
    this.app.stage.addChild(sprite);
  }

  protected animate():void{

  }
}

const animalImages = [
  './images/animal_neko.png',
  './images/animal_kuma.png',
  './images/animal_panda.png',
]

class Main extends PixiBase{
  private stage: PIXI.Container;

  constructor() {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const texture = PIXI.Texture.fromImage('./images/animal_neko.png');
    const animalTextures = animalImages.map((image)=>{
      return PIXI.Texture.fromImage(image);
    })
    // texture.width = 100
    const cat = new PIXI.MovieClip(animalTextures);
    cat.gotoAndStop(2)
    cat.scale.x = 0.5
    cat.scale.y = 0.5
    console.log(ww,wh)
    super(ww, wh, {transparent : true, antialias: true}, "canvas", true);

    this.stage = new PIXI.Container();

    this.app.stage.addChild(this.stage);
    this.setSpirte(cat,100,100)



  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Main()


})
