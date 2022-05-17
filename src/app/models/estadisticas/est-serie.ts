export class EstSerie {
  public serie?: EstSerieItem[] = [];
}

export class EstSerieItem {
  public name?: string;
  public value?: number;

  constructor(name?: string, value?: number) {
    this.name = name;
    this.value = value;
  }
}