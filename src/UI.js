class UI {
  constructor() {}

  getState(diary) {
    if (diary.isLocked) {
      return "locked";
    } else {
      return "unlocked";
    }
  }

  getEntries(diary) {
    if (diary.isLocked) {
      return "Error. The diary is locked.";
    }
    return diary.getEntries();
  }

  addEntry(diary, entry) {
    if (diary.isLocked) {
      return "Error. The diary is locked.";
    }
    diary.addEntry(entry);
  }
}

module.exports = UI;
