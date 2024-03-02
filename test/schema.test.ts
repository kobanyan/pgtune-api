import { expect, describe, it } from 'vitest'
import { schema } from '../src/schema'

const minParam = {
  totalMemory: '32'
}

const defaultValue = {
  dbType: 'web',
  dbVersion: 16,
  hdType: 'ssd',
  language: 'ini',
  osType: 'linux',
  totalMemoryUnit: 'GB',
  totalMemory: 32
}

describe('dbVersion', () => {
  it('should be 16 when dbVersion is empty', () => {
    expect(schema.parse({ ...minParam })).toEqual({
      ...defaultValue
    })
  })
  it('should throw error when dbVersion is not a number', () => {
    expect(() => schema.parse({ ...minParam, dbVersion: 'abc' }))
      .toThrowErrorMatchingInlineSnapshot(`
        [ZodError: [
          {
            "code": "custom",
            "message": "dbVersion must be a number.",
            "path": [
              "dbVersion"
            ]
          },
          {
            "code": "custom",
            "message": "dbVersion must be greater than or equal to 10.",
            "path": [
              "dbVersion"
            ]
          },
          {
            "code": "custom",
            "message": "dbVersion must be less than or equal to 16.",
            "path": [
              "dbVersion"
            ]
          }
        ]]
      `)
  })
  it('should throw error when dbVersion is 9', () => {
    expect(() => schema.parse({ ...minParam, dbVersion: '9' })).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "custom",
          "message": "dbVersion must be greater than or equal to 10.",
          "path": [
            "dbVersion"
          ]
        }
      ]]
    `)
  })
  it('should return 10 when dbVersion is 10', () => {
    expect(schema.parse({ ...minParam, dbVersion: '10' })).toEqual({
      ...defaultValue,
      dbVersion: 10
    })
  })
  it('should return 16 when dbVersion is 16', () => {
    expect(schema.parse({ ...minParam, dbVersion: '16' })).toEqual({
      ...defaultValue,
      dbVersion: 16
    })
  })
  it('should throw error when dbVersion is 17', () => {
    expect(() => schema.parse({ ...minParam, dbVersion: '17' }))
      .toThrowErrorMatchingInlineSnapshot(`
        [ZodError: [
          {
            "code": "custom",
            "message": "dbVersion must be less than or equal to 16.",
            "path": [
              "dbVersion"
            ]
          }
        ]]
      `)
  })
})

describe('osType', () => {
  it('should return linux when osType is empty', () => {
    expect(schema.parse({ ...minParam })).toEqual({
      ...defaultValue
    })
  })
  it('should return linux when osType is linux', () => {
    expect(schema.parse({ ...minParam, osType: 'linux' })).toEqual({
      ...defaultValue,
      osType: 'linux'
    })
  })
  it('should return windows when osType is windows', () => {
    expect(schema.parse({ ...minParam, osType: 'windows' })).toEqual({
      ...defaultValue,
      osType: 'windows'
    })
  })
  it('should return mac when osType is mac', () => {
    expect(schema.parse({ ...minParam, osType: 'mac' })).toEqual({
      ...defaultValue,
      osType: 'mac'
    })
  })
  it('should throw error when osType is unknown', () => {
    expect(() => schema.parse({ ...minParam, osType: 'unknown' }))
      .toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "received": "unknown",
          "code": "invalid_enum_value",
          "options": [
            "linux",
            "mac",
            "windows"
          ],
          "path": [
            "osType"
          ],
          "message": "Invalid enum value. Expected 'linux' | 'mac' | 'windows', received 'unknown'"
        }
      ]]
    `)
  })
})

describe('dbType', () => {
  it('should return web when dbType is empty', () => {
    expect(schema.parse({ ...minParam })).toEqual({
      ...defaultValue
    })
  })
  it('should return web when dbType is web', () => {
    expect(schema.parse({ ...minParam, dbType: 'web' })).toEqual({
      ...defaultValue,
      dbType: 'web'
    })
  })
  it('should return oltp dbType is oltp', () => {
    expect(schema.parse({ ...minParam, dbType: 'oltp' })).toEqual({
      ...defaultValue,
      dbType: 'oltp'
    })
  })
  it('should return dw when dbType is dw', () => {
    expect(schema.parse({ ...minParam, dbType: 'dw' })).toEqual({
      ...defaultValue,
      dbType: 'dw'
    })
  })
  it('should return desktop when dbType is desktop', () => {
    expect(schema.parse({ ...minParam, dbType: 'desktop' })).toEqual({
      ...defaultValue,
      dbType: 'desktop'
    })
  })
  it('should return mixed when dbType is mixed', () => {
    expect(schema.parse({ ...minParam, dbType: 'mixed' })).toEqual({
      ...defaultValue,
      dbType: 'mixed'
    })
  })
  it('should throw error when dbType is unknown', () => {
    expect(() => schema.parse({ ...minParam, dbType: 'unknown' }))
      .toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "received": "unknown",
          "code": "invalid_enum_value",
          "options": [
            "web",
            "oltp",
            "dw",
            "desktop",
            "mixed"
          ],
          "path": [
            "dbType"
          ],
          "message": "Invalid enum value. Expected 'web' | 'oltp' | 'dw' | 'desktop' | 'mixed', received 'unknown'"
        }
      ]]
    `)
  })
})

describe('totalMemory', () => {
  it('should throw error when totalMemory is empty', () => {
    expect(() => schema.parse({})).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": [
            "totalMemory"
          ],
          "message": "totalMemory is a required parameter."
        }
      ]]
    `)
  })
  it('should throw error when totalMemory is not a number', () => {
    expect(() => schema.parse({ totalMemory: 'abc' })).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "custom",
          "message": "totalMemory must be a number.",
          "path": [
            "totalMemory"
          ]
        },
        {
          "code": "custom",
          "message": "totalMemory must be greater than or equal to 1.",
          "path": [
            "totalMemory"
          ]
        },
        {
          "code": "custom",
          "message": "totalMemory must be less than or equal to 9999.",
          "path": [
            "totalMemory"
          ]
        }
      ]]
    `)
  })
  it('should throw error when totalMemory is -1', () => {
    expect(() => schema.parse({ totalMemory: '-1' })).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "custom",
          "message": "totalMemory must be greater than or equal to 1.",
          "path": [
            "totalMemory"
          ]
        }
      ]]
    `)
  })
  it('should throw error when totalMemory is 0', () => {
    expect(() => schema.parse({ totalMemory: '0' })).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "custom",
          "message": "totalMemory must be greater than or equal to 1.",
          "path": [
            "totalMemory"
          ]
        }
      ]]
    `)
  })
  it('should return 1 error when totalMemory is 1', () => {
    expect(schema.parse({ totalMemory: '1' })).toEqual({
      ...defaultValue,
      totalMemory: 1
    })
  })
  it('should return 9998 when totalMemory is 9998', () => {
    expect(schema.parse({ totalMemory: '9998' })).toEqual({
      ...defaultValue,
      totalMemory: 9998
    })
  })
  it('should return 9999 when totalMemory is 9999', () => {
    expect(schema.parse({ totalMemory: '9999' })).toEqual({
      ...defaultValue,
      totalMemory: 9999
    })
  })
  it('should throw error when totalMemory is 10000', () => {
    expect(() => schema.parse({ totalMemory: '10000' })).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "custom",
          "message": "totalMemory must be less than or equal to 9999.",
          "path": [
            "totalMemory"
          ]
        }
      ]]
    `)
  })
})

describe('totalMemoryUnit', () => {
  it('should return GB when totalMemoryUnit is empty', () => {
    expect(schema.parse({ ...minParam })).toEqual({
      ...defaultValue
    })
  })
  it('should return GB when totalMemoryUnit is GB', () => {
    expect(schema.parse({ ...minParam, totalMemoryUnit: 'GB' })).toEqual({
      ...defaultValue,
      totalMemoryUnit: 'GB'
    })
  })
  it('should return MB totalMemoryUnit is MB', () => {
    expect(schema.parse({ ...minParam, totalMemoryUnit: 'MB' })).toEqual({
      ...defaultValue,
      totalMemoryUnit: 'MB'
    })
  })
  it('should throw error when totalMemoryUnit is KB', () => {
    expect(() => schema.parse({ ...minParam, totalMemoryUnit: 'KB' }))
      .toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "received": "KB",
          "code": "invalid_enum_value",
          "options": [
            "MB",
            "GB"
          ],
          "path": [
            "totalMemoryUnit"
          ],
          "message": "Invalid enum value. Expected 'MB' | 'GB', received 'KB'"
        }
      ]]
    `)
  })
  it('should throw error when totalMemoryUnit is TB', () => {
    expect(() => schema.parse({ ...minParam, totalMemoryUnit: 'TB' }))
      .toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "received": "TB",
          "code": "invalid_enum_value",
          "options": [
            "MB",
            "GB"
          ],
          "path": [
            "totalMemoryUnit"
          ],
          "message": "Invalid enum value. Expected 'MB' | 'GB', received 'TB'"
        }
      ]]
    `)
  })
})

describe('cpuNum', () => {
  it('should return undefined when cpuNum is empty', () => {
    expect(schema.parse({ ...minParam })).toEqual({ ...defaultValue })
  })
  it('should throw error when cpuNum is not a number', () => {
    expect(() => schema.parse({ ...minParam, cpuNum: 'abc' })).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "custom",
          "message": "cpuNum must be a number.",
          "path": [
            "cpuNum"
          ]
        },
        {
          "code": "custom",
          "message": "cpuNum must be greater than or equal to 1.",
          "path": [
            "cpuNum"
          ]
        },
        {
          "code": "custom",
          "message": "cpuNum must be less than or equal to 9999.",
          "path": [
            "cpuNum"
          ]
        }
      ]]
    `)
  })
  it('should throw error when cpuNum is -1', () => {
    expect(() => schema.parse({ ...minParam, cpuNum: '-1' })).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "custom",
          "message": "cpuNum must be greater than or equal to 1.",
          "path": [
            "cpuNum"
          ]
        }
      ]]
    `)
  })
  it('should throw error when cpuNum is 0', () => {
    expect(() => schema.parse({ ...minParam, cpuNum: '0' })).toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "code": "custom",
          "message": "cpuNum must be greater than or equal to 1.",
          "path": [
            "cpuNum"
          ]
        }
      ]]
    `)
  })
  it('should return 1 error when cpuNum is 1', () => {
    expect(schema.parse({ ...minParam, cpuNum: '1' })).toEqual({
      ...defaultValue,
      cpuNum: 1
    })
  })
  it('should return 9998 when cpuNum is 9998', () => {
    expect(schema.parse({ ...minParam, cpuNum: '9998' })).toEqual({
      ...defaultValue,
      cpuNum: 9998
    })
  })
  it('should return 9999 when cpuNum is 9999', () => {
    expect(schema.parse({ ...minParam, cpuNum: '9999' })).toEqual({
      ...defaultValue,
      cpuNum: 9999
    })
  })
  it('should throw error when cpuNum is 10000', () => {
    expect(() => schema.parse({ ...minParam, cpuNum: '10000' }))
      .toThrowErrorMatchingInlineSnapshot(`
        [ZodError: [
          {
            "code": "custom",
            "message": "cpuNum must be less than or equal to 9999.",
            "path": [
              "cpuNum"
            ]
          }
        ]]
      `)
  })
})

describe('connectionNum', () => {
  it('should return undefined when connectionNum is empty', () => {
    expect(schema.parse({ ...minParam })).toEqual({ ...defaultValue })
  })
  it('should throw error when connectionNum is not a number', () => {
    expect(() => schema.parse({ ...minParam, connectionNum: 'abc' }))
      .toThrowErrorMatchingInlineSnapshot(`
        [ZodError: [
          {
            "code": "custom",
            "message": "connectionNum must be a number.",
            "path": [
              "connectionNum"
            ]
          },
          {
            "code": "custom",
            "message": "connectionNum must be greater than or equal to 20.",
            "path": [
              "connectionNum"
            ]
          },
          {
            "code": "custom",
            "message": "connectionNum must be less than or equal to 9999.",
            "path": [
              "connectionNum"
            ]
          }
        ]]
      `)
  })
  it('should throw error when connectionNum is 19', () => {
    expect(() => schema.parse({ ...minParam, connectionNum: '19' }))
      .toThrowErrorMatchingInlineSnapshot(`
        [ZodError: [
          {
            "code": "custom",
            "message": "connectionNum must be greater than or equal to 20.",
            "path": [
              "connectionNum"
            ]
          }
        ]]
      `)
  })
  it('should return 20 when connectionNum is 20', () => {
    expect(schema.parse({ ...minParam, connectionNum: '20' })).toEqual({
      ...defaultValue,
      connectionNum: 20
    })
  })
  it('should return 21 when connectionNum is 21', () => {
    expect(schema.parse({ ...minParam, connectionNum: '21' })).toEqual({
      ...defaultValue,
      connectionNum: 21
    })
  })
  it('should return 9998 when connectionNum is 9998', () => {
    expect(schema.parse({ ...minParam, connectionNum: '9998' })).toEqual({
      ...defaultValue,
      connectionNum: 9998
    })
  })
  it('should return 9999 when connectionNum is 9999', () => {
    expect(schema.parse({ ...minParam, connectionNum: '9999' })).toEqual({
      ...defaultValue,
      connectionNum: 9999
    })
  })
  it('should throw error when connectionNum is 10000', () => {
    expect(() => schema.parse({ ...minParam, connectionNum: '10000' }))
      .toThrowErrorMatchingInlineSnapshot(`
        [ZodError: [
          {
            "code": "custom",
            "message": "connectionNum must be less than or equal to 9999.",
            "path": [
              "connectionNum"
            ]
          }
        ]]
      `)
  })
})

describe('hdType', () => {
  it('should return ssd when hdType is empty', () => {
    expect(schema.parse({ ...minParam })).toEqual({
      ...defaultValue
    })
  })
  it('should return ssd when hdType is ssd', () => {
    expect(schema.parse({ ...minParam, hdType: 'ssd' })).toEqual({
      ...defaultValue,
      hdType: 'ssd'
    })
  })
  it('should return san when hdType is san', () => {
    expect(schema.parse({ ...minParam, hdType: 'san' })).toEqual({
      ...defaultValue,
      hdType: 'san'
    })
  })
  it('should return hdd when hdType is hdd', () => {
    expect(schema.parse({ ...minParam, hdType: 'hdd' })).toEqual({
      ...defaultValue,
      hdType: 'hdd'
    })
  })
  it('should throw error when hdType is unknown', () => {
    expect(() => schema.parse({ ...minParam, hdType: 'unknown' }))
      .toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "received": "unknown",
          "code": "invalid_enum_value",
          "options": [
            "ssd",
            "san",
            "hdd"
          ],
          "path": [
            "hdType"
          ],
          "message": "Invalid enum value. Expected 'ssd' | 'san' | 'hdd', received 'unknown'"
        }
      ]]
    `)
  })
})

describe('language', () => {
  it('should return ini when language is empty', () => {
    expect(schema.parse({ ...minParam })).toEqual({
      ...defaultValue
    })
  })
  it('should return ini when language is ini', () => {
    expect(schema.parse({ ...minParam, language: 'ini' })).toEqual({
      ...defaultValue,
      language: 'ini'
    })
  })
  it('should return sql when language is sql', () => {
    expect(schema.parse({ ...minParam, language: 'sql' })).toEqual({
      ...defaultValue,
      language: 'sql'
    })
  })
  it('should throw error when language is unknown', () => {
    expect(() => schema.parse({ ...minParam, language: 'unknown' }))
      .toThrowErrorMatchingInlineSnapshot(`
      [ZodError: [
        {
          "received": "unknown",
          "code": "invalid_enum_value",
          "options": [
            "ini",
            "sql"
          ],
          "path": [
            "language"
          ],
          "message": "Invalid enum value. Expected 'ini' | 'sql', received 'unknown'"
        }
      ]]
    `)
  })
})
