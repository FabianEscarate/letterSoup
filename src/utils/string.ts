
declare interface String {
  capitalize:() => string
}

function capitalize(this: String): string {
  return `${this.charAt(0).toUpperCase()}${this.substring(1)}`
}

String.prototype.capitalize = capitalize
