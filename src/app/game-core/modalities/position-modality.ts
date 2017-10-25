import { Modality } from './modality';

export class PositionModality extends Modality {

  static label = "Position";
  id = "position";

  mapParamToValue(param) {
    return param.toString();
  }

}
