/**
 * @file Generator tekstowych danych testowych niezależny od Playwrighta i UI.
 */

/** Generuje losowe ciągi znaków do przygotowania danych w testach. */
export class DataGenerator {
  /**
   * Losuje litery, cyfry albo znaki alfanumeryczne przez Math.random.
   * Nazwa trybu nie rozróżnia wielkości liter. Metoda nie waliduje długości
   * ani nie zapewnia unikalności wygenerowanej wartości.
   *
   * @param len - Liczba znaków, domyślnie 10; podaj nieujemną liczbę całkowitą.
   * @param type - `letters` wybiera litery A–Z i a–z, `number` cyfry 0–9;
   * każda inna nazwa wybiera litery i cyfry. Domyślnie `letters`.
   * @returns Ciąg znaków, również dla cyfr; długość 0 daje pusty string.
   * @example
   * const generator = new DataGenerator();
   * const suffix = generator.randomString(12, 'letters');
   * const digits = generator.randomString(6, 'number');
   */
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
