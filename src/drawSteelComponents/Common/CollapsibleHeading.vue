<template>
	<component :is="`h${headerLevel}`" class="heading">
		<right-arrow-toggle-indicator :enabled="enabled" @toggle="handleToggle"/>
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
import RightArrowToggleIndicator from '@drawSteelComponents/Common/RightArrowToggleIndicator.vue';

const props = defineProps({
    headerLevel: {
        type: Number,
        required: false,
        default: 1,
        validator(value: number) {
            return value >= 1 && value <= 6
        }
    },
    enabled: {
        type: Boolean,
        required: false,
    }
})

const emit = defineEmits<{
	toggle: [enabled: boolean]
}>()

const handleToggle = () => {
    emit('toggle', !props.enabled)
}
</script>

<style scoped>
.markdown-source-view.is-live-preview .heading > .heading-collapse-indicator {
	position: absolute;
	left: 5px;
}
</style>
