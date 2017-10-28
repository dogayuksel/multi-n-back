import { Modality } from './modality';

export class ShapeModality extends Modality {

  static label = "Shape";
  static depthOptions = [1, 4];
  id = 'shape';

  static iconName = {
    0: "home",
    1: "language",
    2: "casino",
    3: "person",
  };

  mapParamToValue(param) {
    return ShapeModality.iconName[param];
  }

}
