export abstract class ValueObject<T = unknown> {
  protected _propValue: T;

  constructor(prop: T) {
    this._propValue = Object.freeze(prop);
  }

  get value() {
    return this._propValue;
  }

  equals(obj: this) {
    if (!obj) return false;

    if (!obj.value) return false;

    if (obj.constructor.name !== this.constructor.name) return false;

    if (!this.value) return false;

    if (obj.value !== this.value) return false;

    if (typeof obj.value === 'object' && typeof this.value === 'object') {
      const keysThis = Object.keys(this.value);

      const keysObj = Object.keys(obj.value);
      if (keysThis.length !== keysThis.length) return false;

      return keysThis.every(key => keysObj.includes(key));
    }

    return true;
  }

  toString() {
    if (!this.value) return '';

    switch (typeof this.value) {
      case 'object':
        return JSON.stringify(this.value);

      case 'boolean':
        return this.value === true ? 'true' : 'false';

      default:
        try {
          return this.value.toString();
        } catch (error) {
          return this.value + '';
        }
    }
  }
}
