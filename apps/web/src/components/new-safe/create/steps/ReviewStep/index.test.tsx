import type { NewSafeFormData } from '@/components/new-safe/create'
import * as useChains from '@/hooks/useChains'
import { type Chain } from '@safe-global/store/gateway/AUTO_GENERATED/chains'

import { render } from '@/tests/test-utils'
import ReviewStep from '@/components/new-safe/create/steps/ReviewStep/index'
import { LATEST_SAFE_VERSION } from '@safe-global/utils/config/constants'
import { type SafeVersion } from '@safe-global/types-kit'

const mockChain = {
  chainId: '100',
  chainName: 'Gnosis Chain',
  l2: false,
  nativeCurrency: {
    symbol: 'ETH',
  },
} as Chain

describe('ReviewStep', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not display the network fee for counterfactual safes', () => {
    const mockData: NewSafeFormData = {
      name: 'Test',
      networks: [mockChain],
      threshold: 1,
      owners: [{ name: '', address: '0x1' }],
      saltNonce: 0,
      safeVersion: LATEST_SAFE_VERSION as SafeVersion,
    }
    jest.spyOn(useChains, 'useHasFeature').mockReturnValue(true)

    const { queryByText } = render(
      <ReviewStep data={mockData} onSubmit={jest.fn()} onBack={jest.fn()} setStep={jest.fn()} />,
    )

    expect(queryByText('You will have to confirm a transaction and pay an estimated fee')).not.toBeInTheDocument()
  })

  it('should not display the execution method for counterfactual safes', () => {
    const mockData: NewSafeFormData = {
      name: 'Test',
      networks: [mockChain],
      threshold: 1,
      owners: [{ name: '', address: '0x1' }],
      saltNonce: 0,
      safeVersion: LATEST_SAFE_VERSION as SafeVersion,
    }
    jest.spyOn(useChains, 'useHasFeature').mockReturnValue(true)

    const { queryByText } = render(
      <ReviewStep data={mockData} onSubmit={jest.fn()} onBack={jest.fn()} setStep={jest.fn()} />,
    )

    expect(queryByText('Who will pay gas fees:')).not.toBeInTheDocument()
  })
})
