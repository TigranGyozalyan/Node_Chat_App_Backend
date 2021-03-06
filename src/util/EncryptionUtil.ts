/* eslint-disable no-bitwise,no-mixed-operators */
const utf8 = require('utf8');

class EncryptionUtil {
  public static encrypt(plainText: string): string {
    const encodedMsg = utf8.encode(plainText);

    let H0 = 0x67452301;
    let H1 = 0xEFCDAB89;
    let H2 = 0x98BADCFE;
    let H3 = 0x10325476;
    let H4 = 0xC3D2E1F0;

    const wordArray = EncryptionUtil.getWordBlocks(encodedMsg);

    wordArray.forEach((block) => {
      const word = [...block];

      const { rotateLeft } = EncryptionUtil;

      // Extend the sixteen 32-bit words into eighty 32-bit words
      for (let i = 16; i <= 79; i++) {
        word[i] = rotateLeft(word[i - 3] ^ word[i - 8] ^ word[i - 14] ^ word[i - 16], 1);
      }

      let A: number;
      let B: number;
      let C: number;
      let D: number;
      let E: number;

      A = H0;
      B = H1;
      C = H2;
      D = H3;
      E = H4;
      let temp;
      for (let i = 0; i <= 19; i++) {
        temp = (rotateLeft(A, 5) + ((B & C) | (~B & D)) + E + word[i] + 0x5A827999);
        E = D;
        D = C;
        C = rotateLeft(B, 30);
        B = A;
        A = temp;
      }
      for (let i = 20; i <= 39; i++) {
        temp = (rotateLeft(A, 5) + (B ^ C ^ D) + E + word[i] + 0x6ED9EBA1);
        E = D;
        D = C;
        C = rotateLeft(B, 30);
        B = A;
        A = temp;
      }
      for (let i = 40; i <= 59; i++) {
        temp = (rotateLeft(A, 5) + ((B & C) | (B & D) | (C & D)) + E + word[i] + 0x8F1BBCDC);
        E = D;
        D = C;
        C = rotateLeft(B, 30);
        B = A;
        A = temp;
      }
      for (let i = 60; i <= 79; i++) {
        temp = (rotateLeft(A, 5) + (B ^ C ^ D) + E + word[i] + 0xCA62C1D6);
        E = D;
        D = C;
        C = rotateLeft(B, 30);
        B = A;
        A = temp;
      }
      H0 += A;
      H1 += B;
      H2 += C;
      H3 += D;
      H4 += E;
    });


    return (
      EncryptionUtil.hexToString(H0 << 128)
        + EncryptionUtil.hexToString(H1 << 96)
        + EncryptionUtil.hexToString(H2 << 64)
        + EncryptionUtil.hexToString(H3 << 32)
        + EncryptionUtil.hexToString(H4)
    );
  }

  private static getWordBlocks(msg: string) {
    const wordArray = [];

    // Generate 32-bit big endian integers for all message substrings that have 4 length
    for (let i = 0; i < msg.length - 3; i += 4) {
      const j = (
        msg.charCodeAt(i) << 24
          | msg.charCodeAt(i + 1) << 16
          | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3));
      wordArray.push(j);
    }

    // Generate 32-bit integers for any leftover chars and append the bit '1'
    switch (msg.length % 4) {
      case 0:
        wordArray.push(0x080000000);
        break;
      case 1:
        wordArray.push(msg.charCodeAt(msg.length - 1) << 24 | 0x0800000);
        break;
      case 2:
        wordArray.push(
          msg.charCodeAt(msg.length - 2) << 24 | msg.charCodeAt(msg.length - 1) << 16 | 0x08000,
        );
        break;
      case 3:
        wordArray.push(
          msg.charCodeAt(msg.length - 3) << 24
            | msg.charCodeAt(msg.length - 2) << 16
            | msg.charCodeAt(msg.length - 1) << 8 | 0x80,
        );
        break;
      default:
        break;
    }

    // Append bits '0',
    // such that the resulting message length in bits is congruent to −64 ≡ 448 (mod 512)
    while ((wordArray.length % 16) !== 14) {
      wordArray.push(0);
    }

    // Javascript does not have 64 bit ints,
    // so the message length is bits is pushed as succesive two 32-bit ints
    wordArray.push(msg.length >>> 29);
    wordArray.push((msg.length << 3));

    // Split the word into arrays that contain 512-bit chunks i.e 16 32-bit words
    const blockArray = [];

    for (let blockStart = 0; blockStart < wordArray.length; blockStart += 16) {
      blockArray.push(wordArray.slice(blockStart, blockStart + 16));
    }

    return blockArray;
  }

  private static hexToString(value: number): string {
    // Default javascript integers are 32-bit signed numbers. Convert to unsigned with >>> operator
    return (value >>> 0).toString(16);
  }

  private static rotateLeft(value: number, shift: number): number {
    return (value << shift) | (value >>> (32 - shift));
  }
}

export default EncryptionUtil;
