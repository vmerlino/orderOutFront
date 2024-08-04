export enum FormaPagoEnum {
    Efectivo = 1,
    TarjetaCredito = 2,
    TarjetaDebito = 3,
    MercadoPago = 4
}

export namespace FormaPagoEnum {
    export function getPaymentMethodName(id: number): string {
        switch (id) {
            case FormaPagoEnum.Efectivo:
                return 'Efectivo';
            case FormaPagoEnum.TarjetaCredito:
                return 'Tarjeta de Crédito';
            case FormaPagoEnum.TarjetaDebito:
                return 'Tarjeta de Débito';
            case FormaPagoEnum.MercadoPago:
                return 'Mercado Pago';
            default:
                return 'Método de pago desconocido';
        }
    }
}
