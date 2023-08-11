<template>
  <main class="bg-gray-400 px-10 py-5 flex flex-col md:flex-row gap-4">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold">Contact</h1>
      <span>
        <a src="">08515511</a>
      </span>
      <span>
        <a src="">@maduapiari</a>
      </span>
      <span>
        <a src="">madu_apiari</a>
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold">About</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quis
        explicabo, dolores maiores quas natus consequuntur autem quo commodi
        accusamus?
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-bold">Maps</h1>
      <div
        style="
          max-width: 100%;
          list-style: none;
          transition: none;
          overflow: hidden;
          width: 300px;
          height: 200px;
        "
      >
        <div
          id="embedded-map-display"
          style="height: 100%; width: 100%; max-width: 100%"
        >


          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1426244706795!2d106.88296077541919!3d-6.375582345873461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eb6023b84cf1%3A0xc046caccfae4729e!2sCV.%20Madu%20Apiari%20Mutiara%20-%20Cimanggis%2C%20Depok!5e0!3m2!1sid!2sid!4v1691748430557!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </main>
</template>
