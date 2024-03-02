/**
 * This file is copied from https://github.com/le0pard/pgtune/blob/master/src/common/components/configurationView/index.jsx
 */
import {
  selectDBVersion,
  selectOSType,
  selectDBType,
  selectTotalMemory,
  selectTotalMemoryUnit,
  selectCPUNum,
  selectConnectionNum,
  selectHDType,
  selectMaxConnections,
  selectHugePages,
  selectSharedBuffers,
  selectEffectiveCacheSize,
  selectMaintenanceWorkMem,
  selectCheckpointSegments,
  selectCheckpointCompletionTarget,
  selectWalBuffers,
  selectDefaultStatisticsTarget,
  selectRandomPageCost,
  selectEffectiveIoConcurrency,
  selectParallelSettings,
  selectWorkMem,
  selectWarningInfoMessages,
  selectLanguage
} from './selector'

const KB_UNIT_MAP = {
  KB_PER_MB: 1024,
  KB_PER_GB: 1048576
}

// This uses larger units only if there's no loss of resolution in displaying
// with that value. Therefore, if using this to output newly assigned
// values, that value needs to be rounded appropriately if you want
// it to show up as an even number of MB or GB
const formatValue = (value: number = 0) => {
  const result = (() => {
    if (value % KB_UNIT_MAP['KB_PER_GB'] === 0) {
      return {
        value: Math.floor(value / KB_UNIT_MAP['KB_PER_GB']),
        unit: 'GB'
      }
    }
    if (value % KB_UNIT_MAP['KB_PER_MB'] === 0) {
      return {
        value: Math.floor(value / KB_UNIT_MAP['KB_PER_MB']),
        unit: 'MB'
      }
    }
    return {
      value,
      unit: 'kB'
    }
  })()

  // return formatted
  return `${result.value}${result.unit}`
}

export const generateConfig = (state: any) => {
  const useSelector = <Selected, TState = unknown>(selector: (state: TState) => Selected) => {
    return selector(state)
  }
  // hardware configuration
  const dbVersion = useSelector(selectDBVersion)
  const osType = useSelector(selectOSType)
  const dbType = useSelector(selectDBType)
  const totalMemory = useSelector(selectTotalMemory)
  const totalMemoryUnit = useSelector(selectTotalMemoryUnit)
  const cpuNum = useSelector(selectCPUNum)
  const connectionNum = useSelector(selectConnectionNum)
  const hdType = useSelector(selectHDType)
  // computed settings
  const maxConnectionsVal = useSelector(selectMaxConnections)
  const hugePagesVal = useSelector(selectHugePages)
  const sharedBuffersVal = useSelector(selectSharedBuffers)
  const effectiveCacheSizeVal = useSelector(selectEffectiveCacheSize)
  const maintenanceWorkMemVal = useSelector(selectMaintenanceWorkMem)
  const checkpointSegmentsVal = useSelector(selectCheckpointSegments)
  const checkpointCompletionTargetVal = useSelector(selectCheckpointCompletionTarget)
  const walBuffersVal = useSelector(selectWalBuffers)
  const defaultStatisticsTargetVal = useSelector(selectDefaultStatisticsTarget)
  const randomPageCostVal = useSelector(selectRandomPageCost)
  const effectiveIoConcurrencyVal = useSelector(selectEffectiveIoConcurrency)
  const parallelSettingsVal = useSelector(selectParallelSettings)
  const workMemVal = useSelector(selectWorkMem)
  // warnings
  const warningInfoMessagesVal = useSelector(selectWarningInfoMessages)
  const isAlterSystem = useSelector(selectLanguage) === 'sql'

  const warningInfo = () =>
    warningInfoMessagesVal.map((item) => `${isAlterSystem ? '--' : '#'} ${item}`).join('\n')

  const hardwareConfiguration = () =>
    [
      ['DB Version', dbVersion],
      ['OS Type', osType],
      ['DB Type', dbType],
      ['Total Memory (RAM)', `${totalMemory} ${totalMemoryUnit}`],
      ['CPUs num', cpuNum],
      ['Connections num', connectionNum],
      ['Data Storage', hdType]
    ]
      .filter((item) => !!item[1])
      .map((item) => `${isAlterSystem ? '--' : '#'} ${item[0]}: ${item[1]}`)
      .join('\n')

  const getCheckpointSegments = () =>
    checkpointSegmentsVal.map((item) => {
      if (item.key === 'checkpoint_segments') {
        return [item.key, item.value]
      }
      return [item.key, formatValue(item.value)]
    })

  const getParallelSettings = () => parallelSettingsVal.map((item) => [item.key, item.value])

  const postgresqlConfig = () => {
    const configData = [
      ['max_connections', maxConnectionsVal],
      ['shared_buffers', formatValue(sharedBuffersVal)],
      ['effective_cache_size', formatValue(effectiveCacheSizeVal)],
      ['maintenance_work_mem', formatValue(maintenanceWorkMemVal)],
      ['checkpoint_completion_target', checkpointCompletionTargetVal],
      ['wal_buffers', formatValue(walBuffersVal)],
      ['default_statistics_target', defaultStatisticsTargetVal],
      ['random_page_cost', randomPageCostVal],
      ['effective_io_concurrency', effectiveIoConcurrencyVal],
      ['work_mem', formatValue(workMemVal)],
      ['huge_pages', hugePagesVal]
    ]
      .concat(getCheckpointSegments())
      .concat(getParallelSettings())

    return configData
      .filter((item) => !!item[1])
      .map((item) =>
        isAlterSystem ? `ALTER SYSTEM SET\n ${item[0]} = '${item[1]}';` : `${item[0]} = ${item[1]}`
      )
      .join('\n')
  }

  let config = [hardwareConfiguration(), '', postgresqlConfig()]

  if (warningInfoMessagesVal.length > 0) {
    config = [warningInfo(), '', ...config]
  }
  return config.join('\n')
}
