import { Modality } from './modality';

import { PositionModality } from './position-modality';
import { ColorModality } from './color-modality';
import { ShapeModality } from './shape-modality';

const Modalities: Array<typeof Modality> = [
  PositionModality,
  ColorModality,
  ShapeModality
];

export default Modalities;
