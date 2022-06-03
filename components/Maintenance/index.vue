<template>
  <main class="overflow-hidden">
    <Jumbotron />
    <section class="w-full bg-gray-200">
      <BaseContainer class="relative -top-24 z-20">
        <div class="py-[120px] rounded-xl bg-white flex flex-col gap-8 justify-center items-center">
          <img
            src="/images/under-construction.svg"
            alt="ilustrasi halaman sedang dalam pengembangan"
            width="363"
            height="229"
            class="max-w-full object-cover object-center mb-8"
          >
          <div>
            <h1 class="font-lora text-[21px] leading-[34px] text-green-700 font-bold mb-2 text-center">
              Fitur sedang dalam tahap pengembangan
            </h1>
            <p class="font-lato text-sm text-blue-gray-800 leading-6 text-center">
              Fitur yang Anda tuju saat ini sedang dalam tahap pengembangan.
              <br>
              Silahkan kunjungi fitur ini dilain waktu atau Anda dapat mengunjungi halaman lainnya.
            </p>
          </div>
          <Link link="/">
            <Button type="button">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </BaseContainer>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Maintenance'
}
</script>
