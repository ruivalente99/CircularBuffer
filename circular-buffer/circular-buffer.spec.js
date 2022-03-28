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
  ////
  /*
   * Tests regarding reading
   */
  test('reading empty buffer should fail', () => {
    const buffer = new CircularBuffer(1)
    expect(() => buffer.read()).toThrow(BufferEmptyError)
  })
  test('can read an item just written', () => {
    const buffer = new CircularBuffer(1)
    buffer.write('1')
    expect(buffer.read()).toBe('1')
  })

  ////
  /*
   * Tests regarding writing
   */
  test('writing on a not declared buffer should fail', () => {
    expect(() => new CircularBuffer().write('1')).toThrow(NotValidBuffer)
  })

  test('writing on a full buffer should fail', () => {
    const buffer = new CircularBuffer(1)
    buffer.write('1')
    expect(() => buffer.write('2')).toThrow(BufferFullError)
  })

  /*
   * Tests regarding force writing
   */
  test('force writing with full buffer should return the oldest value and the new value ', () => {
    const buffer = new CircularBuffer(1)
    buffer.write('2')
    expect(buffer.forceWrite('1')).toStrictEqual(['2', '1'])
  })

  test('force writing with not full buffer should return the new value ', () => {
    const buffer = new CircularBuffer(2)
    buffer.write('2')
    expect(buffer.forceWrite('1')).toStrictEqual('1')
  })

  /*
   * Tests regarding clear
   */
  test('clear should delete the oldest value', () => {
    const buffer = new CircularBuffer(1)
    buffer.write('2')
    expect(buffer.clear()).toBe('2')
  })

})
