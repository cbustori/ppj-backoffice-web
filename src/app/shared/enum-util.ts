export class EnumUtil {
    static getEnum(enumType: any, value: string): any {
        for (const enumMember in enumType) {
            if (enumMember === value) {
                return enumMember;
            }
        }
    }
}
