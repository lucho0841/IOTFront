export class UtilArray {

  private constructor() {
  }

  static getElementByIndex<T>(list: T[], index: number): T {
    return list[index];
  }

  static addElement<T>(list: T[], element: T): void {
    list.push(element);
  }

  static deleteElement<T>(list: T[], element: T): void {
    const index: number = list.indexOf(element);
    list.splice(index, 1);
  }

  static updateElement<T>(list: T[], oldElement: T, newElement: T): void {
    const index: number = list.indexOf(oldElement);
    list[index] = newElement;
  }

  static refreshList<T>(list: T[]): T[] {
    return [...list];
  }
}
