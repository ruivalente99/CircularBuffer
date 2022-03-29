import CircularBuffer, {
  BufferFullError,
  BufferEmptyError,
  NotValidBuffer
} from './circular-buffer'

// Just for safety, could be any value
const MAX_VALUE = 69420

// We could have more tests here, for example checking if the type of value is valid (only strings for example), but isn't the objetive of this challenge
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
  test('force writing with full buffer should return new buffer ', () => {
    const buffer = new CircularBuffer(2)
    buffer.write('2')
    buffer.write('3')
    expect(buffer.forceWrite('1')).toStrictEqual(['1', '3'])
  })

  test('force writing with not full buffer should return the new value ', () => {
    const buffer = new CircularBuffer(2)
    buffer.write('2')
    expect(buffer.forceWrite('1')).toBe('1')
  })

  /*
   * Tests regarding clear
   */
  test('clear should delete the oldest value', () => {
    const buffer = new CircularBuffer(2)
    buffer.write('2')
    buffer.write('1')
    expect(buffer.clear()).toBe('2')
  })
})
