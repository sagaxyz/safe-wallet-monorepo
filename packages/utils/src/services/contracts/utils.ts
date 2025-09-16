import semverSatisfies from 'semver/functions/satisfies'
import type { SafeVersion } from '@safe-global/types-kit'
import { invariant } from '@safe-global/utils/utils/helpers'
import type { SafeState } from '@safe-global/store/gateway/AUTO_GENERATED/safes'

export const isLegacyVersion = (safeVersion: string): boolean => {
  const LEGACY_VERSION = '<1.4.1'
  return semverSatisfies(safeVersion, LEGACY_VERSION)
}
export const isValidSafeVersion = (safeVersion?: SafeState['version']): safeVersion is SafeVersion => {
  const SAFE_VERSIONS: SafeVersion[] = ['1.4.1']
  return !!safeVersion && SAFE_VERSIONS.some((version) => semverSatisfies(safeVersion, version))
}

// `assert` does not work with arrow functions
export function assertValidSafeVersion<T extends SafeState['version']>(safeVersion?: T): asserts safeVersion {
  return invariant(isValidSafeVersion(safeVersion), `${safeVersion} is not a valid Safe Account version`)
}
