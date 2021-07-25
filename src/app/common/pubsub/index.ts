const pubsub = "pubsub";

export default class PubSub {

  static id = 0;
  static listen = {};

  static genPubSubKey() {
    PubSub.id += 1;
    return `${pubsub}-${PubSub.id}`;
  }


  static publish(subject: string, ...args) {
    const listeners = this.listen[subject] || [];
    listeners.forEach((handler: any) => {
      handler(...args);
    });
  }

  static subscribe(subject: string, handler: any) {
    if (!handler) {
      return null;
    }

    this.listen[subject] = this.listen[subject] || [];
    handler.__pubsubKey = this.genPubSubKey();
    this.listen[subject].push(handler);
    return handler.__pubsubKey;
  }

  static unSubscribe(subject: string, pubsubKey: string) {
    if (!pubsubKey) {
      this.listen[subject] = null;
    } else {
      const listeners = this.listen[subject] || [];
      this.listen[subject] = listeners.filter((handler: any) => pubsubKey !== handler.__pubsubKey);
    }
  }
}
