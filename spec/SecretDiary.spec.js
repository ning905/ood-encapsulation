const SecretDiary = require("../src/SecretDiary");
const UI = require("../src/UI");

describe("Secret Diary", () => {
  let secretDiary;
  let interface;

  beforeEach(() => {
    secretDiary = new SecretDiary();
    interface = new UI();
  });

  it("sets the initial state as locked ", () => {
    //set up
    const expected = "locked";
    //execute
    const result = interface.getState(secretDiary);
    //verify
    expect(expected).toEqual(result);
  });

  it("can set the state as unlocked", () => {
    //set up
    const expected = "unlocked";
    //execute
    secretDiary.unlock();
    const result = interface.getState(secretDiary);
    //verify
    expect(expected).toEqual(result);
    //verify
  });

  it("can set the state back to locked", () => {
    //set up
    const expected = "locked";
    //execute
    secretDiary.unlock();
    secretDiary.lock();
    const result = interface.getState(secretDiary);
    //verify
    expect(expected).toEqual(result);
  });

  it("cannot add new entries when the state is locked", () => {
    //set up
    const expected = "Error. The diary is locked.";
    //execute
    const result = interface.addEntry(secretDiary, "new diary");
    //verify
    expect(expected).toEqual(result);
  });

  it("can add new entries when the state is unlocked", () => {
    //set up
    const expected = ["new diary"];
    //execute
    secretDiary.unlock();
    secretDiary.addEntry("new diary");
    const result = interface.getEntries(secretDiary);
    //verify
    expect(expected).toEqual(result);
  });

  it("cannot print entries when the state is locked", () => {
    //set up
    const expected = "Error. The diary is locked.";
    //execute
    secretDiary.unlock();
    secretDiary.addEntry("new diary");
    secretDiary.lock();
    const result = interface.getEntries(secretDiary);
    //verify
    expect(expected).toEqual(result);
  });
});
