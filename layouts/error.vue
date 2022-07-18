<template>
  <main class="overflow-hidden">
    <Jumbotron />
    <section class="w-full bg-gray-200">
      <BaseContainer class="relative -top-24 z-20">
        <div class="px-3 md:px-4 lg:px-6 py-[120px] rounded-xl bg-white flex flex-col gap-8 justify-center items-center">
          <img
            src="/images/404.svg"
            width="295"
            height="178"
            alt="ilustrasi halaman tidak ditemukan"
          >
          <div class="flex flex-col gap-1 justify-center">
            <h1 class="text-center text-green-700 font-lora text-[21px] leading-[34px] font-bold">
              Maaf, kami tidak dapat menemukan halaman yang ingin dikunjungi
            </h1>
            <p class="text-center font-lato text-sm leading-6 text-blue-gray-800">
              Pastikan alamat url telah diketik dengan benar. Kami mungkin juga telah menghapus halaman ini. <br>Atau Anda juga dapat menghubungi Admin.
            </p>
          </div>
          <Link link="/" tabindex="-1">
            <Button>Kembali Ke Beranda</Button>
          </Link>
        </div>
      </BaseContainer>
    </section>
  </main>
</template>
