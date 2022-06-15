class SecretDiary {
  constructor() {
    this.isLocked = true;
    this.entries = [];
  }

  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }

  getEntries() {
    return this.entries;
  }

  addEntry(entry) {
    this.entries.push(entry);
  }
}

module.exports = SecretDiary;
