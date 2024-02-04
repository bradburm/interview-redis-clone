const kvCommands = [
  {
    name: "get",
    handler: (data, [key]) => data.get(key),
  },
  {
    name: "set",
    handler: (data, [key, value]) => {
      data.set(key, value);
      return "OK";
    },
  },
  {
    name: "del",
    handler: (data, [key]) => {
      const val = data.get(key);
      data.delete(key);
      return val;
    },
  },
];

class Redis {
  #data;
  #commands;

  constructor({ commands }) {
    this.#data = new Map();
    this.#commands = commands;
  }

  process(commandString) {
    const [commandName, ...args] = commandString.split(" ");
    const command = this.#commands.find(
      ({ name }) => name === commandName.toLowerCase()
    );
    if (!command) {
      throw new Error(`Unexpected command: ${commandName}`);
    }
    return command.handler(this.#data, args);
  }

  #get(key) {
    return this.#data.get(key);
  }

  #set(key, value) {
    this.#data.set(key, value);
    return "OK";
  }

  #del(key) {
    const val = this.#data.get(key);
    this.data.delete(key);
    return val;
  }
}

const redis = new Redis({
  commands: [...kvCommands],
});

["get nonexisting", 'set key "hello"', "get key", "del key"]
  .map((testcase) => redis.process(testcase))
  .forEach((val) => console.log(val));
