import {
  DrawerInterface,
  DrawerConfigInterface,
  DrawableStorageInterface,
  VectorArrayType,
  ViewConfigObservableInterface, PositionalDrawableInterface,
} from './types';
import imageCacheHelper from './helpers/image-cache-helper';
import { isPositional } from './helpers/type-helpers';
import { createVector } from './structs/vector';

/**
 * Canvas drawer
 * @public
 */
export default class Drawer implements DrawerInterface {
  /**
   * Name of class to use as subscriber name in observable logic
   */
  protected _subscriberName: string = 'Drawer';
  /**
   * Canvas DOM element
   */
  protected _domElement: HTMLCanvasElement;
  /**
   * View config
   */
  protected _viewConfig: ViewConfigObservableInterface;
  /**
   * Drawable objects storage
   */
  protected _storage: DrawableStorageInterface;
  /**
   * Canvas drawing context
   */
  protected _context: CanvasRenderingContext2D;
  /**
   * Resize observer object
   */
  protected _resizeObserver: ResizeObserver;

  /**
   * Drawer constructor
   * @param domElement - canvas DOM element
   * @param viewConfig - view config
   * @param storage - drawable objects storage
   */
  constructor({
    domElement,
    viewConfig,
    storage,
  }: DrawerConfigInterface) {
    this._domElement = domElement;
    this._viewConfig = viewConfig;
    this._storage = storage;
    this._context = domElement.getContext('2d');

    this._initResizeObserver();
    this._initViewConfigObserver();
    this._initStorageObserver();
    this._initImageCacheObserver();
    this._initMouseEvents();

    this.refresh();
  }

  /**
   * {@inheritDoc DrawerInterface.draw}
   */
  public draw(): void {
    this._context.save();
    this._context.translate(...this._viewConfig.offset);
    this._context.scale(...this._viewConfig.scale);
    this._storage.list.forEach((item) => {
      if (item.config.visible) {
        item.draw(this);
      }
    });
    this._context.restore();
  }

  /**
   * {@inheritDoc DrawerInterface.refresh}
   */
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

  /**
   * {@inheritDoc DrawerInterface.clear}
   */
  public clear(): void {
    this._context.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Returns bounds of canvas frame
   */
  public getBounds(): [VectorArrayType, VectorArrayType] {
    return [
      this._viewConfig.transposeForward([0, 0]),
      this._viewConfig.transposeForward([this.width, this.height]),
    ];
  }

  /**
   * View config getter
   */
  get viewConfig(): ViewConfigObservableInterface {
    return this._viewConfig;
  }

  /**
   * Canvas context getter
   */
  get context(): CanvasRenderingContext2D {
    return this._context;
  }

  /**
   * Canvas width getter
   */
  get width(): number {
    return this._domElement.clientWidth;
  }

  /**
   * Canvas height getter
   */
  get height(): number {
    return this._domElement.clientHeight;
  }

  /**
   * Initiates canvas resize observer
   */
  protected _initResizeObserver(): void {
    this._resizeObserver = new ResizeObserver(() => this.refresh());
    this._resizeObserver.observe(this._domElement);
  }

  /**
   * Initiates view config observer
   */
  protected _initViewConfigObserver(): void {
    this._viewConfig.onViewChange(this._subscriberName, () => this.refresh());
  }

  /**
   * Initiates storage observer
   */
  protected _initStorageObserver(): void {
    this._storage.onViewChange(this._subscriberName, () => this.refresh());
  }

  /**
   * Initiates image cache observer
   */
  protected _initImageCacheObserver(): void {
    imageCacheHelper.subscribe(this._subscriberName, () => {
      this.refresh();
    });
  }

  /**
   * Initiates mouse events observer
   */
  protected _initMouseEvents(): void {
    // TODO перенести куда-нибудь

    let currentElement: PositionalDrawableInterface | null = null;
    const getCurrentElement = (coords: VectorArrayType): PositionalDrawableInterface | null => {
      const transposedCoords: VectorArrayType = this._viewConfig.transposeForward(coords);

      const list = this._storage.list;
      for (let i=list.length-1; i>=0; --i) {
        const item = list[i];
        // TODO maybe only visible?
        if (isPositional(item) && (item as PositionalDrawableInterface).boundIncludes(transposedCoords)) {
          return (item as PositionalDrawableInterface);
        }
      }

      return null;
    };

    const DEVIATION = 8;
    const getNearBoundElement = (coords: VectorArrayType): PositionalDrawableInterface | null => {
      const transposedCoords: VectorArrayType = this._viewConfig.transposeForward(coords);

      const list = this._storage.list;
      for (let i=list.length-1; i>=0; --i) {
        const item = list[i];
        // TODO maybe only visible?
        if (
          isPositional(item)
          && (item as PositionalDrawableInterface)
            .isNearBoundEdge(transposedCoords, DEVIATION / this._viewConfig.scale[0])
        ) {
          return (item as PositionalDrawableInterface);
        }
      }

      return null;
    };

    this._domElement.addEventListener('wheel', (event: WheelEvent) => {
      if (event.ctrlKey) {
        let scale = this._viewConfig.scale[0];
        scale += event.deltaY * -0.002;
        scale = Math.min(Math.max(0.001, scale), 100);
        this._viewConfig.updateScaleInCursorContext([scale, scale], [event.offsetX, event.offsetY]);
      } else if (event.shiftKey) {
        this._viewConfig.offset[0] -= event.deltaY;
      } else {
        this._viewConfig.offset[1] -= event.deltaY;
      }

      event.preventDefault();
    });

    this._domElement.addEventListener('click', (event: PointerEvent) => {
      event.preventDefault();
    });

    let mouseDownCoords: VectorArrayType | null = null;

    this._domElement.addEventListener('mousedown', (event: MouseEvent) => {
      if (currentElement === null) {
        currentElement = getCurrentElement([event.offsetX, event.offsetY]);
      }

      mouseDownCoords = [event.offsetX, event.offsetY];
      this._domElement.style.cursor = 'grabbing';
    });

    this._domElement.addEventListener('mousemove', (event: MouseEvent) => {
      const mouseMoveCoords: VectorArrayType = [event.offsetX, event.offsetY];

      if (mouseDownCoords === null) {
        if (getNearBoundElement(mouseMoveCoords) !== null) {
          this._domElement.style.cursor = 'crosshair';
        } else if (getCurrentElement(mouseMoveCoords) !== null) {
          this._domElement.style.cursor = 'pointer';
        } else {
          this._domElement.style.cursor = 'default';
        }

        return;
      }

      const difference: VectorArrayType = [
        mouseDownCoords[0]-mouseMoveCoords[0],
        mouseDownCoords[1]-mouseMoveCoords[1],
      ];

      if (currentElement !== null) {
        currentElement.config.position = createVector(currentElement.config.position)
          .sub(createVector(difference).div(this._viewConfig.scale[0]))
          .toArray();
      } else {
        this._viewConfig.offset = createVector(this._viewConfig.offset)
          .sub(createVector(difference))
          .toArray();
      }

      mouseDownCoords = mouseMoveCoords;
    });

    this._domElement.addEventListener('mouseup', () => {
      if (currentElement !== null) {
        console.log(currentElement);
      }

      currentElement = null;
      mouseDownCoords = null;
      this._domElement.style.cursor = 'default';
    });
  }
}
