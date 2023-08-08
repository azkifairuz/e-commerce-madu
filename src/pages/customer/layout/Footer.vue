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
          width: 500px;
          height: 500px;
        "
      >
        <div
          id="embedded-map-display"
          style="height: 100%; width: 100%; max-width: 100%"
        >
          <iframe
            style="height: 100%; width: 100%; border: 0"
            frameborder="0"
            src="https://www.google.com/maps/embed/v1/place?q=Indonesia&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
          ></iframe>
        </div>
      </div>
    </div>
  </main>
</template>
