<template>
    <div>
        <button @click="count++">{{count}}</button>
    </div>
</template>

<script>
export default {
    setup(){
        return {
            count:1
        }
    }
}
</script>

<style scoped>

</style>