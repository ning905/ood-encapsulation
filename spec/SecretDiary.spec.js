const SecretDiary = require("../src/SecretDiary");
const Entry = require("../src/Entry");

describe("Secret Diary", () => {
  let secretDiary;

  beforeEach(() => {
    secretDiary = new SecretDiary();
  });

  it("sets the initial state as locked ", () => {
    //set up
    const expected = "locked";
    //execute
    const result = secretDiary.lock.getStatus();
    //verify
    expect(expected).toEqual(result);
  });

  it("can set the state as unlocked", () => {
    //set up
    secretDiary.lock.unlock();
    const expected = "unlocked";
    //execute
    const result = secretDiary.lock.getStatus();
    //verify
    expect(expected).toEqual(result);
    //verify
  });

  it("can set the state back to locked", () => {
    //set up
    secretDiary.lock.unlock();
    secretDiary.lock.lock();
    const expected = "locked";
    //execute
    const result = secretDiary.lock.getStatus();
    //verify
    expect(expected).toEqual(result);
  });

  it("cannot add new entries when the state is locked", () => {
    //set up
    const newEntry = new Entry("Create a secret diary");
    const expected = "Error. The diary is locked.";
    //execute
    const result = secretDiary.addEntry(newEntry);
    //verify
    expect(expected).toEqual(result);
  });

  it("can add new entries when the state is unlocked", () => {
    //set up
    const newEntry = new Entry("2022-06-15", "Created a secret diary");
    secretDiary.lock.unlock();
    secretDiary.addEntry(newEntry);
    const expected = [
      { date: "2022-06-15", content: "Created a secret diary" },
    ];
    //execute
    const result = secretDiary.getEntries();
    //verify
    expect(expected.date).toEqual(result.date);
    expect(expected.content).toEqual(result.content);
  });

  it("cannot print entries when the state is locked", () => {
    //set up
    const newEntry = new Entry("2022-06-15", "Created a secret diary");
    secretDiary.lock.unlock();
    secretDiary.addEntry(newEntry);
    secretDiary.lock.lock();
    const expected = "Error. The diary is locked.";
    //execute
    const result = secretDiary.getEntries();
    //verify
    expect(expected).toEqual(result);
  });

  it("can find entries by date when the state is unlocked", () => {
    //set up
    const newEntry1 = new Entry(
      "2022-06-14",
      "Wrote code for managing cohorts"
    );
    const newEntry2 = new Entry(
      "2022-06-15",
      "Created a test code secret diary"
    );
    const newEntry3 = new Entry("2022-06-15", "Created a secret diary");
    secretDiary.lock.unlock();
    secretDiary.addEntry(newEntry1);
    secretDiary.addEntry(newEntry2);
    secretDiary.addEntry(newEntry3);
    const date = "2022-06-15";

    const expected = [
      { date: "2022-06-15", content: "Created a test code secret diary" },
      { date: "2022-06-15", content: "Created a secret diary" },
    ];
    //execute
    const result = secretDiary.getEntriesByDate(date);
    //verify
    expect(expected.date).toEqual(result.date);
    expect(expected.content).toEqual(result.content);
  });

  it("cannot find entries by date when the state is locked", () => {
    //set up
    const newEntry1 = new Entry(
      "2022-06-14",
      "Wrote code for managing cohorts"
    );
    const newEntry2 = new Entry(
      "2022-06-15",
      "Created a test code secret diary"
    );
    const newEntry3 = new Entry("2022-06-15", "Created a secret diary");
    secretDiary.lock.unlock();
    secretDiary.addEntry(newEntry1);
    secretDiary.addEntry(newEntry2);
    secretDiary.addEntry(newEntry3);
    const date = "2022-06-15";
    secretDiary.lock.lock();

    const expected = "Error. The diary is locked.";
    //execute
    const result = secretDiary.getEntriesByDate(date);
    //verify
    expect(expected).toEqual(result);
  });

  it("can return error message if no entries is found on the given date", () => {
    //set up
    const newEntry1 = new Entry(
      "2022-06-14",
      "Wrote code for managing cohorts"
    );
    const newEntry2 = new Entry(
      "2022-06-15",
      "Created a test code secret diary"
    );
    const newEntry3 = new Entry("2022-06-15", "Created a secret diary");
    secretDiary.lock.unlock();
    secretDiary.addEntry(newEntry1);
    secretDiary.addEntry(newEntry2);
    secretDiary.addEntry(newEntry3);
    const date = "2022-06-13";

    const expected = "No entries on this date.";
    //execute
    const result = secretDiary.getEntriesByDate(date);
    //verify
    expect(expected).toEqual(result);
  });
});
