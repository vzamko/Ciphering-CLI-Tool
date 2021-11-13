# Intro

Ciphering CLI Tool is tool that let you encode or decode text use next ciphers:

- [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
- [Atbash cipher](https://en.wikipedia.org/wiki/Atbash)
- [ROT-8 as variation of ROT-13](https://en.wikipedia.org/wiki/ROT13)

# How to use

CLI tool accepts 3 options (short alias and full name):

1. `-c`, `--config`: config for ciphers Config is a string with pattern `{XY(-)}n`, where:

- `X` is a cipher mark:
  - `C` is for Caesar cipher (with shift 1)
  - `A` is for Atbash cipher
  - `R` is for ROT-8 cipher
- `Y` is an encode or decode flag (mandatory for Caesar ciphers and ROT-8 ciphers and not required for Atbash ciphers)
  - `1` is for encoding
  - `0` is for decoding

2. `-i`, `--input`: a path to input file **(optional)**
3. `-o`, `--output`: a path to output file **(optional)**
   > **For example:** config "C1-C1-R0-A" means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

### Usage example:

---

**Basic usage:** node index.js -c "C1" -i "input.txt" -o "output.txt"

> **input.txt:** This is secret. Message about "_" symbol!
>
> **output.txt:** Uijt jt tfdsfu. Nfttbhf bcpvu "_" tzncpm!

**Use yarn:** yarn ciphering -c "C1-C1-A-R1" -i "input.txt" -o "output.txt"

> **input.txt:** This is secret. Message about "_" symbol!
>
> **output.txt:** Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!

**Use npm:** npm run ciphering -- -c "C0-A-R0" -i "input.txt" -o "output.txt"

> **input.txt:** This is secret. Message about "_" symbol!
>
> **output.txt:** Zlka ka aoqboz. Goaasmo sreyz "_" augreh!
