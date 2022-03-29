/**
 * @author Rui Valente
 */

class CircularBuffer {
  /**
   * Create a new buffer
   * @params n -> Size of the buffer
   *
   * By default the size of the buffer will be 0, in this way we prevent errors like non-parameter calls -> CircularBuffer()
   */
  constructor (n = 0) {
    if (!this.isValid(n)) throw new NotValidBuffer()
    else {
      this.memory = new Array(n)
      this.head = 0
      this.tail = 0
      this.isFull = false
    }
  }

  write() {
    throw new Error('Remove this statement and implement this function');
  }

  read() {
    throw new Error('Remove this statement and implement this function');
  }

  forceWrite() {
    throw new Error('Remove this statement and implement this function');
  }

  clear() {
    throw new Error('Remove this statement and implement this function');
  }
}

export default CircularBuffer;

export class BufferFullError extends Error {
  constructor() {
    throw new Error('Remove this statement and implement this function');
  }
}

export class BufferEmptyError extends Error {
  constructor() {
    throw new Error('Remove this statement and implement this function');
export class NotValidBuffer extends Error {
  constructor () {
    throw new Error('Remove this statement and implement this function')
  }
}
