<script setup>
const { $trpc } = useNuxtApp()

const name = ref('world')
const { data: msg } = await useAsyncData('msg', () => $trpc.greeting.query({ name: name.value }), { watch: [name] })
</script>

<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold">
      tRPC :
    </h1>
    <p>{{ msg }}</p>
    <UButton @click="name += '!'">
      Click me
    </UButton>
  </UContainer>
</template>
