export class HomeEstadisticasDto {
  public realizados?: number = 0;
	public noRealizados?: number = 0;
	public total?: number = 0; 
  public serie?: any = [
    {
      name: 'Realizados',
      value: 0
    },
    {
      name: 'No realizados',
      value: 0
    }
  ];
}