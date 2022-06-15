class Entry {
  constructor(date, content) {
    this.date = date;
    this.content = content;
  }

  getDate() {
    return this.date;
  }

  setDate(date) {
    this.date = date;
  }

  getContent() {
    return this.content;
  }

  setContent(content) {
    this.content = content;
  }
}

class Lock {
  constructor() {
    this.status = "locked";
  }

  getStatus() {
    return this.status;
  }

  lock() {
    this.status = "locked";
  }

  unlock() {
    this.status = "unlocked";
  }

  isLocked() {
    if (this.status === "locked") {
      return true;
    }
    return false;
  }
}

class Diary {
  constructor() {
    this.entries = [];
  }

  getEntries() {
    return this.entries;
  }

  addEntry(entry) {
    this.entries.push(entry);
  }

  getEntriesByDate(date) {
    const found = this.entries.filter((entry) => entry.getDate() === date);
    if (found.length > 0) {
      return found;
    }
    return "No entries on this date.";
  }

  getEntriesByContent(content) {
    const found = this.entries.filter(
      (entry) => entry.getContent() === content
    );
    if (found.length > 0) {
      return found;
    }
    return "No such content found.";
  }
}

class SecretDiary {
  constructor() {
    this.lock = new Lock();
    this.diary = new Diary();
  }

  getEntries() {
    if (this.lock.isLocked()) {
      return "Error. The diary is locked.";
    }
    return this.diary.getEntries();
  }

  addEntry(entry) {
    if (this.lock.isLocked()) {
      return "Error. The diary is locked.";
    }
    this.diary.addEntry(entry);
  }

  getEntriesByDate(date) {
    if (this.lock.isLocked()) {
      return "Error. The diary is locked.";
    }
    return this.diary.getEntriesByDate(date);
  }

  getEntriesByContent(content) {
    if (this.lock.isLocked()) {
      return "Error. The diary is locked.";
    }
    return this.diary.getEntriesByContent(content);
  }
}

module.exports = SecretDiary;

const secretDiary = new SecretDiary();
const entry = new Entry("2022-06-15", "Created a secret diary");
console.log(secretDiary.addEntry(entry));
console.log(secretDiary.getEntries());
console.log(secretDiary.diary);
