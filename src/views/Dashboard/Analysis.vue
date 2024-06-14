<script setup lang="ts">
import PanelGroup from './components/PanelGroup.vue'
import DefaultTable from './components/DefaultTable.vue'
import { Search } from '@/components/Search'
import { ElRow, ElCol, ElCard, ElSkeleton } from 'element-plus'
import { Echart } from '@/components/Echart'
import { lineOptions } from './echarts-data'
import { ref, reactive } from 'vue'
import {
  getUserAccessSourceApi,
  getWeeklyUserActivityApi,
  getMonthlySalesApi
} from '@/api/dashboard/analysis'
import { set } from 'lodash-es'
import { EChartsOption } from 'echarts'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const loading = ref(true)

const buttonPosition = ref('left')

// 用户来源
/*
const getUserAccessSource = async () => {
  const res = await getUserAccessSourceApi().catch(() => {})
  if (res) {
    set(
      pieOptionsData,
      'legend.data',
      res.data.map((v) => t(v.name))
    )
    pieOptionsData!.series![0].data = res.data.map((v) => {
      return {
        name: t(v.name),
        value: v.value
      }
    })
  }
}
*/

// 周活跃量
/*
const barOptionsData = reactive<EChartsOption>(barOptions) as EChartsOption
const getWeeklyUserActivity = async () => {
  const res = await getWeeklyUserActivityApi().catch(() => {})
  if (res) {
    set(
      barOptionsData,
      'xAxis.data',
      res.data.map((v) => t(v.name))
    )
    set(barOptionsData, 'series', [
      {
        name: t('analysis.activeQuantity'),
        data: res.data.map((v) => v.value),
        type: 'bar'
      }
    ])
  }
}
*/
const lineOptionsData = reactive<EChartsOption>(lineOptions) as EChartsOption

// 每月销售总额
const getMonthlySales = async () => {
  const res = await getMonthlySalesApi().catch(() => {})
  if (res) {
    set(
      lineOptionsData,
      'xAxis.data',
      res.data.map((v) => t(v.name))
    )
    set(lineOptionsData, 'series', [
      {
        name: t('analysis.ggr'),
        smooth: true,
        type: 'bar',
        data: res.data.map((v) => v.estimate),
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      }
    ])
  }
}

const getAllApi = async () => {
  await Promise.all([getMonthlySales()])
  loading.value = false
}

getAllApi()
</script>

<template>
  <div>
    <ElRow :gutter="20" justify="space-between">
      <ElCol :xl="6" :lg="16" :md="12" :sm="12" :xs="24">
        <ElCard shadow="hover" class="mb-20px">
          <ElSkeleton :loading="loading" animated :rows="4">
            <Echart :options="lineOptionsData" :height="350" />
          </ElSkeleton>
        </ElCard>
      </ElCol>
      <ElCol :span="8">
        <PanelGroup />
      </ElCol>
    </ElRow>
    <DefaultTable />
  </div>
</template>
