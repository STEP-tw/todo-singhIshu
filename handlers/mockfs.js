class MockFs {
  constructor() {
    this.files = {};
  }
  readFileSync(filePath,encoding){
    if (!this.existsSync(filePath))
      return 'file not found';
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
