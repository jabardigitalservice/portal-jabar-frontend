<template>
  <nav class="flex items-center">
    <MenuLink link="/" class="mr-auto">
      <img src="/logo.png" width="55" height="60" alt="Beranda">
    </MenuLink>
    <Menu>
      <MenuList
        v-for="menu in menus"
        :id="menu.id"
        :key="menu.id"
        :title="menu.title"
        @click="setActiveMenu"
      >
        <MenuItem
          :id="menu.id"
          :title="menu.title"
          :link="menu.link"
          :items="menu.items"
          :active-menu="activeMenu"
          @click="setActiveMenu"
        />
      </MenuList>
    </Menu>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        {
          id: 1,
          title: 'Layanan Publik',
          link: '#',
          items: [
            {
              id: 1,
              title: 'Kependudukan',
              description: 'Semakin mudah akses layanan urusan identitas hingga akta.',
              icon: '/icons/kependudukan.svg',
              link: 'http://disdukcapil.jabarprov.go.id/portal',
              items: []
            },
            {
              id: 2,
              title: 'Kepolisian',
              description: 'Cari tahu informasi mengenai layanan kepolisian terlengkap.',
              icon: '/icons/kepolisian.svg',
              link: 'https://www.polri.go.id/',
              items: []
            },
            {
              id: 3,
              title: 'Pajak',
              description: 'Administrasi perpajakan lebih mudah dan cepat.',
              icon: '/icons/pajak.svg',
              link: 'https://bapenda.jabarprov.go.id/',
              items: []
            },
            {
              id: 4,
              title: 'Perizinan',
              description: 'Berikan kemudahan perizinan berbagai kebutuhan.',
              icon: '/icons/perizinan.svg',
              link: 'https://dpmptsp.jabarprov.go.id/sicantik/main/pendaftaranbaru/perizinanonline',
              items: []
            },
            {
              id: 5,
              title: 'Pendidikan dan Pembelajaran',
              description: 'Pemukan secara menyeluruh informasi mengenai pendidikan.',
              icon: '/icons/pendidikan-dan-pembelajaran.svg',
              link: 'http://disdik.jabarprov.go.id/',
              items: []
            }
          ]
        },
        {
          id: 2,
          title: 'Informasi dan Berita',
          link: '#',
          items: [
            {
              id: 1,
              title: 'Informasi',
              description: null,
              icon: null,
              link: '#',
              items: [
                {
                  id: 1,
                  title: 'Lowongan Kerja dan Pelatihan',
                  link: '#'
                },
                {
                  id: 2,
                  title: 'Informasi Bantuan Pemerintah',
                  link: '#'
                },
                {
                  id: 3,
                  title: 'Informasi Relawan',
                  link: '#'
                }
              ]
            },
            {
              id: 2,
              title: 'Berita',
              description: null,
              icon: null,
              link: 'http://humas.jabarprov.go.id/',
              items: []
            }
          ]
        }
      ],
      activeMenu: null
    }
  },
  methods: {
    setActiveMenu (id) {
      this.activeMenu = id
    }
  }
}
</script>
