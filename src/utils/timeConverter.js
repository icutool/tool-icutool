// src/utils/timeConverter.js
export default class TimeConverter {
    constructor(timestamp13) {
      this.date = new Date(timestamp13);
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
      return [
        { label: "本地时间", value: '1' },
        { label: "UTC时间", value: '2' },
        { label: "JS时间", value: '3' },
        { label: "ISO 8601", value: '4' },
        { label: "RFC 2822", value: '5' },
        { label: "Timestamp（毫秒）", value: '6' },
        { label: "Unix timestamp（秒）", value: '7' },
        { label: "Timestamp HEX", value: '8' }
      ]
    }
  }
  