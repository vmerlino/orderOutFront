export enum ShiftEnum {
    Manana = 1,
    Tarde = 2,
    Noche = 3
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
