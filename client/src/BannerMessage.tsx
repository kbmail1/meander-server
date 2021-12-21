import React, { useState } from 'react'

export const enum BannerSeverity {
  Error = 1,
  Warn,
  Info,
  Help,
  None,
}
export interface IBannerState {
  severity: BannerSeverity
  title: string
  subTitle: string
  description: string
  hideAfterSecs: number
}

const DefaultState: IBannerState = {
  severity: BannerSeverity.None,
  title: 'Empty banner',
  subTitle: 'banner subtitle',
  description: 'this is a mock banner to test',
  hideAfterSecs: 5,
}

const BannerMessage = (props) => {
  // [banner, setBanner] = useState(DefaultState)

  return <div>some banner info</div>
}

export default BannerMessage
