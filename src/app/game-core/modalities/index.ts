import { Modality } from './modality';

import { PositionModality } from './position-modality';
import { ColorModality } from './color-modality';

const Modalities: Array<typeof Modality> = [
  PositionModality,
  ColorModality
];

export default Modalities;
