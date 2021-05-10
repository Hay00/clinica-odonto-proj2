export default class DateTransformer {
  static toBrl(date, showHour = false) {
    if (showHour) return new Date(date).toLocaleDateString('pt-br');
    return new Date(date).toLocaleDateString('pt-br');
  }

  static toSql(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
