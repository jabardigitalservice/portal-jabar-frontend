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
          <h1 class="mb-2 font-lora font-bold text-xl leading-9 text-green-800 text-center">
            Perangkat Anda belum didukung
          </h1>
          <p class="font-lato text-sm leading-6 text-blue-gray-800 text-center">
            Saat ini portal jabarprov.go.id hanya bisa diakses melalui PC/Laptop.
            Nantikan pengembangan versi <i>web mobile</i> dari portal jabarprov.go.id dalam waktu dekat!
          </p>
        </div>
        <div class="w-full flex flex-col gap-8">
          <Link link="https://www.instagram.com/jabarprovgoid">
            <div
              class="h-[52px] border border-gray-300 rounded-md flex justify-center items-center gap-2"
            >
              <Icon
                src="/icons/social-media/instagram-logo.svg"
                size="18px"
                alt="Diterbitkan"
              />
              Kunjungi Instagram
            </div>
          </Link>
          <Link link="https://twitter.com/jabarprovgoid">
            <div
              class="h-[52px] border border-gray-300 rounded-md flex justify-center items-center gap-2"
            >
              <Icon
                src="/icons/social-media/twitter-logo.svg"
                size="18px"
                alt="Diterbitkan"
              />
              Kunjungi Twitter
            </div>
          </Link>
        </div>
      </section>
    </BaseContainer>
  </div>
</template>
