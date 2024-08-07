export enum OrderStatusEnum {
    Nuevo = 1,
    Confirmado = 2,
    Preparando = 3,
    Entregado = 4,
    Pagado = 5,
    Cancelado = 6
}
    export namespace OrderStatusEnum {
      export function getStatusName(id: number): string {
        switch (id) {
          case OrderStatusEnum.Nuevo:
            return 'Nuevo';
          case OrderStatusEnum.Confirmado:
            return 'Confirmado';
          case OrderStatusEnum.Preparando:
            return 'Preparando';
          case OrderStatusEnum.Entregado:
            return 'Entregado';
          case OrderStatusEnum.Pagado:
            return 'Pagado';
          case OrderStatusEnum.Cancelado:
            return 'Cancelado';
          default:
            return 'Estado desconocido';
        }
      }
  }
  