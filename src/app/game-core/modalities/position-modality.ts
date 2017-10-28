import { Modality } from './modality';

export class PositionModality extends Modality {

  static label = "Position";
  static depthOptions = [1, 4, 16];
  id = "position";

  mapParamToValue(param) {
    return param.toString();
  }

}
