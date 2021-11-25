<template>
  <!-- TODO: Remove dummy data  -->
  <article
    class="w-full flex p-3 group rounded-xl cursor-pointer border border-transparent
    transition-all duration-150 ease-out hover:border-[#E9EDF4] hover:shadow-md"
    :class="view === 'list' ? 'gap-6 items-center' : 'flex-col'"
  >
    <img
      src="https://picsum.photos/200"
      alt="dummy image"
      width="120px"
      height="120px"
      class="object-cover object-center rounded-lg "
      :class=" view === 'list' ? 'w-[120px] h-[120px]' : 'w-full h-[120px] mb-6'"
    >
    <div class="inline-flex flex-col">
      <span
        class="bg-gray-100 px-2 py-1 rounded-[4px] mb-2 w-max font-lato text-xs leading-5 text-[#8D8D8D]
      group-hover:bg-green-50 group-hover:text-green-700"
      >
        Berita Jawa Barat
      </span>
      <h1
        class="font-lato font-medium text-lg leading-7 text-blue-gray-800 mb-[6px] group-hover:text-green-700"
        :class="view === 'list' ? ' line-clamp-1' : 'line-clamp-2'"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, aliquam!
      </h1>
      <p
        class="font-lato font-normal text-sm leading-6 text-[#717F8C] line-clamp-2
      group-hover:text-blue-gray-600"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem totam labore architecto
        fugit eum id dicta reiciendis doloribus error incidunt.
      </p>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    view: {
      type: String,
      default: 'list',
      validator (value) {
        return ['list', 'grid'].includes(value)
      }
    }
  }
}
</script>
