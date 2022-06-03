<template>
  <div class="col-span-5 flex flex-col gap-4">
    <div class="flex items-center gap-4 mb-4">
      <h2 class="font-medium text-4xl leading-loose">
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
    <div class="grid grid-cols-8 gap-8 grid-rows-1 flex-grow">
      <LatestNewsPreview />
      <LatestNewsTab />
    </div>
  </div>
</template>
