// src/utils/timeConverter.js
export default class TimeConverter {
    constructor(timestamp13) {
      this.timestamp13 = Number(timestamp13);
      this.date = new Date(Number(timestamp13));
    }
  
    GMT8() {
      return this.date.toString();
    }
    toUTC() {
      return this.date.toUTCString();
    }
  
    toISO8601() {
      return this.date.toISOString();
    }
  
    toRFC2822() {
      return this.date.toUTCString();
    }
  
    toTimestamp10() {
      return Math.floor(this.date.getTime() / 1000);
    }
  
    toTimestamp13() {
      return this.date.getTime();
    }
  
    toHex() {
      return this.date.getTime().toString(16);
    }
  
    toAllFormats() {
      const result = [
        { label: "本地时间", value: this.GMT8() },
        { label: "UTC时间", value: this.toUTC() },
        { label: "ISO 8601", value: this.toISO8601() },
        { label: "RFC 2822", value: this.toRFC2822() },
        { label: "Timestamp（毫秒）", value:  this.timestamp13},
        { label: "Unix timestamp（秒）", value: this.toTimestamp10() },
        { label: "Timestamp HEX", value: this.toHex() }
      ]
      console.log(result)
      return result;
    }
  }
  