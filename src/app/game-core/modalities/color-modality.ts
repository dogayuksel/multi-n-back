import { Modality } from './modality';

export class ColorModality extends Modality {

  static label = "Color";
  id = 'color';

  static color = {
    0: "#d11",
    1: "#1d1",
    2: "#11d",
    3: "#d1d",
  };

  mapParamToValue(param) {
    return ColorModality.color[param];
  }

}
