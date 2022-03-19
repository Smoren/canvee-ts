import {
  DrawableStorageInterface,
  DrawerConfigInterface,
  DrawerInterface, VectorArrayType,
  ViewConfigInterface,
  ViewConfigObservableInterface
} from "./types";

class Drawer implements DrawerInterface {
  protected _actorName: string = 'Drawer';
  protected _domElement: HTMLCanvasElement;
  protected _viewConfig: ViewConfigObservableInterface;
  protected _storage: DrawableStorageInterface;
  protected _context: CanvasRenderingContext2D;
  protected _resizeObserver: ResizeObserver;

  constructor({
    domElement,
    viewConfig,
    storage
  }: DrawerConfigInterface) {
    this._domElement = domElement;
    this._viewConfig = viewConfig;
    this._storage = storage;
    this._context = domElement.getContext('2d');

    // TODO перенести в storage, сделав его тоже observable
    this._storage.list.forEach(item => item.onViewChange(this._actorName, () => this.refresh()));

    this._initResizeObserver();
    this._initViewConfigObserver();
    this._initMouseEvents();

    this.refresh();
  }

  public draw(): void {
    this._context.save();
    this._context.translate(...this._viewConfig.offset);
    this._context.scale(...this._viewConfig.scale);
    this._storage.list.forEach(item => item.draw(this));
    this._context.restore();
  }

  public refresh(): void {
    if (this._domElement.width !== this.width) {
      this._domElement.width = this.width;
    }

    if (this._domElement.height !== this.height) {
      this._domElement.height = this.height;
    }

    console.log('refreshed');

    this.clear();
    this.draw();
  }

  clear(): void {
    this._context.clearRect(0, 0, this.width, this.height);
  }

  get viewConfig(): ViewConfigInterface {
    return this._viewConfig;
  }

  get context(): CanvasRenderingContext2D {
    return this._context;
  }

  get width(): number {
    return this._domElement.clientWidth;
  }

  get height(): number {
    return this._domElement.clientHeight;
  }

  protected _initResizeObserver(): void {
    this._resizeObserver = new ResizeObserver(() => this.refresh());
    this._resizeObserver.observe(this._domElement);
  }

  protected _initViewConfigObserver(): void {
    this._viewConfig.onViewChange(this._actorName, () => this.refresh());
  }

  protected _initMouseEvents(): void {
    // TODO тоже перенести куда-нибудь
    this._domElement.addEventListener('wheel', (event: WheelEvent) => {
      if (event.ctrlKey) {
        let scale = this._viewConfig.scale[0];
        scale += event.deltaY * -0.01;
        scale = Math.min(Math.max(.125, scale), 4);
        this._viewConfig.scale = [scale, scale];
        // TODO очевидно надо, чтобы место под курсором мыши оставалось неподвижным
      } else if (event.shiftKey) {
        this._viewConfig.offset[0] -= event.deltaY;
      } else {
        this._viewConfig.offset[1] -= event.deltaY;
      }

      event.preventDefault();
    });

    this._domElement.addEventListener('click', (event: PointerEvent) => {
      const coords1: VectorArrayType = [event.offsetX, event.offsetY];
      const coords2: VectorArrayType = this._viewConfig.transposeForward(coords1);
      const coords3: VectorArrayType = this._viewConfig.transposeBackward(coords2);
      console.log(coords1, coords2, coords3);
    });
  }
}

export default Drawer;
