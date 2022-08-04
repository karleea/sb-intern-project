<script>
    export default {
      name: 'SButton'
    }

</script>

<template>
    <button class="btn">
        <slot/>
    </button>
</template>

<!-- TODO: Style button -->
<style lang="scss" scoped>

$btn-bg: #ffff;
$btn-border: #081f36;;
.btn {
    padding: 12px 12px;
    background-color: $btn-bg;
    border: 2px solid $btn-bg;
}

.btn:hover {
    border: 2px solid $btn-border;
}
</style>
