class PubSub {
    deps = new Map();
    getDep(type) {
        let dep = this.deps.get(type);
        if (!Array.isArray(dep)) {
            dep = [];
            this.deps.set(type, dep);
        }
        return dep;
    }
    subscribe(type, fn) {
        const dep = this.getDep(type);
        dep.push(fn);
    }
    dispatch(type, ...payload) {
        const dep = this.getDep(type);
        dep.forEach(fn => fn.apply(null, payload));
    }
    unSubscribe(type, fn) {
        const dep = this.getDep(type);
        this.deps.set(type, dep.filter(item => item !== fn));
    }
}
const pubsub = new PubSub();
export default pubsub;
