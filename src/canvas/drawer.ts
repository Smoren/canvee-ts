interface DrawableConfig {
  zIndex: number;
}

class Drawable {
  config: DrawableConfig;

  constructor(config: DrawableConfig) {
    this.config = config;
  }

  draw(drawer: Drawer): void {

  }
}

class Drawer {
  domElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  figures: Drawable[];
  resizeObserver: ResizeObserver;

  constructor(domElement: HTMLCanvasElement) {
    this.domElement = domElement;
    this.context = domElement.getContext('2d');
    this.figures = [];
    this.resizeObserver = new ResizeObserver(() => this.refresh());
    this.resizeObserver.observe(this.domElement);
    this.refresh();
  }

  addFigure(figure: Drawable): void {
    this.figures.push(figure);
  }

  draw(): void {
    this.figures
      .sort((lhs, rhs) => lhs.config.zIndex - rhs.config.zIndex)
      .forEach(figure => figure.draw(this));
  }

  refresh(): void {
    if (this.domElement.width !== this.width) {
      this.domElement.width = this.width;
    }

    if (this.domElement.height !== this.height) {
      this.domElement.height = this.height;
    }

    this.draw();

    console.log(this.width, this.height);
  }

  get width(): number {
    return this.domElement.clientWidth;
  }

  get height(): number {
    return this.domElement.clientHeight;
  }
}

export default Drawer;
export { Drawable, DrawableConfig };
