import CircularBuffer, {
  BufferFullError,
  BufferEmptyError,
  NotValidBuffer
} from './circular-buffer'

// Just for safety
const MAX_VALUE = 69420

describe('CircularBuffer', () => {
  /*
   * Tests regarding size of the buffer
   */
  test('declaring a new Circular Buffer with size equals 0 should fail', () => {
    expect(() => new CircularBuffer()).toThrow(NotValidBuffer)
  })

  test('declaring a new Circular Buffer with negative size should fail', () => {
    expect(() => new CircularBuffer(-1)).toThrow(NotValidBuffer)
  })

  test(
    'declaring a new Circular Buffer with size bigger than ' +
      MAX_VALUE +
      ' should fail',
    () => {
      expect(() => new CircularBuffer(MAX_VALUE)).toThrow(NotValidBuffer)
    }
  )

  test('reading empty buffer should fail', () => {
    const buffer = new CircularBuffer(1)
    expect(() => buffer.read()).toThrow(BufferEmptyError)
  })

  test('writing on a not declared Buffer should fail', () => {
    const buffer = new CircularBuffer()
    expect(() => buffer.write()).toThrow(BufferEmptyError)
  })
  test('can read an item just written', () => {
    const buffer = new CircularBuffer(1)
    buffer.write('1')
    expect(buffer.read()).toBe('1')
  })
})
