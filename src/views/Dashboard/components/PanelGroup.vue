<script setup lang="ts">
import { ElRow, ElCol, ElCard, ElSkeleton } from 'element-plus'
import { CountTo } from '@/components/CountTo'
import { useDesign } from '@/hooks/web/useDesign'
import { useI18n } from '@/hooks/web/useI18n'
import { ref, reactive } from 'vue'
import { getCountApi } from '@/api/dashboard/analysis'
import type { AnalysisTotalTypes } from '@/api/dashboard/analysis/types'

const { t } = useI18n()

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('panel')

const loading = ref(true)

let totalState = reactive<AnalysisTotalTypes>({
  users: 0,
  messages: 0,
  moneys: 0,
  shoppings: 0
})

const getCount = async () => {
  const res = await getCountApi()
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
  totalState = Object.assign(totalState, res?.data || {})
}

getCount()
</script>

<template>
  <ElRow :gutter="20" :class="prefixCls" class="flex-column">
    <ElCol :xl="6" :lg="8" :md="12" :sm="12" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="2">
          <template #default>
            <div :class="`${prefixCls}__item flex justify-between`">
              <div>
                <div
                  :class="`${prefixCls}__item--icon ${prefixCls}__item--peoples p-16px inline-block rounded-6px`"
                >
                  <Icon icon="svg-icon:peoples" :size="14" />
                  <div class="text">Top User</div>
                </div>
              </div>
              <div class="flex flex-col justify-between">
                <h4>Top 1</h4>
                <CountTo
                  class="text-20px font-700 text-right"
                  :start-val="0"
                  :end-val="102400"
                  :duration="2600"
                />
                <div class="sub">Top 2</div>
                <CountTo
                  class="text-20px font-700 text-right"
                  :start-val="0"
                  :end-val="102400"
                  :duration="2600"
                />
                <div class="sub">Top 3</div>
                <CountTo
                  class="text-20px font-700 text-right"
                  :start-val="0"
                  :end-val="102400"
                  :duration="2600"
                />
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElCard>
    </ElCol>

    <ElCol :xl="6" :lg="8" :md="12" :sm="12" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="2">
          <template #default>
            <div :class="`${prefixCls}__item`">
              <div>
                <div
                  :class="`${prefixCls}__item--icon ${prefixCls}__item--message p-16px inline-block rounded-6px`"
                >
                  <Icon icon="svg-icon:message" :size="15" />
                  <div class="text">Top Game</div>
                </div>
              </div>
              <div class="column">
                <div class="sub">Top 1</div>
                <CountTo
                  class="text-20px font-700 text-left"
                  :start-val="0"
                  :end-val="81212"
                  :duration="2600"
                />
                <div class="sub">Top 2</div>
                <CountTo
                  class="text-20px font-700 text-left"
                  :start-val="0"
                  :end-val="81212"
                  :duration="2600"
                />
                <div class="sub">Top 3</div>
                <CountTo
                  class="text-20px font-700 text-left"
                  :start-val="0"
                  :end-val="81212"
                  :duration="2600"
                />
              </div>
            </div>
          </template>
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.flex-col {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.flex-column {
  display: flex;
  flex-direction: column;
}
</style>

<style lang="less" scoped>
.text {
  font-size: 18px; /* 修改文字大小 */
}

.sub {
  font-size: 16px; /* 修改文字大小 */
}

@prefix-cls: ~'@{adminNamespace}-panel';

.@{prefix-cls} {
  &__item {
    &--peoples {
      color: #40c9c6;
    }

    &--message {
      color: #36a3f7;
    }

    &--money {
      color: #f4516c;
    }

    &--shopping {
      color: #34bfa3;
    }
  }
}
</style>
