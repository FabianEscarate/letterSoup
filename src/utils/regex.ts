
const hasAnotherLetters = (space: string) => /[A-Z]|Á|É|Í|Ó|Ú|Ñ/i.test(space)
const isWhiteSpace = (groupToText: string) => /\s+/.test(groupToText)
const splitsGroupOfSpacesAndLetter = (line: string): RegExpMatchArray | null => {
  return line.match(/\s+|\S+/g)
}
const isFirstGroup = (index: number) => index === 0
const isLastGroup = (index: number, lengthGroup: number) =>
  index === (lengthGroup - 1)
const isBetweenGroup = (index: number, lengthGroup: number) =>
  0 < index && index < (lengthGroup - 1)
const regexByListGroup = (groups: RegExpMatchArray | string []) =>
  groups.reduce((regex, group, index, groups) => {

    if (isFirstGroup(index))
      regex += '(^'
    if (isWhiteSpace(group) && isBetweenGroup(index, groups.length))
      regex += `.{${group.length}}`
    else if (isWhiteSpace(group))
      regex += `.{1,${group.length}}`
    if (!isWhiteSpace(group))
      regex += `${group}`
    if (isLastGroup(index, groups.length))
      regex += '$)'

    return regex
  }, '')

const chunkListCharactersByCriterial = (groups: RegExpMatchArray) => {
  let chunked = []
  while (groups.length > 0) {
    const criterial = isWhiteSpace(groups[0]) ? 3 : 2
    chunked.push(groups.slice(0, criterial))
    groups.splice(0, groups.length <= criterial ? criterial : criterial - 1)
  }
  return chunked
}

const joinRegexStringWithPipe = (...stringRegex: string[]) =>
  stringRegex.join('|')

const generateRegexByGroupOfSpacesAndLetters = (groups: RegExpMatchArray) => {
  return new RegExp(
    joinRegexStringWithPipe(
      regexByListGroup(groups),
      ...chunkListCharactersByCriterial(groups).map(chunk => regexByListGroup(chunk))
    ),
    'gm'    
  )
}

export {
  hasAnotherLetters,
  isWhiteSpace,
  splitsGroupOfSpacesAndLetter,
  joinRegexStringWithPipe,
  chunkListCharactersByCriterial,
  generateRegexByGroupOfSpacesAndLetters
}