export class DataGenerator {
  randomString(len: number = 10, type: string = 'letters'): string {
    const normalizedType = type.toLowerCase();
    const min = normalizedType === 'letters' ? 10 : 0;
    const max = normalizedType === 'number' ? 10 : 62;
    let result = '';

    for (let i = 0; i < len; i++) {
      const index = (Math.random() * (max - min) + min) << 0;
      const offset = index > 9 ? (index < 36 ? 55 : 61) : 48;
      result += String.fromCharCode(index + offset);
    }

    return result;
  }
}
