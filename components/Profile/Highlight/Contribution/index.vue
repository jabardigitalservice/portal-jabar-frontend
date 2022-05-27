<template>
  <ul class="grid grid-cols-9 grid-rows-2 gap-3 p-8">
    <li class="col-span-3 row-span-2 bg-green-700 rounded-lg text-white p-4 flex flex-col justify-between">
      <div>
        <p class="font-lora font-bold text-xl mb-2">
          Kontribusi
        </p>
        <p class="font-lora font-bold text-[28px] leading-[40px] mb-4">
          Provinsi Jawa Barat Terhadap Negara
        </p>
        <p class="text-sm leading-[23px]">
          Jawa Barat merupakan rumah bagi 49,94 juta jiwa, selain itu Jawa Barat juga memiliki potensi pariwisata dan budaya yang sangat kaya.
        </p>
        <p class="text-sm leading-[23px]">
          Sumber data: (IKP Diskominfo Jabar, 2022)
        </p>
      </div>
      <Link link="/arsip-dan-dokumen" tabindex="-1" class="w-full">
        <Button class="contribution-button w-full" type="button" variant="primary">
          Lihat Laporan Perkembangan Jawa Barat
          <Icon name="open-new-tab" size="14px" />
        </Button>
      </Link>
    </li>
    <li class="col-span-2 m-h-[152px] rounded-lg border border-gray-200 p-4 flex flex-col justify-between">
      <div class="flex flex-col gap-2">
        <Icon src="/icons/selayang-pandang/icon-kontribusi-pdb-nasional.svg" size="38px" />
        <p class="text-green-700 font-roboto font-bold text-lg">
          14.33%
        </p>
      </div>
      <p class="font-medium text-sm text-blue-gray-400">
        Kontribusi terhadap Produk Domestik Bruto (PDB) Nasional.
      </p>
    </li>
    <li class="col-span-2 m-h-[152px] rounded-lg border border-gray-200 p-4 flex flex-col justify-between">
      <div class="flex flex-col gap-2">
        <Icon src="/icons/selayang-pandang/icon-kontribusi-pdb-manufaktur.svg" size="38px" />
        <p class="text-green-700 font-roboto font-bold text-lg">
          60%
        </p>
      </div>
      <p class="font-medium text-sm text-blue-gray-400">
        Kontribusi terhadap Produk Domestik Bruto (PDB) Sektor Industri Manufaktur.
      </p>
    </li>
    <li class="col-span-2 m-h-[152px] rounded-lg border border-gray-200 p-4 flex flex-col justify-between">
      <div class="flex flex-col gap-2">
        <Icon src="/icons/selayang-pandang/icon-kontribusi-pma.svg" size="38px" />
        <p class="text-green-700 font-roboto font-bold text-lg">
          34.46%
        </p>
      </div>
      <p class="font-medium text-sm text-blue-gray-400">
        Kontribusi Penanaman Modal Asing (PMA) Jawa Barat terhadap Nasional.
      </p>
    </li>
    <li class="col-span-3 m-h-[152px] rounded-lg border border-gray-200 p-4 flex flex-col justify-between">
      <div class="flex flex-col gap-2">
        <Icon src="/icons/selayang-pandang/icon-kontribusi-beras.svg" size="38px" />
        <p class="text-green-700 font-roboto font-bold text-lg">
          17.76%
        </p>
      </div>
      <p class="font-medium text-sm text-blue-gray-400">
        Produsen Beras Nasional.
      </p>
    </li>
    <li class="col-span-3 m-h-[152px] rounded-lg border border-gray-200 p-4 flex flex-col justify-between">
      <div class="flex flex-col gap-2">
        <Icon src="/icons/selayang-pandang/icon-kontribusi-ekspor.svg" size="38px" />
        <p class="text-green-700 font-roboto font-bold text-lg">
          AS 18.4%, Jepang 12.52%
        </p>
      </div>
      <p class="font-medium text-sm text-blue-gray-400">
        Provinsi Produsen Komoditi Ekspor Nasional.
      </p>
    </li>
  </ul>
</template>

<style>
.contribution-button.jds-button--primary {
  background-color: #FFFFFF;
  color: #069550;
}
.contribution-button.jds-button--primary:hover {
  background-color: #FAFAFA;
  color: #008444;
}
</style>
