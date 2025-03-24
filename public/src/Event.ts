///<amd-module name="DS/SocialGlobeAPI/Core/Event"/>


abstract class Event {
  private events: Map<string, any[]>;

  constructor() {
    this.events = new Map<string, any[]>();
    this.dispatch = this.dispatch.bind(this);
  }

  addEventListener(name: string, handler: any) {
    if (!this.events.has(name))
      this.events.set(name, [] as any[]);
    this.events.get(name)?.push(handler);
  }

  protected dispatch(name: string, ...args: any[]) {
    this.events.get(name)?.forEach(handler => handler(...args));
  }

  removeListener(name: string, handler: any): boolean {
    const events = this.events.get(name);

    if (!events) return false;

    const idx = events.findIndex((h) => h === handler);

    if (idx === -1) return false;

    events.splice(idx, 1);

    return true;
  }

}

export default Event;
