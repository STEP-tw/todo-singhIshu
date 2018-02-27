class MockFs {
  constructor() {
    this.files = {};
  }
  readFileSync(filePath){
    if (!this.existsSync(filePath))
      throw Error;
    return this.files[filePath];
  }
  writeFileSync(filePath,contents){
    this.files[filePath] = contents;
  }
  existsSync(filePath){
    return Object.keys(this.files).includes(filePath);
  }
}



module.exports = MockFs;
