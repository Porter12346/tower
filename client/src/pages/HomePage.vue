<script setup>

</script>

<template>
  <div class="container-fluid bg-img">
    <div class="row">
      <div class="col-md-6 d-flex flex-column justify-content-center align-items-center hero-section">
        <h2>Event management for People, by people</h2>
        <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Tower. Events are happening every day—log in to join the fun.</p>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h3 class="m-3">How Tower works</h3>
        <div class="col-md-6">
          <div>
            discover events
          </div>
        </div>
        <div class="col-md-6">
          
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.bg-img {
  background-image: url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  height: 45vh;
  background-position: center;
  background-size: cover;
}
.hero-section{
  height: 45vh;
  text-shadow: 2px 2px 2px black;
}
</style>
