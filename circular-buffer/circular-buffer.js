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

  /**
   * Gets the next item on the buffer
   * @params i -> index on the buffer
   *
   */
  next (i) {
    var next = i + 1
    //If it is the last element, start from the bottom
    if (next === this.memory.length) {
      return 0
    }
    return next
  }

  /**
   * Writes the value on the next index of the buffer
   * @params value -> value to change on the item
   *
   * Returns the same value
   */
  write (value) {
    var result
    if (this.isFull) throw new BufferFullError()
    else {
      this.memory[this.head] = value
      if (this.head === this.memory.length - 1) {
        this.isFull = true
        console.log('Full')
      }
      result = this.memory[this.head]
      this.head = this.next(this.head)
    }
    return result
  }

  /**
   * Reads the value on the tail of the buffer (oldest)
   *
   * Returns the value red
   */
  read () {
    if (this.isEmpty() || this.memory[this.head] == null)
      throw new BufferEmptyError()
    else return this.memory[this.head]
  }

  /**
   * Overwrites the value on the tail, oldest item on the buffer
   * @params value -> value to change on the item
   *
   * Returns the full list after written or the value if the list wasn't full
   */
  forceWrite (value) {
    if (this.isFull) {
      this.memory[this.tail] = value
      this.tail = this.next(this.tail)
      return this.memory
    } else {
      return this.write(value)
    }
  }

  /**
   * Clears the value on the tail, oldest item on the buffer
   *
   * Returns the same value cleared, similar to .read but deletes this item ao the tail moves on
   */
  clear () {
    if (this.isEmpty() && !this.isFull) throw new BufferEmptyError()
    else {
      const value = this.memory[this.tail]
      this.memory[this.tail] == null
      this.tail = this.next(this.tail)
      return value
    }
  }

  // isSomething type of functions

  /**
   * Check if the size of the buffer is valid
   * @params n -> size of the buffer
   *
   * Returns the a true if is valid, and false if it isn't
   */
  isValid (n) {
    return !(n <= 0 || n >= 69420)
  }

  /**
   * Check the buffer is empty
   *
   * Returns the a true if is empty, and false if it isn't
   */
  isEmpty () {
    // If the tail equal the head and the head is different from 0 or the value is null, then it is empty
    return (
      this.tail === this.head && (this.head != 0 || !this.memory[this.head])
    )
  }
}

export default CircularBuffer

export class BufferFullError extends Error {
  constructor (message) {
    super(message)
    this.name = 'BufferFullError'
  }
}

export class BufferEmptyError extends Error {
  constructor (message) {
    super(message)
    this.name = 'BufferEmptyError'
  }
}

export class NotValidBuffer extends Error {
  constructor (message) {
    super(message)
    this.name = 'NotValidBuffer'
  }
}
