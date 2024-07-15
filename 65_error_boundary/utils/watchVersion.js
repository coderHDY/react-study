class UpdateTip {
  lastVersion = "";
  updatedCb = [() => console.log("updated")];
  constructor() {
    this.lastVersion = this.getCurrentVersion();
  }
  getCurrentVersion = () => {
    const script = document.querySelector("script[src^=\\/static]");
    const src = script.getAttribute("src");
    const reg = /main\.(.*?)\.js/i;
    const version = src.match(reg)[1];
    return version;
  };
  fetchVersion = async () => {
    try {
      const ans = await (await fetch("/")).text();
      const reg = /src=['"]\/static\/js\/main\.(.*?)\.js['"]/;
      const newVersion = ans.match(reg)[1];
      return newVersion;
    } catch {
      return this.lastVersion;
    }
  };
  versionCompare = async () => {
    const newVersion = await this.fetchVersion();
    return newVersion === this.lastVersion;
  };
  checkVersion = () => {
    setInterval(async () => {
      const updated = (await this.versionCompare()) !== true;
      if (updated) {
        this.updatedCb.forEach((cb) => cb());
      }
    }, 10000);
  };
  addCallBack = (cb) => {
    if (typeof cb === "function") {
      this.updatedCb.push(cb);
    }
  };
}

const versionChecker = new UpdateTip();

export default versionChecker;
