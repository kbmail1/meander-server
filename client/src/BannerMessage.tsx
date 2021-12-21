import React, { useState } from 'react'

export const enum BannerSeverity {
  Error = 1,
  Warn,
  Info,
  Success,
}
export interface IBannerConfig {
  severity: BannerSeverity
  title: string
  subTitle: string
  description: string
  show: boolean
  removeAfterSecs: number
}

export const DefaultConfig: IBannerConfig = {
  severity: BannerSeverity.Info,
  title: 'Empty banner',
  subTitle: 'banner subtitle',
  description: 'this is a mock banner to test',
  show: false,
  removeAfterSecs: 5,
}

const BannerMessage = (props) => {
  return <div>replace with banner...</div>
}

export default BannerMessage
