<template>
  <div class="flex gap-6">
    <button
      type="button"
      class="flex items-center gap-2 cursor-pointer"
    >
      <div class="flex items-center gap-1">
        <Icon src="/icons/world.svg" alt="Bahasa" size="16px" />
        <p class="text-white">
          Bahasa
        </p>
      </div>
      <Icon name="caret-down" size="10px" class="text-white" />
    </button>
    <div class="text-white">
      <Link link="/" class="pr-4 border-r border-white">
        Beranda
      </Link>
      <Link link="#" class="pl-4">
        Sitemap
      </Link>
    </div>
  </div>
</template>
