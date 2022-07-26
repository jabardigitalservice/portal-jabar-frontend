<template>
  <div class="flex flex-col gap-4 lg:col-span-4 xl:col-span-5">
    <div class="flex flex-col md:flex-row items-center gap-1 md:gap-4 mb-4">
      <h2 class="font-medium text-2xl md:text-4xl leading-loose">
        Berita Terkini
      </h2>
      <div class="flex-1 flex justify-center flex-col text-center">
        <div class="border-b border-gray-300" />
      </div>
      <Link link="/berita" tabindex="-1">
        <Button type="button" variant="secondary">
          Lihat Semua Berita
          <Icon name="open-new-tab" size="14px" />
        </Button>
      </Link>
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-8 gap-8 md:grid-rows-1">
      <LatestNewsPreview />
      <LatestNewsTab />
    </div>
  </div>
</template>
