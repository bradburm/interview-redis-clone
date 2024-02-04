class Redis {
  constructor() {
    this.data = new Map();
  }

  process(commandString) {
    const [command, ...args] = commandString.split(" ");
    switch (command) {
      case "get":
        return this.#get(...args);
      case "set":
        return this.#set(...args);
      case "del":
        return this.#del(...args);
    }
  }

  #get(key) {
    return this.data.get(key);
  }

  #set(key, value) {
    this.data.set(key, value);
    return "OK";
  }

  #del(key) {
    const val = this.data.get(key);
    this.data.delete(key);
    return val;
  }
}

const redis = new Redis();
["get nonexisting", 'set key "hello"', "get key", "del key"].forEach((testcase) => {
  console.log(redis.process(testcase));
});
