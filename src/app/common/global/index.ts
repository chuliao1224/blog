import typeFun from '../type';

export default class Global {

  static data: Record<string, any> = {};

  static getData(key?: string) {
    if (!key) {
      return this.data[key];
    }
    return this.data;
  }

  static setData(key: string | object, value: any) {
    if (typeof key === 'string') {
      this.data[key] = value;
      return true;
    }

    if (typeFun(key) === 'object') {
      this.data = Object.assign(this.data, key);
      return true;
    }
    return false;
  }

}
