<template>
  <div
    class="tree-cell"
    :style="{ paddingLeft: `${levelPadding}px` }"
    :class="{ 'tree-cell--is-group': isGroup }"
  >
    <div class="tree-cell__main">
      <div v-if="isGroup" class="tree-cell__toggle" @click="toggleExpand">
        <q-icon size="16px" :name="isExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'" />
      </div>

      <div class="tree-cell__label">
        {{ isGroup ? "Группа" : "Элемент" }}
      </div>
    </div>

    <div v-if="params.isEditMode()" class="tree-cell__controls">
      <q-btn icon="add" round dense color="positive" size="xs" @click.stop="handleCreateNode" />

      <q-btn icon="remove" round dense color="negative" size="xs" @click.stop="handleDeleteNode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

import type { INode } from "src/modules/tree-store/types/tree-store";

import type { ITreeCellProps } from "./types";

defineExpose({
  name: "tree-cell",
});

const PADDING_LEFT = 20;

const props = defineProps<ITreeCellProps>();

const { node, value: parent, createNewNode, deleteNode } = props.params;

const isGroup = ref(node.group);
const isExpanded = ref(node.expanded);
const levelPadding = node.level * PADDING_LEFT;

node.addEventListener("expandedChanged", updateExpandedState);
node.addEventListener("groupChanged", updateGroupChanged);

onBeforeUnmount(() => {
  node.removeEventListener("expandedChanged", updateExpandedState);
  node.removeEventListener("groupChanged", updateGroupChanged);
});

function updateExpandedState() {
  isExpanded.value = node.expanded;
}

function updateGroupChanged() {
  isGroup.value = node.group;
}

const toggleExpand = () => {
  node.setExpanded(!node.expanded);
};

const handleCreateNode = () => {
  const id = Date.now();
  const newNode: INode = {
    id,
    parent,
    label: `Айтем ${id}`,
  };

  createNewNode(newNode);
};

const handleDeleteNode = () => {
  deleteNode(props.params.value);
};
</script>
