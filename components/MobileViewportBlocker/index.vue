<template>
  <div
    class="fixed w-full h-full inset-0 z-[100] bg-black bg-opacity-60 sm:p-4 lg:hidden lg:pointer-events-none"
  >
    <BaseContainer
      class="flex h-full items-center justify-center bg-white sm:rounded-xl"
    >
      <section class="max-w-lg flex flex-col items-center justify-center gap-8">
        <img
          src="/icons/mobile-view-block.svg"
          alt="Ilustrasi Perangkat Tidak Mendukung"
          class="object-contain"
          width="162"
          height="162"
        >
        <div>
          <h1
            class="mb-2 font-lora font-bold text-xl leading-9 text-green-800 text-center"
          >
            Perangkat Anda Tidak Mendukung Resolusi Minimum
          </h1>
          <p class="font-lato text-sm leading-6 text-blue-gray-800 text-center">
            Portal Jabar saat ini hanya dapat diakses melalui perangkat Laptop &
            Tablet. Kunjungi instagram atau twitter kami untuk mengetahui
            pengembangan Portal Jabar yang terbaru.
          </p>
        </div>
      </section>
    </BaseContainer>
  </div>
</template>

<script>
export default {}
</script>
