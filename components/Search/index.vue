<template>
  <BaseContainer class="relative -top-24 z-20 min-h-screen">
    <main class="py-8 px-10 rounded-xl bg-white min-h-screen shadow min-w-0 flex flex-col gap-8">
      <!-- Search Bar -->
      <section>
        <SearchBar class="mb-6" />
        <h2 class="font-lora text-2xl font-bold text-blue-gray-700">
          Menampilkan hasil pencarian <strong class="text-green-700">{{ searchKeyword }}</strong>
        </h2>
      </section>

      <!-- Public Services -->
      <section class="border-b border-gray-300 pb-8">
        <div class="min-w-0 flex justify-between items-center mb-6">
          <h3 class="font-roboto font-medium text-[22px] leading-6">
            Layanan Publik terkait <strong class="text-green-700">{{ searchKeyword }}</strong>
          </h3>
          <Link link="#" tabindex="-1">
            <Button type="button" variant="secondary">
              Lihat Semua Layanan Publik
              <Icon name="open-new-tab" size="14px" />
            </Button>
          </Link>
        </div>
        <SearchList
          list-view="grid"
          :loading="false"
          :items="publicServiceData"
        />
      </section>

      <!-- News -->
      <section>
        <div class="min-w-0 flex justify-between items-center mb-6">
          <h3 class="font-roboto font-medium text-[22px] leading-6">
            Berita Jawa Barat terkait <strong class="text-green-700">{{ searchKeyword }}</strong>
          </h3>
          <Link link="#" tabindex="-1">
            <Button type="button" variant="secondary">
              Lihat Semua Berita Jawa Barat
              <Icon name="open-new-tab" size="14px" />
            </Button>
          </Link>
        </div>
        <SearchList
          list-view="grid"
          :loading="false"
          :items="newsData"
        />
      </section>

      <!-- Related Search and Popular News -->
      <div class="min-w-0 grid grid-cols-[55%,35%] justify-between mb-8">
        <section>
          <div class="mb-6">
            <h3 class="font-roboto font-medium text-[22px] leading-6 pb-3 border-b border-gray-300">
              Hasil Pencarian Lainnya
            </h3>
          </div>
          <SearchList
            list-view="list"
            :loading="false"
            :items="newsData"
          />
          <div class="mt-8 flex justify-center items-center">
            <Link link="#" tabindex="-1">
              <Button type="button" variant="secondary">
                Muat Hasil Lainnya
                <Icon name="open-new-tab" size="14px" />
              </Button>
            </Link>
          </div>
        </section>

        <section>
          <div class="mb-6">
            <h3 class="font-roboto font-medium text-[22px] leading-6 pb-3 border-b border-gray-300">
              Berita Populer Terkait
            </h3>
          </div>
          <SearchList
            list-view="list"
            :items="newsData"
            :loading="false"
            small
          />
        </section>
      </div>
    </main>
  </BaseContainer>
</template>

<script>
export default {
  data () {
    return {
      searchKeyword: 'STNK',
      // TODO: Change this dummy data with real data from API
      publicServiceData: [
        {
          id: 255,
          domain: 'public_service',
          title: 'Samsat Keliling',
          excerpt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vero suscipit et optio, soluta ex laboriosam reiciendis. Consequatur est et hic sed doloribus voluptatem officia velit consectetur eum a numquam itaque quibusdam omnis, non fuga odit sunt debitis architecto exercitationem commodi dolor amet repellendus eligendi? Fugiat ducimus natus beatae quidem.',
          slug: 'bangun-kemandirian-wakaf-salman--pt-pelindo-launching-program-urban-farming-di-255',
          category: 'sosial',
          image: '',
          created_at: '2022-01-17T07:02:38Z'
        },
        {
          id: 256,
          domain: 'public_service',
          title: 'Samsat Keliling',
          excerpt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vero suscipit et optio, soluta ex laboriosam reiciendis. Consequatur est et hic sed doloribus voluptatem officia velit consectetur eum a numquam itaque quibusdam omnis, non fuga odit sunt debitis architecto exercitationem commodi dolor amet repellendus eligendi? Fugiat ducimus natus beatae quidem.',
          slug: 'bangun-kemandirian-wakaf-salman--pt-pelindo-launching-program-urban-farming-di-255',
          category: 'sosial',
          image: 'https://picsum.photos/200/300',
          created_at: '2022-01-17T07:02:38Z'
        },
        {
          id: 257,
          domain: 'public_service',
          title: 'Samsat Keliling',
          excerpt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium vero suscipit et optio, soluta ex laboriosam reiciendis. Consequatur est et hic sed doloribus voluptatem officia velit consectetur eum a numquam itaque quibusdam omnis, non fuga odit sunt debitis architecto exercitationem commodi dolor amet repellendus eligendi? Fugiat ducimus natus beatae quidem.',
          slug: 'bangun-kemandirian-wakaf-salman--pt-pelindo-launching-program-urban-farming-di-255',
          category: 'sosial',
          image: '',
          created_at: '2022-01-17T07:02:38Z'
        }
      ],
      newsData: [
        {
          id: 260,
          domain: 'news',
          title: 'Pimpin Rapat Evaluasi Kinerja Perangkat Daerah, Pak Uu: Fokus Hasil Nyata',
          excerpt: 'Wakil Gubernur Jawa Barat Uu Ruzhanul Ulum memimpin Rapat Evaluasi Kinerja Perangkat Daerah Tahun 2021 di Lingkup Perekonomian dan Pembangunan via konferensi video dari Rumah Singgah Wakil Gubernur Jabar, Jumat (14/1/2022). ',
          slug: 'pimpin-rapat-evaluasi-kinerja-perangkat-daerah-pak-uu-fokus-hasil-nyata-260',
          image: 'https://jabarprov.go.id/assets/images/berita/gambar_45454.jpg',
          category: 'sosial',
          author: 'syarif',
          reporter: '',
          editor: '',
          video: '',
          source: '',
          tags: [],
          status: 'PUBLISHED',
          is_live: 1,
          created_by: {
            name: 'john doe',
            unit_name: 'Dinas Komunikasi dan Informatika'
          },
          published_at: '2022-03-06T23:24:25Z',
          created_at: '2022-01-17T07:02:38Z',
          updated_at: '2022-01-17T07:02:38Z'
        },
        {
          id: 260,
          domain: 'news',
          title: 'Pimpin Rapat Evaluasi Kinerja Perangkat Daerah, Pak Uu: Fokus Hasil Nyata',
          excerpt: 'Wakil Gubernur Jawa Barat Uu Ruzhanul Ulum memimpin Rapat Evaluasi Kinerja Perangkat Daerah Tahun 2021 di Lingkup Perekonomian dan Pembangunan via konferensi video dari Rumah Singgah Wakil Gubernur Jabar, Jumat (14/1/2022). ',
          slug: 'pimpin-rapat-evaluasi-kinerja-perangkat-daerah-pak-uu-fokus-hasil-nyata-260',
          image: '',
          category: 'sosial',
          author: 'syarif',
          reporter: '',
          editor: '',
          video: '',
          source: '',
          tags: [],
          status: 'PUBLISHED',
          is_live: 1,
          created_by: {
            name: 'john doe',
            unit_name: 'Dinas Komunikasi dan Informatika'
          },
          published_at: '2022-03-06T23:24:25Z',
          created_at: '2022-01-17T07:02:38Z',
          updated_at: '2022-01-17T07:02:38Z'
        },
        {
          id: 260,
          domain: 'news',
          title: 'Pimpin Rapat Evaluasi Kinerja Perangkat Daerah, Pak Uu: Fokus Hasil Nyata',
          excerpt: 'Wakil Gubernur Jawa Barat Uu Ruzhanul Ulum memimpin Rapat Evaluasi Kinerja Perangkat Daerah Tahun 2021 di Lingkup Perekonomian dan Pembangunan via konferensi video dari Rumah Singgah Wakil Gubernur Jabar, Jumat (14/1/2022). ',
          slug: 'pimpin-rapat-evaluasi-kinerja-perangkat-daerah-pak-uu-fokus-hasil-nyata-260',
          image: 'https://jabarprov.go.id/assets/images/berita/gambar_45454.jpg',
          category: 'sosial',
          author: 'syarif',
          reporter: '',
          editor: '',
          video: '',
          source: '',
          tags: [],
          status: 'PUBLISHED',
          is_live: 1,
          created_by: {
            name: 'john doe',
            unit_name: 'Dinas Komunikasi dan Informatika'
          },
          published_at: '2022-03-06T23:24:25Z',
          created_at: '2022-01-17T07:02:38Z',
          updated_at: '2022-01-17T07:02:38Z'
        }
      ]
    }
  }
}
</script>
