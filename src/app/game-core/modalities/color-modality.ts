import { Modality } from './modality';

export class ColorModality extends Modality {

  static label = "Color";
  static depthOptions = [1, 4, 16];
  id = 'color';

  static color = {
    0: "#d11",
    1: "#1d1",
    2: "#1dd",
    3: "#d1d",
  };

  mapParamToValue(param) {
    return ColorModality.color[param];
  }

}
