export class Modality {

  static label: string;
  static depthOptions: Array<number>;
  id: string;
  modalityDepth: number = 4;
  value: number | null = null;

  setValue(param: number): void {
    this.value = param;
  }

  getValue(): number | null {
    return this.value;
  }

  mapParamToValue(param: number): string {
    throw new Error("Child class should implement");
  }

}
