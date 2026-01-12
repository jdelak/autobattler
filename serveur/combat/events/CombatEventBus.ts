type Listener<T = any> = (payload: T) => void;

export interface CombatEvent<T = any> {
  type: string;
  payload: T;
}

export class CombatEventBus {
  private listeners = new Map<string, Listener[]>();

  emit(event: CombatEvent) {
    const list = this.listeners.get(event.type);
    if (!list) return;
    for (const cb of list) cb(event.payload);
  }

  subscribe<T>(type: string, cb: Listener<T>) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)!.push(cb);
  }
}
