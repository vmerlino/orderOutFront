export enum ShiftEnum {
    Manana = 0,
    Tarde = 1,
    Noche = 2
}

export namespace ShiftEnum {
    export function getShiftName(id: number): string {
        switch (id) {
            case ShiftEnum.Manana:
                return 'Mañana';
            case ShiftEnum.Tarde:
                return 'Tarde';
            case ShiftEnum.Noche:
                return 'Noche';
            default:
                return 'Turno desconocido';
        }
    }
}
