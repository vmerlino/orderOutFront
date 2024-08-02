export enum OrderStatusEnum {
    Nuevo = 1,
    Preparando = 2,
    Entregado = 3,
    Pagado = 4
}
    export namespace OrderStatusEnum {
      export function getStatusName(id: number): string {
        switch (id) {
          case OrderStatusEnum.Nuevo:
            return 'Nuevo';
          case OrderStatusEnum.Preparando:
            return 'Preparando';
          case OrderStatusEnum.Entregado:
            return 'Entregado';
          case OrderStatusEnum.Pagado:
            return 'Pagado';
          default:
            return 'Estado desconocido';
        }
      }
  }
  