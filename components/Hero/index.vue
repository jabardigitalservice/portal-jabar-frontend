<template>
  <section
    class="flex justify-center items-center bg-no-repeat bg-bottom bg-contain"
    :style="{ backgroundImage: `url('/images/hero.svg')`, height: '528px' }"
  >
    <div class="container flex flex-col items-center gap-10">
      <h1 class="text-5xl leading-snug font-medium text-center max-w-4xl lead">
        Informasi, Layanan dan Pemerintahan Jawa Barat
      </h1>
      <p class="text-xl text-gray-800 leading-relaxed text-center max-w-2xl">
        Di sini kamu bisa akses informasi, layanan publik, dan sampaikan aspirasi mengenai program dari Pemerintah Daerah Provinsi Jawa Barat.
      </p>
      <form class="flex py-2 pr-2 pl-3 border border-gray-500 rounded-lg w-3/5" tabindex="0">
        <input type="text" class="border-none flex-grow focus:outline-none" placeholder="Cari disini">
        <!--
        @todo
        use button from jabar design system
        -->
        <button type="button" class="bg-green-800 px-4 py-2 rounded-lg text-white text-sm font-bold">
          Cari
        </button>
      </form>
    </div>
  </section>
</template>
