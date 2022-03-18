import { BaseDrawableConfigInterface, DrawableInterface, DrawerInterface, LinkedDataType } from "../types";

export default abstract class Drawable implements DrawableInterface {
  config: BaseDrawableConfigInterface;
  data: LinkedDataType;

  protected constructor(config: BaseDrawableConfigInterface, data: LinkedDataType | null = null) {
    this.config = config;
    this.data = data;
  }

  abstract draw(drawer: DrawerInterface): void;
}
