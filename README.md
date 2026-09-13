# LetterSoup (Algorithm)

Algorithm for make letterSoups (sopa de letras)

## Install

```bash 
  npm i lettersoup
```

## Import/Examples

```javascript
import { WordSearch } from 'lettersoup';

const listWords = ['Doctor', 'Dog', 'Banana', 'Apple', 'Orange'];

const wordSearch = new WordSearch(listWords);

const puzzle = wordSearch.getPuzzle();
const words = wordSearch.getWords();

console.log('Puzzle:', puzzle);
console.log('Words:', words);
```


## API Reference

### `new WordSearch(words: string[])`

Creates a new instance of WordSearch.

-   `words` (string[]): A list of words to be included in the letter soup.

### `getPuzzle(): string[][]`

Returns the generated letter soup as a 2D array of strings.

### `getWords(): string[]`

Returns the list of words that were included in the letter soup.

### `getRemainingWords(): string[]`

Returns the list of words that could not be placed in the letter soup.

## Board Expansion

The board is sized from the longest word plus a margin gap of `1` cell on every side, so every word geometrically fits in the puzzle. However, the placement heuristic walks the board coordinates in random order and tries to place a single word per visited coordinate, so a coordinate may lose its chance before the space around it is opened by other words.

To fix that, the generator re-walks **all** coordinates over and over (re-shuffled on every pass) until a full pass places nothing — a fixed point. Only then, if words are still pending, the board is expanded by one extra row and one extra column and the process restarts.

- Expansions are capped at `MAX_EXPANSIONS = 3` to avoid growing forever when a word truly cannot fit.
- Words that still cannot be placed after the limit are returned by `getRemainingWords()`.
- The puzzle is not filled with random letters: blank cells remain as separators.

## Run Locally

Clone repository

```bash
  git clone https://github.com/FabianEscarate/letterSoup
```

Go to the project directory

```bash
  cd letterSoup
```

use current node version

```bash
  nvm use
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Contributing

Contributions are always welcome!

Please adhere to this project's `code of conduct`.

### Pull Request Process

1.  Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2.  Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters.
3.  Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent.
4.  You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Bug Reports

Please include the following information when reporting a bug:

-   A clear and descriptive title.
-   A detailed description of the bug.
-   Steps to reproduce the bug.
-   The expected behavior.
-   The actual behavior.
-   Screenshots or videos if possible.


## Authors

- [@Fabian Escarate](https://www.github.com/FabianEscarate)

## License

[ISC](https://choosealicense.com/licenses/isc/)
