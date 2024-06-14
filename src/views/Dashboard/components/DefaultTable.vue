<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getTableListApi } from '@/api/table/index'
import { TableData } from '@/api/table/types'
import { ref, h } from 'vue'
import { ElTag } from 'element-plus'
import { BaseButton } from '@/components/Button'

interface Params {
  pageIndex?: number
  pageSize?: number
}

const { t } = useI18n()

const columns: TableColumn[] = [
  {
    field: 'title',
    label: t('tableDemo.month')
  },
  {
    field: 'title',
    label: t('tableDemo.title')
  },
  {
    field: 'title',
    label: t('tableDemo.gameid')
  },
  {
    field: 'title',
    label: t('tableDemo.rtp')
  },
  {
    field: 'author',
    label: t('tableDemo.stakes')
  },
  {
    field: 'display_time',
    label: t('tableDemo.ggr'),
    sortable: true
  },
  {
    field: 'title',
    label: t('tableDemo.players')
  },
  {
    field: 'pageviews',
    label: t('tableDemo.arpu')
  }
]

const loading = ref(true)

let tableDataList = ref<TableData[]>([])

const getTableList = async (params?: Params) => {
  const res = await getTableListApi(
    params || {
      pageIndex: 1,
      pageSize: 10
    }
  )
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
  if (res) {
    tableDataList.value = res.data.list
  }
}

getTableList()

const actionFn = (data: any) => {
  console.log(data)
}
</script>

<template>
  <ContentWrap :title="t('tableDemo.table')" :message="t('tableDemo.tableDes')">
    <Table
      :columns="columns"
      :data="tableDataList"
      :loading="loading"
      :defaultSort="{ prop: 'display_time', order: 'descending' }"
    />
  </ContentWrap>
  <Search />
</template>
