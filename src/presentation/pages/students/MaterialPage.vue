<template>
  <MvBackground>
    <MvCard>
      <MvCardHeader
        :title="material.title"
        :tag="material.category"
        :icon="material.icon"
        :read-time="material.readTime"
        :author="material.author"
      />

      <!-- Scrollable body -->
      <div class="card-scroll">
        <div class="content-wrap">
          <template v-for="(block, i) in material.blocks" :key="i">
            <ContentText v-if="block.type === 'h1'" tag="h1">{{ block.value }}</ContentText>
            <ContentText v-else-if="block.type === 'h2'" tag="h2">{{ block.value }}</ContentText>
            <ContentText v-else-if="block.type === 'h3'" tag="h3">{{ block.value }}</ContentText>
            <ContentText v-else-if="block.type === 'p'">{{ block.value }}</ContentText>

            <ContentImage
              v-else-if="block.type === 'image'"
              :src="block.src"
              :alt="block.alt"
              :caption="block.caption"
              :source="block.source"
              :width="block.width"
            />

            <ContentTable
              v-else-if="block.type === 'table'"
              :headers="block.headers"
              :rows="block.rows"
            />

            <ContentCode
              v-else-if="block.type === 'code'"
              :code="block.value"
              :language="block.language"
            />

            <ContentQuote v-else-if="block.type === 'quote'" :author="block.author">{{
              block.value
            }}</ContentQuote>

            <ContentList
              v-else-if="block.type === 'list'"
              :items="block.items"
              :ordered="block.ordered"
            />

            <MvDivider v-else-if="block.type === 'divider'" :variant="block.variant" />
          </template>
        </div>
      </div>

      <!-- Footer -->
      <div class="card-footer">
        <span class="footer-tag">{{ material.category }}</span>
        <span class="footer-date">{{ material.date }}</span>
      </div>
    </MvCard>
  </MvBackground>
  <footer class="footer">
    <NavButton to="/news" text="Back" />
    <NavButton to="/worksheet" text="Next" />
  </footer>
</template>

<script setup>
import MvBackground from '@/components/ui/MvBackground.vue'
import MvCard from '@/components/ui/MvCard.vue'
import MvCardHeader from '@/components/ui/MvCardHeader.vue'
import MvDivider from '@/components/ui/MvDivider.vue'
import ContentText from '@/components/content/ContentText.vue'
import ContentImage from '@/components/content/ContentImage.vue'
import ContentTable from '@/components/content/ContentTable.vue'
import ContentCode from '@/components/content/ContentCode.vue'
import ContentQuote from '@/components/content/ContentQuote.vue'
import ContentList from '@/components/content/ContentList.vue'
import NavButton from '@/components/button/NavButton.vue'

import { materialData } from '@/presentation/constant/data/material_data.js'

defineProps({
  material: {
    type: Object,
    default: () => materialData,
  },
})
</script>

<style scoped>
.card-scroll {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 28px 36px;
}
.card-scroll::-webkit-scrollbar {
  width: 0;
}
.content-wrap {
  text-align: justify;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 36px;
  border-top: 1px solid rgba(109, 40, 217, 0.15);
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.15);
  font-family: 'Rajdhani', sans-serif;
}
.footer-tag {
  font-size: 11px;
  letter-spacing: 2px;
  color: rgba(168, 85, 247, 0.5);
  text-transform: uppercase;
}
.footer-date {
  font-size: 11px;
  color: rgba(168, 85, 247, 0.35);
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
</style>
