/**
 * This file is based on https://github.com/le0pard/pgtune/blob/master/src/common/components/configurationForm/index.jsx
 */
import { z } from '@hono/zod-openapi'
import {
  DB_TYPE_DESKTOP,
  DB_TYPE_DW,
  DB_TYPE_MIXED,
  DB_TYPE_OLTP,
  DB_TYPE_WEB,
  DB_VERSIONS,
  DEFAULT_DB_VERSION,
  HARD_DRIVE_HDD,
  HARD_DRIVE_SAN,
  HARD_DRIVE_SSD,
  OS_LINUX,
  OS_MAC,
  OS_WINDOWS,
  SIZE_UNIT_GB,
  SIZE_UNIT_MB
} from './constants'

const DB_VERSION_MIN = Math.min(...DB_VERSIONS)
const DB_VERSION_MAX = Math.max(...DB_VERSIONS)
const OS_TYPE = [OS_LINUX, OS_MAC, OS_WINDOWS] as const
const DB_TYPE = [DB_TYPE_WEB, DB_TYPE_OLTP, DB_TYPE_DW, DB_TYPE_DESKTOP, DB_TYPE_MIXED] as const
// const TOTAL_MEMORY_UNIT = ['KB', SIZE_UNIT_MB, SIZE_UNIT_GB, 'TB'] as const
const HD_TYPE = [HARD_DRIVE_SSD, HARD_DRIVE_SAN, HARD_DRIVE_HDD] as const
const LANGUAGE = ['ini', 'sql'] as const

const errorMessageNumber = (name: string) => `${name} must be a number.`
const errorMessageMin = (name: string, value: number) =>
  `${name} must be greater than or equal to ${value}.`
const errorMessageMax = (name: string, value: number) =>
  `${name} must be less than or equal to ${value}.`
const errorMessageRequired = (name: string) => `${name} is a required parameter.`

export const schema = z
  .object({
    dbVersion: z
      .string()
      .optional()
      .default(DEFAULT_DB_VERSION.toString())
      .transform((v) => parseInt(v))
      .refine((v) => !isNaN(v), { message: errorMessageNumber('dbVersion') })
      .refine((v) => v >= DB_VERSION_MIN, {
        message: errorMessageMin('dbVersion', DB_VERSION_MIN)
      })
      .refine((v) => v <= DB_VERSION_MAX, {
        message: errorMessageMax('dbVersion', DB_VERSION_MAX)
      })
      .openapi({
        title: 'DB Version',
        description: `PostgreSQL version (find out via 'SELECT version();')`
      }),
    osType: z
      .enum(OS_TYPE)
      .optional()
      .default(OS_LINUX)
      .openapi({ title: 'OS Type', description: 'Operation system of the PostgreSQL server host' }),
    dbType: z.enum(DB_TYPE).optional().default(DB_TYPE_WEB).openapi({
      title: 'DB Type',
      description:
        'For what type of application is PostgreSQL used. web = Web Application, oltp = Online transaction processing system, dw = Data warehouse, desktop = Desktop application, mixed = Mixed type of application'
    }),
    totalMemory: z
      .string({ required_error: errorMessageRequired('totalMemory') })
      .transform((v) => parseInt(v))
      .refine((v) => !isNaN(v), { message: errorMessageNumber('totalMemory') })
      .refine((v) => v >= 1, {
        message: errorMessageMin('totalMemory', 1)
      })
      .refine((v) => v <= 9999, {
        message: errorMessageMax('totalMemory', 9999)
      })
      .openapi({ title: 'Total Memory (RAM)', description: 'How much memory can PostgreSQL use' }),
    totalMemoryUnit: z
      .enum([SIZE_UNIT_MB, SIZE_UNIT_GB])
      .optional()
      .default(SIZE_UNIT_GB)
      .openapi({}),
    cpuNum: z
      .string()
      .transform((v) => parseInt(v))
      .refine((v) => !isNaN(v), { message: errorMessageNumber('cpuNum') })
      .refine((v) => v >= 1, {
        message: errorMessageMin('cpuNum', 1)
      })
      .refine((v) => v <= 9999, {
        message: errorMessageMax('cpuNum', 9999)
      })
      .optional()
      .openapi({
        title: 'Number of CPUs',
        description:
          'Number of CPUs, which PostgreSQL can use. CPUs = threads per core * cores per socket * sockets'
      }),
    connectionNum: z
      .string()
      .transform((v) => parseInt(v))
      .refine((v) => !isNaN(v), { message: errorMessageNumber('connectionNum') })
      .refine((v) => v >= 20, {
        message: errorMessageMin('connectionNum', 20)
      })
      .refine((v) => v <= 9999, {
        message: errorMessageMax('connectionNum', 9999)
      })
      .optional()
      .openapi({
        title: 'Number of Connections',
        description: 'Maximum number of PostgreSQL client connections'
      }),
    hdType: z.enum(HD_TYPE).optional().default(HARD_DRIVE_SSD).openapi({
      title: 'Data Storage',
      description:
        'Type of data storage device. ssd = SSD storage, san = Network (SAN) storage, hdd = HDD storage'
    }),
    language: z.enum(LANGUAGE).optional().default('ini').openapi({ title: 'Output Format' })
  })
  .openapi({})

export type Schema = z.infer<typeof schema>
